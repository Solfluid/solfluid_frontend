import {
	SystemProgram,
	Transaction,
	PublicKey,
	TransactionInstruction,
} from "@solana/web3.js";

import axios from "../config";

const programAccount = new PublicKey(
	"2F2XupZErDDHKniN4nkEHGsf7j7c7egmMHzVrhWpfXi2"
);

export const connectWallet = () => {
	return async (dispatch, getState) => {
		try {
			const { walletConfig } = getState();
			walletConfig.wallet.on("connect", (publicKey) =>
				console.log("Connected to " + publicKey.toBase58())
			);
			if (!walletConfig.wallet.connected) {
				await walletConfig.wallet.connect();
				dispatch({
					type: "WALLET_CONNECT",
					payload: { wallet: walletConfig.wallet },
				});
			}
		} catch (e) {
			console.log(e);
		}
	};
};

export const disconnectWallet = () => {
	return async (dispatch, getState) => {
		try {
			const { walletConfig } = getState();
			await walletConfig.wallet.disconnect();
			dispatch({
				type: "WALLET_DISCONNECT",
				payload: { wallet: walletConfig.wallet },
			});
		} catch (e) {
			console.log(e);
		}
	};
};

export const withdraw = (streamId, amountToWithdraw) => {
	return async (dispatch, getState) => {
		try {
			const { walletConfig } = getState();
			const connection = walletConfig.connection;
			const wallet = walletConfig.wallet;

			let pubkey = new PublicKey(streamId);
			let response = await axios.post("/withdraw", {
				amount: amountToWithdraw,
			});
			const createInstruction = new TransactionInstruction({
				keys: [
					{ pubkey: pubkey, isSigner: false, isWritable: true },
					{
						pubkey: wallet.publicKey,
						isSigner: true,
						isWritable: true,
					},
				],
				programId: programAccount,
				data: response.data.result,
			});
			const trans = await setPayerAndBlockhashTransaction(
				wallet,
				createInstruction,
				connection
			);
			const signature = await signAndSendTransaction(
				wallet,
				trans,
				connection
			);
			const result = await connection.confirmTransaction(
				signature,
				"withdraw"
			);
			// console.log("end sendMessage", result);
			dispatch(getAllStreams());
			dispatch({type:"WITHDRAW_SUCCESS"});
		} catch (e) {
			console.log(e);
			dispatch(getAllStreams());
			dispatch({type:"WITHDRAW_FAILED"});
		}
	};
};

export const cancelStream = (streamId, rewardForReceiver, receiverAddress) => {
	return async (dispatch, getState) => {
		try {
			const { walletConfig } = getState();
			const connection = walletConfig.connection;
			const wallet = walletConfig.wallet;
			let pubkey = new PublicKey(streamId);
			let reciverpubket = new PublicKey(receiverAddress);
			let response = await axios.post("/reward", {
				percentage: rewardForReceiver,
			});
			const createInstruction = new TransactionInstruction({
				keys: [
					{ pubkey: pubkey, isSigner: false, isWritable: true },
					{ pubkey: pubkey, isSigner: false, isWritable: true },
					{
						pubkey: wallet.publicKey,
						isSigner: true,
						isWritable: true,
					},
					{
						pubkey: reciverpubket,
						isSigner: false,
						isWritable: true,
					},
				],
				programId: programAccount,
				data: response.data.result,
			});
			const trans = await setPayerAndBlockhashTransaction(
				wallet,
				createInstruction,
				connection
			);
			const signature = await signAndSendTransaction(
				wallet,
				trans,
				connection
			);
			const result = await connection.confirmTransaction(
				signature,
				"CloseStream"
			);
			dispatch(getAllStreams());
			dispatch({type:"CANCEL_SUCCESS"});
			console.log("end sendMessage", result);
		} catch (e) {
			dispatch(getAllStreams());
			dispatch({type:"CANCEL_FAILED"});
			console.log(e);
		}
	};
};

export const createStream = ({
	receiverAddress,
	startTime,
	endTime,
	amountSpeed,
}) => {
	return async (dispatch, getState) => {
		try {
			const { walletConfig } = getState();
			const connection = walletConfig.connection;
			const wallet = walletConfig.wallet;

			const SEED = "abcdef" + Math.random().toString();
			let newAccount = await PublicKey.createWithSeed(
				wallet.publicKey,
				SEED,
				programAccount
			);

			let amounttosend = (endTime - startTime) * amountSpeed;
			let receiverpubkey = new PublicKey(receiverAddress);
			// console.log({
			//   start_time: startTime,
			//   end_time: endTime,
			//   amount_second: amountSpeed,
			//   lamports_withdrawn: 0,
			//   is_active: false,
			//   to: Array.from(receiverpubkey.toBytes()),
			//   from: Array.from(wallet.publicKey.toBytes()),
			// });
			let response = await axios.post("/stream", {
				start_time: startTime,
				end_time: endTime,
				amount_second: amountSpeed,
				lamports_withdrawn: 0,
				is_active: true,
				to: Array.from(receiverpubkey.toBytes()),
				from: Array.from(wallet.publicKey.toBytes()),
			});
			// console.log(response);

			const space = response.data.result.length;
			const lamports =
				(await connection.getMinimumBalanceForRentExemption(space)) +
				amounttosend;
			const instruction = SystemProgram.createAccountWithSeed({
				fromPubkey: wallet.publicKey,
				basePubkey: wallet.publicKey,
				seed: SEED,
				newAccountPubkey: newAccount,
				lamports,
				space,
				programId: programAccount,
			});

			const createInstruction = new TransactionInstruction({
				keys: [
					{ pubkey: newAccount, isSigner: false, isWritable: true },
					{
						pubkey: wallet.publicKey,
						isSigner: true,
						isWritable: false,
					},
					{
						pubkey: receiverpubkey,
						isSigner: false,
						isWritable: false,
					},
				],
				programId: programAccount,
				data: response.data.result,
			});

			const trans = await setPayerAndBlockhashTransaction2(
				wallet,
				instruction,
				createInstruction,
				connection
			);
			const signature = await signAndSendTransaction(
				wallet,
				trans,
				connection
			);
			const result = await connection.confirmTransaction(
				signature,
				"Create Stream"
			);
			dispatch({
				type: "CREATE_RESPONSE",
				result: true,
				id: newAccount.toString(),
			});
			dispatch(getAllStreams());
			console.log("end sendMessage", result);
		} catch (e) {
			console.log(e);
			dispatch({ type: "CREATE_FAILED", result: false });
			dispatch(getAllStreams());
		}
	};
};

async function setPayerAndBlockhashTransaction(
	wallet,
	instruction,
	connection
) {
	const transaction = new Transaction();
	transaction.add(instruction);
	transaction.feePayer = wallet.publicKey;
	let hash = await connection.getRecentBlockhash();
	transaction.recentBlockhash = hash.blockhash;
	return transaction;
}

async function setPayerAndBlockhashTransaction2(
	wallet,
	instruction1,
	instruction2,
	connection
) {
	const transaction = new Transaction();
	transaction.add(instruction1);
	transaction.add(instruction2);
	transaction.feePayer = wallet.publicKey;
	let hash = await connection.getRecentBlockhash();
	transaction.recentBlockhash = hash.blockhash;
	return transaction;
}

async function signAndSendTransaction(wallet, transaction, connection) {
	try {
		// console.log("start signAndSendTransaction");
		let signedTrans = await wallet.signTransaction(transaction);
		// console.log("signed transaction");
		let signature = await connection.sendRawTransaction(
			signedTrans.serialize()
		);
		// console.log("end signAndSendTransaction");
		return signature;
	} catch (err) {
		console.log("signAndSendTransaction error", err);
		throw err;
	}
}

export const getAllStreams = () => {
	return async (dispatch, getState) => {
		try {
			// await dispatch(connectWallet());
			const { walletConfig } = getState();
			let response = await axios.get(
				`/getallstream/${walletConfig.wallet.publicKey.toString()}`
			);
			if (response.status !== 200)
				throw new Error("Something went wrong");
			dispatch({
				type: "DATA_RECEIVED",
				result: response.data,
			});
		} catch (e) {
			console.log(e);
			dispatch({
				type: "DATA_NOT_RECEIVED",
				result: {data:null},
			})
		}
	};
};

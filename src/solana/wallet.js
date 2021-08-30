import Wallet from "@project-serum/sol-wallet-adapter";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";

const cluster = "https://api.devnet.solana.com";
const connection = new Connection(cluster, "confirmed");
const wallet = new Wallet("https://www.sollet.io", cluster);

export async function toggleWallet() {
  if (wallet.connected) {
    wallet.disconnect();
    return;
  }
  wallet.on("connect", (publicKey) =>
    console.log("Connected to " + publicKey.toBase58())
  );
  wallet.on("disconnect", () => console.log("Disconnected"));
  await wallet.connect();
  return [connection, wallet];
}

export async function sendMoney(destPubkeyStr, lamports) {
  if (!lamports) {
    console.log("permitted");
    return;
  }
  try {
    console.log("start sendMoney");
    const destPubkey = new PublicKey(destPubkeyStr);
    const walletAccountInfo = await connection.getAccountInfo(wallet.publicKey);
    console.log("wallet data size", walletAccountInfo?.data.length);

    const receiverAccountInfo = await connection.getAccountInfo(destPubkey);
    console.log("receiver data size", receiverAccountInfo?.data.length);

    const instruction = SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: destPubkey,
      lamports,
    });
    let trans = await setPayerAndBlockhashTransaction(wallet, instruction);

    let signature = await signAndSendTransaction(wallet, trans);
    let result = await connection.confirmTransaction(signature, "singleGossip");
    console.log("end sendMoney", result);
  } catch (e) {
    console.warn("Failed", e);
  }
}

export async function setPayerAndBlockhashTransaction(wallet, instruction) {
  const transaction = new Transaction();
  transaction.add(instruction);
  transaction.feePayer = wallet.publicKey;
  let hash = await connection.getRecentBlockhash();
  transaction.recentBlockhash = hash.blockhash;
  return transaction;
}

export async function signAndSendTransaction(wallet, transaction) {
  try {
    console.log("start signAndSendTransaction");
    let signedTrans = await wallet.signTransaction(transaction);
    console.log("signed transaction");
    let signature = await connection.sendRawTransaction(
      signedTrans.serialize()
    );
    console.log("end signAndSendTransaction");
    return signature;
  } catch (err) {
    console.log("signAndSendTransaction error", err);
    throw err;
  }
}

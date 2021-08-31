import SystemProgram, {
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import programAccount from "constants.js";
import axios from "../config";

export async function createStream(
  connection,
  wallet,
  reciveraddress,
  starttime,
  endtime,
  amountspeed
) {
  const SEED = "abcdef" + Math.random().toString();
        let newAccount = await PublicKey.createWithSeed(
            wallet.publicKey,
            SEED,
            programAccount
        );

  let amounttosend = (endtime - starttime) * amountspeed;
  let reciverpubkey = PublicKey(reciveraddress);
  let response = await axios.post("/stream", {
    start_time: starttime,
    end_time: endtime,
    amount_second: amountspeed,
    lamports_withdrawn: 0,
    is_active: false,
    to: reciverpubkey.toBytes(),
    from: wallet.publicKey.toBytes(),
  });

  const lamports =
  (await connection.getMinimumBalanceForRentExemption(space)) + amounttosend;

 const space = 110;
        const lamports =
            (await connection.getMinimumBalanceForRentExemption(space)) + amounttosend;
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
      { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
      { pubkey: reciverpubkey, isSigner: false, isWritable: false },
    ],
    programAccount,
    data: response.data.result,
  });
 
  const trans = await setPayerAndBlockhashTransaction2(
    wallet,
    instruction,
    createInstruction
  );
  const signature = await signAndSendTransaction(wallet, trans);
  const result = await connection.confirmTransaction(signature, "singleGossip");
  console.log("end sendMessage", result);
  // stream created fetch all streams
}

async function createNewAccount(connection, wallet, amounttosend) {
  const SEED = "abcdef" + Math.random().toString();
  let newAccount = await PublicKey.createWithSeed(
    wallet.publicKey,
    SEED,
    programAccount
  );
  //size is 104;
  const space = 110;
 
  const instruction = SystemProgram.createAccountWithSeed({
    fromPubkey: wallet.publicKey,
    basePubkey: wallet.publicKey,
    seed: SEED,
    newAccountPubkey: newAccount,
    lamports:0,
    space,
    programId:programAccount,
  });
  let trans = await setPayerAndBlockhashTransaction(wallet, instruction);
  let signature = await signAndSendTransaction(wallet, trans);
  let result = await connection.confirmTransaction(signature, "singleGossip");
  console.log("new account created", result);
  return newAccount;
}

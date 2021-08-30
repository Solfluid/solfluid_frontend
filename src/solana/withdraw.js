import { PublicKey } from "@solana/web3.js";
import { axios } from "../config";
import {programAccount} from "constants.js";

export async function withdraw(streamid, amount_towithdraw) {
  let pubkey = PublicKey(streamid);
  let response = axios.post("/withdraw", { amount: amount_towithdraw });
  const createInstruction = new TransactionInstruction({
    keys: [
      { pubkey: pubkey, isSigner: false, isWritable: true },
      { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
    ],
    programAccount,
    data: response.data.result,
  });
  const trans = await setPayerAndBlockhashTransaction(
    wallet,
    createInstruction
  );
  const signature = await signAndSendTransaction(wallet, trans);
  const result = await connection.confirmTransaction(signature, "singleGossip");
  console.log("end sendMessage", result);
}

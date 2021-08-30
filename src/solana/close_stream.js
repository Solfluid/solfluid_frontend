import { PublicKey } from "@solana/web3.js";
import { axios } from "../config";
import { programAccount } from "constants.js";

export async function closeStream(streamid, reciverid,reciveryeild) {
  let pubkey = PublicKey(streamid);
  let reciverpubket=PublicKey(reciverid);
  let response = axios.post("/reward", { percentage: reciveryeild });
  const createInstruction = new TransactionInstruction({
    keys: [
      { pubkey: pubkey, isSigner: false, isWritable: true },
      { pubkey: pubkey, isSigner: false, isWritable: true },
      { pubkey: wallet.publicKey, isSigner: true, isWritable: false },
      { pubkey: reciverpubket, isSigner: true, isWritable: false },
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

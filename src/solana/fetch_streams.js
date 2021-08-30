import axios from "../config";

export async function getAllStreams(wallet) {
  let response = await axios.get(
    `/getallstream/${wallet.publickey.toString()}`
  );
  let sending = response.data.sending;
  let reciving = response.data.reciving;
}

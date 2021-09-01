import { combineReducers } from "redux";
import Wallet from "@project-serum/sol-wallet-adapter";
import { Connection } from "@solana/web3.js";

const cluster = "https://api.devnet.solana.com";

const walletConfig = {
  wallet: new Wallet("https://www.sollet.io", cluster),
  connection: new Connection(cluster, "confirmed"),
};

const connectWalletReducer = (state = walletConfig, action) => {
  switch (action.type) {
    case "WALLET_CONNECT":
      return { ...state, wallet: action.payload.wallet };
    case "WALLET_DISCONNECT":
      return { ...state, wallet: action.payload.wallet };
    default:
      return state;
  }
};

const createStreamReducer = (state = { result: false, id: null }, action) => {
  switch (action.type) {
    case "CREATE_RESPONSE":
      return {
        result: true,
        id: action.id,
      };
    case "CREATE_FAILED":
      return { ...state, result: false, id: null };
    case "CLEAR_RESPONSE":
      return {
        result: false,
        id: null,
      };
    default:
      return state;
  }
};
const getStreamReducer = (state = { sending: [], receving: [] }, action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      console.log(action);
      return {...state, 
        sending: action.result.sending,
        receving: action.result.receving,
      };
    default:
      return state;
  }
};


export default combineReducers({
  walletConfig: connectWalletReducer,
  createStream: createStreamReducer,
  streamData: getStreamReducer,
});

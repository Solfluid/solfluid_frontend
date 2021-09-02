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
const getStreamReducer = (state = { sending: [], receiving: [] }, action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      // console.log(action);
      return {...state, 
        sending: action.result.sending,
        receiving: action.result.receiving,
      };
    case "DATA_NOT_RECEIVED":
      return { sending: [], receiving: [] };
    default:
      return state;
  }
};

const withDrawStatus = (state=false , action) => {
    switch (action.type) {
		case "WITHDRAW_SUCCESS":
		  return true;
		case "WITHDRAW_FAILED":
		  return false;
		default:
		  return state;
	  }
}

const cancelStatus = (state=false , action) => {
    switch (action.type) {
		case "CANCEL_SUCCESS":
		  return true;
		case "CANCEL_FAILED":
		  return false;
		default:
		  return state;
	  }
}


export default combineReducers({
  walletConfig: connectWalletReducer,
  createStream: createStreamReducer,
  streamData: getStreamReducer,
  withdrawStatus: withDrawStatus,
  cancelStatus: cancelStatus
});

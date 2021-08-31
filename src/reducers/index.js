import { combineReducers } from 'redux';
import Wallet from "@project-serum/sol-wallet-adapter";
import {
  Connection,
} from "@solana/web3.js";

const cluster = "https://api.devnet.solana.com";

const walletConfig = {
    wallet: new Wallet("https://www.sollet.io", cluster),
    connection: new Connection(cluster, "confirmed"),
}

const connectWalletReducer = (state = walletConfig, action) => {
    switch(action.type){
        case "WALLET_CONNECT":
            return {...walletConfig,
                wallet : action.payload.wallet
            }
        case "WALLET_DISCONNECT":
            return {...walletConfig,
                wallet : action.payload.wallet
            }
        default:
            return state;
    }
}


export default combineReducers({walletConfig: connectWalletReducer});
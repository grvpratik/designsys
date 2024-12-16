import React from 'react'
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useMemo } from 'react';
import axios from 'axios';
import bs58 from "bs58"
const Conn = () => {
    const BACKEND_URL = ""
    const { publicKey, signMessage } = useWallet();

    async function signAndSend() {
        if (!publicKey) {
            return;
        }
        const now = new Date();
        const date = now.toISOString();
        const mess = `URI: mefoundation.com
Issued At: ${date}
Chain ID: sol 
Allocation Wallet:CS1z9NZRURVMbvYuhUdMbH7cSrkyxTha1JED4Q3LoMAa 
Claim Wallet:8rgpceMwuwj1jtWq6YS2StR9BxEhT9PgpmGDTSs5ijFX`;

        const message = new TextEncoder().encode(mess);
        const signature = await signMessage?.(message);
        if(!signature) return null
        const signatureBase58 = bs58.encode(signature);
        console.log(signatureBase58)
        console.log(publicKey)
        const response = await axios.post(`${BACKEND_URL}/v1/user/signin`, {
            signature,
            publicKey: publicKey?.toString()
        });

        localStorage.setItem("token", response.data.token);
    }
    useEffect(() => {
        signAndSend()
    }, [publicKey]);
  return (
      <div className="flex justify-between border-b pb-2 pt-2">
          <div className="text-2xl pl-4 flex justify-center pt-3">
              Turkify
          </div>
          <div className="text-xl pr-4 pb-2">
              {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
          </div>
      </div>
  )
}

export default Conn
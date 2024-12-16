
import { useEffect, useMemo } from 'react';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

import Conn from '../section/conn';

// Default styles that can be overridden by your app
import('@solana/wallet-adapter-react-ui/styles.css');


const SignPage = () => {
  
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = "https://mainnet.helius-rpc.com/?api-key=6edb4a3c-ac78-4b3d-93bc-fe905901735e";

    const wallets = useMemo(
        () => [],
        [network]
    );
   

    return <>  <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider >
                <Conn/>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider></>
}
export default SignPage;
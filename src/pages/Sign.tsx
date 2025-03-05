
import { useEffect, useMemo } from 'react';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

import Conn from '../layout/conn';

// Default styles that can be overridden by your app
import('@solana/wallet-adapter-react-ui/styles.css');


const SignPage = () => {
  
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = "https://mainnet.helius-rpc.com/?api-key=";

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
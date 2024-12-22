import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRightLeft, Send } from "lucide-react";

// Known DEX Program IDs
const KNOWN_DEX_PROGRAMS = {
    'JUP4Fb2cqiRUceTHhbdxCygmKj2WH9zKPt1zWQHKGHN': 'Jupiter',
    'RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr': 'Raydium',
    'whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc': 'Orca',
};

// Token Program ID
const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

const parseTokenAmount = (amount, decimals = 9) => {
    return amount / Math.pow(10, decimals);
};

const SolanaTransactionDetails = ({ address }) => {
    const rpcUrl=process.env.HELIUS_API
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const parseTransaction = async (connection, tx) => {
        if (!tx.transaction || !tx.transaction.message) return null;

        const message = tx.transaction.message;
        const accounts = message.accountKeys;
        const programIds = accounts.map(account => account.toString());

        // Try to identify the transaction type and platform
        let txInfo = {
            type: 'unknown',
            platform: 'unknown',
            details: {}
        };

        // Check for DEX transactions
        for (const [programId, platform] of Object.entries(KNOWN_DEX_PROGRAMS)) {
            if (programIds.includes(programId)) {
                txInfo.type = 'swap';
                txInfo.platform = platform;
                break;
            }
        }

        // Check for token transfers
        if (programIds.includes(TOKEN_PROGRAM_ID)) {
            const preTokenBalances = tx.meta?.preTokenBalances || [];
            const postTokenBalances = tx.meta?.postTokenBalances || [];

            // Calculate token transfers
            const transfers = [];

            postTokenBalances.forEach(post => {
                const pre = preTokenBalances.find(p =>
                    p.accountIndex === post.accountIndex &&
                    p.mint === post.mint
                );

                if (pre) {
                    const difference = parseTokenAmount(
                        post.uiTokenAmount.uiAmount - pre.uiTokenAmount.uiAmount,
                        post.uiTokenAmount.decimals
                    );

                    if (difference !== 0) {
                        transfers.push({
                            mint: post.mint,
                            amount: Math.abs(difference),
                            direction: difference > 0 ? 'in' : 'out',
                            decimals: post.uiTokenAmount.decimals,
                            tokenAccount: accounts[post.accountIndex].toString()
                        });
                    }
                }
            });

            if (transfers.length > 0) {
                txInfo.type = txInfo.type === 'unknown' ? 'transfer' : 'swap';
                txInfo.details.transfers = transfers;
            }
        }

        // Check for SOL transfers
        if (tx.meta?.preBalances && tx.meta?.postBalances) {
            const solTransfers = [];
            tx.meta.preBalances.forEach((pre, index) => {
                const post = tx.meta.postBalances[index];
                const difference = (post - pre) / LAMPORTS_PER_SOL;

                if (difference !== 0) {
                    solTransfers.push({
                        account: accounts[index].toString(),
                        amount: Math.abs(difference),
                        direction: difference > 0 ? 'in' : 'out'
                    });
                }
            });

            if (solTransfers.length > 0) {
                txInfo.details.solTransfers = solTransfers;
            }
        }

        return {
            ...tx,
            parsedInfo: txInfo
        };
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!address || !rpcUrl) return;

            setLoading(true);
            setError(null);

            try {
                const connection = new Connection(rpcUrl, 'confirmed');
                const pubKey = new PublicKey(address);

                const signatures = await connection.getSignaturesForAddress(pubKey, {
                    limit: 10
                });

                const txDetails = await Promise.all(
                    signatures.map(async (sig) => {
                        try {
                            const tx = await connection.getTransaction(sig.signature, {
                                maxSupportedTransactionVersion: 0
                            });

                            const parsedTx = await parseTransaction(connection, tx);

                            return {
                                signature: sig.signature,
                                timestamp: sig.blockTime,
                                status: !sig.err ? 'success' : 'failed',
                                slot: sig.slot,
                                parsedInfo: parsedTx?.parsedInfo
                            };
                        } catch (err) {
                            console.error(`Error fetching transaction ${sig.signature}:`, err);
                            return null;
                        }
                    })
                );

                setTransactions(txDetails.filter(tx => tx !== null));

            } catch (err) {
                setError(err.message);
                console.error('Error fetching transactions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [address, rpcUrl]);

    const renderTransactionDetails = (tx) => {
        const { parsedInfo } = tx;

        if (!parsedInfo) return null;

        return (
            <div className="mt-2">
                <div className="flex items-center gap-2">
                    {parsedInfo.type === 'swap' && <ArrowRightLeft className="h-4 w-4" />}
                    {parsedInfo.type === 'transfer' && <Send className="h-4 w-4" />}
                    <span className="capitalize font-medium">
                        {parsedInfo.type} {parsedInfo.platform !== 'unknown' && `on ${parsedInfo.platform}`}
                    </span>
                </div>

                {parsedInfo.details.transfers?.map((transfer, i) => (
                    <div key={i} className="text-sm mt-1 text-gray-600">
                        {transfer.direction === 'out' ? 'Sent' : 'Received'}{' '}
                        {transfer.amount.toFixed(6)} tokens ({transfer.mint})
                    </div>
                ))}

                {parsedInfo.details.solTransfers?.map((transfer, i) => (
                    <div key={i} className="text-sm mt-1 text-gray-600">
                        {transfer.direction === 'out' ? 'Sent' : 'Received'}{' '}
                        {transfer.amount.toFixed(6)} SOL
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Detailed Transactions
                    {loading && <Loader2 className="animate-spin h-5 w-5" />}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="text-red-600 mb-4">Error: {error}</div>
                )}

                {transactions.length > 0 ? (
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <Card key={tx.signature} className="bg-white shadow-sm">
                                <CardContent className="p-4">
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-700">Signature</div>
                                                <div className="text-gray-600 truncate">{tx.signature}</div>
                                            </div>

                                            <div className="text-sm">
                                                <div className="font-medium text-gray-700">Time</div>
                                                <div className="text-gray-600">
                                                    {tx.timestamp ? new Date(tx.timestamp * 1000).toLocaleString() : 'N/A'}
                                                </div>
                                            </div>
                                        </div>

                                        {renderTransactionDetails(tx)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : !loading ? (
                    <div className="text-center text-gray-500 py-8">
                        No transactions found
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
};

export default SolanaTransactionDetails;
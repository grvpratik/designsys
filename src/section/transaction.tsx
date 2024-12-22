import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, VersionedTransactionResponse } from '@solana/web3.js';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Loader2 } from "lucide-react";

const SolanaTransactions = ({ address, rpcUrl }:any) => {
    interface TransactionDetails {
        signature: string;
        timestamp: number | null | undefined;
        status: string;
        slot: number;
        transaction: VersionedTransactionResponse | null;
    }
    
    const [transactions, setTransactions] = useState<TransactionDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!address || !rpcUrl) return;

            setLoading(true);
            setError(null);

            try {
                const connection = new Connection(rpcUrl, 'confirmed');
                const pubKey = new PublicKey(address);

                // Get signatures
                const signatures = await connection.getSignaturesForAddress(pubKey, {
                    limit: 20 // Limiting to 20 for better performance
                });

                // Get transaction details
                const txDetails = await Promise.all(
                    signatures.map(async (sig) => {
                        try {
                            const tx = await connection.getTransaction(sig.signature, {
                                maxSupportedTransactionVersion: 0
                            });

                            return {
                                signature: sig.signature,
                                timestamp: sig.blockTime,
                                status: !sig.err ? 'success' : 'failed',
                                slot: sig.slot,
                                transaction: tx
                            };
                        } catch (err) {
                            console.error(`Error fetching transaction ${sig.signature}:`, err);
                            return null;
                        }
                    })
                );

                setTransactions(txDetails.filter(tx => tx !== null));

            } catch (err:any) {
                setError(err.message);
                console.error('Error fetching transactions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [address, rpcUrl]);

    if (error) {
        return (
            <Card className="w-full bg-red-50">
                <CardContent className="p-6">
                    <div className="text-red-600">Error: {error}</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Solana Transactions
                    {loading && <Loader2 className="animate-spin h-5 w-5" />}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {transactions.length > 0 ? (
                    <div className="space-y-4">
                        {transactions.map((tx) => (
                            <Card key={tx.signature} className="bg-white shadow-sm">
                                <CardContent className="p-4">
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

                                        <div className="text-sm">
                                            <div className="font-medium text-gray-700">Status</div>
                                            <div className={`inline-flex px-2 py-1 rounded-full text-xs ${tx.status === 'success'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {tx.status}
                                            </div>
                                        </div>

                                        <div className="text-sm">
                                            <div className="font-medium text-gray-700">Slot</div>
                                            <div className="text-gray-600">{tx.slot}</div>
                                        </div>
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

export default SolanaTransactions;
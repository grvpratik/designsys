
import React, { useEffect, useState } from "react";
import { CaipNetworkId, createAppKit, SIWXMessage } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { solana } from "@reown/appkit/networks";
import {
	DefaultSIWX,
	InformalMessenger,
	SIWXMessenger,
	SIWXStorage,
	SolanaVerifier,
} from "@reown/appkit-siwx";

import type { SIWXSession } from "@reown/appkit-core";

// Custom backend storage implementation
// class BackendStorage implements SIWXStorage {
// 	private baseUrl: string;

// 	constructor(baseUrl = "/api/sessions") {
// 		this.baseUrl = baseUrl;
// 	}

// 	async add(session: SIWXSession): Promise<void> {
// 		const response = await fetch(this.baseUrl, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(session),
// 		});
// // throw new Error("fff")
// 		if (!response.ok) {
// 			throw new Error("Failed to add session");
// 		}
// 	}

// 	async set(sessions: SIWXSession[]): Promise<void> {
// 		const response = await fetch(this.baseUrl, {
// 			method: "PUT",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(sessions),
// 		});

// 		if (!response.ok) {
// 			throw new Error("Failed to set sessions");
// 		}
// 	}

// 	async get(chainId: string, address: string): Promise<SIWXSession[]> {
// 		const response = await fetch(
// 			`${this.baseUrl}?chainId=${encodeURIComponent(
// 				chainId
// 			)}&address=${encodeURIComponent(address)}`
// 		);

// 		if (!response.ok) {
// 			return []
// 		}

// 		return response.json();
// 	}

// 	async delete(chainId: string, address: string): Promise<void> {
// 		const response = await fetch(
// 			`${this.baseUrl}?chainId=${encodeURIComponent(
// 				chainId
// 			)}&address=${encodeURIComponent(address)}`,
// 			{
// 				method: "DELETE",
// 			}
// 		);

// 		if (!response.ok) {
// 			throw new Error("Failed to delete sessions");
// 		}
// 	}
// }
class BackendStorage implements SIWXStorage {
		private baseUrl: string;

		constructor(baseUrl = "http://localhost:3000/api/auth/sessions") {
			this.baseUrl = baseUrl;
		}

		async add(session: SIWXSession): Promise<void> {
			console.log("add")
			const response = await fetch(this.baseUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(session),
				credentials: "include", // Important: Ensure cookies are sent with the request
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				return Promise.reject(
					`Failed to add session: ${errorData.error || response.statusText}`
				);
			}

			return Promise.resolve();
		}

		async set(sessions: SIWXSession[]): Promise<void> {
			console.log("set")
			

			const response = await fetch(this.baseUrl, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(sessions),
				credentials: "include", // Important: Ensure cookies are sent with the request
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				return Promise.reject(
					`Failed to set sessions: ${errorData.error || response.statusText}`
				);
			}
			return Promise.resolve();
		}

		async get(chainId: string, address: string): Promise<SIWXSession[]> {
			console.log("get")
			const response = await fetch(
				`${this.baseUrl}?chainId=${encodeURIComponent(
					chainId
				)}&address=${encodeURIComponent(address)}`,
				{
					credentials: "include", // Important: Ensure cookies are sent with the request
				}
			);

			if (response.status === 401 || response.status === 403) {
				// Handle authentication/authorization errors
				const errorData = await response.json().catch(() => ({}));
				console.error(
					"Session access error:",
					errorData.error || response.statusText
				);
				return []; // Return empty array for auth errors
			}

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				// return Promise.reject(
				// 	`Failed to get sessions: ${errorData.error || response.statusText}`
				// );
				return [];
			}

			return Promise.resolve(response.json());
		}

		async delete(chainId: string, address: string): Promise<void> {
			console.log("delete")
			const response = await fetch(
				`${this.baseUrl}?chainId=${encodeURIComponent(
					chainId
				)}&address=${encodeURIComponent(address)}`,
				{
					method: "DELETE",
					credentials: "include", // Important: Ensure cookies are sent with the request
				}
			);

			if (!response.ok) {
				// If session was not found, we still consider the deletion successful
				// if (response.status === 404) {
				// 	return Promise.resolve();
				// }

				const errorData = await response.json().catch(() => ({}));
				return Promise.reject(
					`Failed to delete sessions: ${errorData.error || response.statusText}`
				);
			}
			return Promise.resolve();
		}
 }

export class LocalStorage implements SIWXStorage {
	private key: string;

	constructor(params: LocalStorage.ConstructorParams) {
		this.key = params.key;
	}

	add(session: SIWXSession): Promise<void> {
		const sessions = this.getSessions();
		sessions.push(session);
		this.setSessions(sessions);

		return Promise.resolve();
	}

	set(sessions: SIWXSession[]): Promise<void> {
		this.setSessions(sessions);

		return Promise.resolve();
	}

	get(chainId: CaipNetworkId, address: string): Promise<SIWXSession[]> {
		const allSessions = this.getSessions();

		const validSessions = allSessions.filter((session) => {
			const isSameChain = session.data.chainId === chainId;
			const isSameAddress = session.data.accountAddress === address;

			const startsAt = session.data.notBefore || session.data.issuedAt;
			if (startsAt && Date.parse(startsAt) > Date.now()) {
				return false;
			}

			const endsAt = session.data.expirationTime;
			if (endsAt && Date.now() > Date.parse(endsAt)) {
				return false;
			}

			return isSameChain && isSameAddress;
		});

		return Promise.resolve(validSessions);
	}

	delete(chainId: string, address: string): Promise<void> {
		const sessions = this.getSessions().filter(
			(session) =>
				session.data.chainId !== chainId &&
				session.data.accountAddress !== address
		);
		this.setSessions(sessions);

		return Promise.resolve();
	}

	private getSessions(): LocalStorage.Sessions {
		if (typeof localStorage === "undefined") {
			throw new Error("localStorage not available");
		}

		const stringItem = localStorage.getItem(this.key);

		return stringItem ? JSON.parse(stringItem) : [];
	}

	private setSessions(sessions: LocalStorage.Sessions): void {
		localStorage.setItem(this.key, JSON.stringify(sessions));
	}
}
export namespace LocalStorage {
	export type ConstructorParams = {
		/**
		 * The key to save the sessions in the localStorage.
		 */
		key: string;
	};

	export type Sessions = SIWXSession[];
}
class MyMessenger extends SIWXMessenger {
	// Implement the required version property
	protected readonly version = "1";

	// Implement the required stringify method properly
	protected override stringify(params: SIWXMessage.Data): string {
		return (
			`${params.statement || "Sign in with your wallet"}\n` +
			`URI: ${params.uri}\n` +
			`Version: ${params.version}\n` +
			`Chain ID: ${params.chainId}\n` +
			`Nonce: ${params.nonce}\n` +
			`Issued At: ${params.issuedAt}\n` +
			`${
				params.expirationTime
					? `Expiration Time: ${params.expirationTime}\n`
					: ""
			}` +
			`${params.requestId ? `Request ID: ${params.requestId}\n` : ""}` +
			`Address: ${params.accountAddress}`
		);
	}
}
// Create the DefaultSIWX configuration with custom backend storage
const siwx = new DefaultSIWX({
	messenger: new MyMessenger({
		domain: "app.com",
		uri: "https://app.com/login",
		statement: "Sign in to My Application",
		resources: [], // Optional array of resources
		expiration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
		getNonce: async () => Math.random().toString(36).substring(2),
		getRequestId: async () =>
			crypto.randomUUID?.() ||
			`${Date.now()}-${Math.random().toString(36).substring(2)}`,
	}),
	verifiers: [new SolanaVerifier()],
	storage: new BackendStorage(),
});
// Rest of the code remains the same as in previous implementation
// ...
// Wallet Configuration
const solanaWeb3JsAdapter = new SolanaAdapter({
	wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

const metadata = {
	name: "Your Solana App",
	description: "Solana Wallet Connection Example",
	url: "http://localhost:3000",
	icons: ["https://yourapp.com/logo.png"],
};

// Initialize AppKit
createAppKit({
	adapters: [solanaWeb3JsAdapter],
	networks: [solana],
	metadata: metadata,
	siwx,
	features: {
		email: false,
		analytics: true,
		socials: ["google", "x", "discord"],
	},
	projectId: "d593c206db1515e0a5b3a31dbcc16db7",

	allWallets: "HIDE",
	enableWalletConnect: false,
	debug: true,
	termsConditionsUrl: "https://www.mytermsandconditions.com",
	privacyPolicyUrl: "https://www.myprivacypolicy.com",
}).subscribeState((newState) => console.log("sub", newState));
// Wrapper Component to Ensure AppKit is Initialized
export default function WalletProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mount, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	if (!mount) return <div>Loading...</div>;

	return <>{children}</>;
}



 

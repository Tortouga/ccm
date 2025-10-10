import React, { createContext, useContext, useState, useEffect } from "react";
import { Wallet } from "@/lib/functions/wallet";
import { useAuth } from "@/context/AuthContext";
import { tablesDB, DATABASE_ID, WALLET_TABLE_ID } from "@/lib/appwrite";

const ArgentContext = createContext(null);

export const ArgentProvider = ({ children }) => {
	const { loggedInUser } = useAuth();
	const [argent, setArgent] = useState(0);
	const [loading, setLoading] = useState(true);
	const [walletId, setWalletId] = useState(null);

	useEffect(() => {
		// Récupération du wallet de l'utilisateur
		const loadWallet = async () => {
			if (!loggedInUser) {
				setArgent(0);
				setWalletId(null);
				setLoading(false);
				return;
			}
			try {
				const existingWallets = await tablesDB.listRows({
					databaseId: DATABASE_ID,
					tableId: WALLET_TABLE_ID,
					queries: [{ key: "userId", relation: "=", value: loggedInUser.$id }],
				});
				if (existingWallets.total > 0) {
					// 2️⃣ Wallet trouvé → on le charge
					const wallet = existingWallets.rows[0];
					setArgent(wallet.balance);
					setWalletId(wallet.$id);
					console.log("💰 Wallet existant trouvé :", wallet);
				} else {
					// Si aucun wallet, on le crée avec 100 de départ
					const newWallet = await Wallet.createWallet({
						id: loggedInUser.$id,
						userId: loggedInUser.$id,
						balance: 100,
					});
					setArgent(newWallet.balance);
					setWalletId(newWallet.$id);
					console.log("🪙 Nouveau wallet créé :", newWallet);
				}
			} catch (error) {
				console.error("Erreur de chargement du wallet :", error);
			} finally {
				setLoading(false);
			}
		};

		loadWallet();
	}, [loggedInUser]);

	const updateArgent = async (amount) => {
		if (!walletId) return;

		const newBalance = argent + amount;
		setArgent(newBalance);

		try {
			await Wallet.updateWallet(walletId, { balance: newBalance });
		} catch (error) {
			console.error("Erreur lors de la mise à jour du wallet :", error);
		}
	};

	return (
		<ArgentContext.Provider
			value={{ argent, setArgent, updateArgent, loading }}
		>
			{children}
		</ArgentContext.Provider>
	);
};

export const useArgent = () => {
	const context = useContext(ArgentContext);
	if (!context) {
		throw new Error(
			"useArgent doit être utilisé à l'intérieur d'un ArgentProvider"
		);
	}
	return context;
};

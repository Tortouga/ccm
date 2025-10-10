import React from "react";
import { tablesDB, DATABASE_ID, WALLET_TABLE_ID } from "@/lib/appwrite";

export const Wallet = {
	createWallet: async (walletInfos) => {
		try {
					if (!walletInfos.id) throw new Error("❌ walletInfos.id manquant");

				
			const response = await tablesDB.createRow({
				databaseId: DATABASE_ID,
				tableId: WALLET_TABLE_ID,
				rowId: walletInfos.id,
				fields: {
					userId: walletInfos.userId,
					balance: walletInfos.balance ?? 0,
				},
			});
			console.log("✅ Wallet créé avec succès :", response);
			return response;
		} catch (error) {
			console.error("❌ Erreur lors de la création du wallet :", error);
			throw error;
		}
	},

	getWallet: async (WalletId) => {
		try {
			const response = await tablesDB.getRow(WalletId);
			return response;
		} catch (error) {
			console.error("❌ Erreur lors de la récupération du profil :", error);
			throw error;
		}
	},

	updateWallet: async (walletId, newBalance) => {
		try {
			if (!walletId) throw new Error("walletId manquant");

			const response = await tablesDB.updateRow({
				databaseId: DATABASE_ID,
				tableId: WALLET_TABLE_ID,
				RowId: walletId,
				data: {balance: newBalance},
			});
			return response;
		} catch (error) {
			console.error("❌ Erreur lors de la mise à jour du profil :", error);
			throw error;
		}
	},
};

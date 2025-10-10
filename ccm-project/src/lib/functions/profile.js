import React from 'react'
import { tablesDB, DATABASE_ID, USERS_TABLE_ID } from "@/lib/appwrite";

export const Profile = {
	createProfile: async (userInfos) => {
		try {
			const response = await tablesDB.createRow({
				databaseId: DATABASE_ID,
				tableId: USERS_TABLE_ID,
				id: userInfos.id,
				fields: {
					username: userInfos.username,
					email: userInfos.email,
					telephone: userInfos.telephone || "",
					victories: userInfos.victories || 0,
					defeats: userInfos.defeats || 0,
				},
			});
			console.log("✅ Profil créé avec succès :", response);
			return response;
		} catch (error) {
			console.error("❌ Erreur lors de la création du profil :", error);
			throw error;
		}
	},

	getProfile: async (userId) => {
		try {
			const response = await tablesDB.getRow(userId);
			return response;
		} catch (error) {
			console.error("❌ Erreur lors de la récupération du profil :", error);
			throw error;
		}
	},

	updateProfile: async (userId, updates) => {
		try {
			const response = await tablesDB.updateRow(userId, updates);
			return response;
		} catch (error) {
			console.error("❌ Erreur lors de la mise à jour du profil :", error);
			throw error;
		}
	},
};
import { Client, Account, TablesDB } from "appwrite";

export const client = new Client();

client
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your project ID

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const USERS_TABLE_ID = import.meta.env.VITE_APPWRITE_USERS_TABLE_ID;
export const WALLET_TABLE_ID = import.meta.env.VITE_APPWRITE_USERS_TABLE_ID;


export { ID } from "appwrite";

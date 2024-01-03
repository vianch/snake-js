import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const Database = class Database {
	constructor(publicKey) {
		this.supabase = createClient("https://xyzcompany.supabase.co", publicKey);
	}

	async fetchData(tableName, columnName, ascending = false) {
		const { data, error } = await this.supabase
			.from(tableName)
			.select("*")
			.order(columnName, { ascending })
			.limit(10);

		if (error) {
			throw new Error(error);
		}

		return data;
	}

	async saveData(tableName, score) {
		const { data, error } = await this.supabase
			.from(tableName)
			.insert([{ id: 1, score }]);

		if (error) {
			throw new Error(error);
		}

		return data;
	}
};

export default Database;

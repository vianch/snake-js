import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const Database = class Database {
	constructor(
		key,
		settings = {
			db: {
				schema: "public",
			},
		}
	) {
		this.supabase = createClient(
			"https://umstebrxemlypnvguaiv.supabase.co",
			key,
			settings
		);
	}

	async fetchData(tableName, columnName, ascending = false) {
		const { data, error } = await this.supabase
			.from(tableName)
			.select(columnName)
			.order(columnName, { ascending })
			.limit(10);

		if (error) {
			throw new Error(error);
		}

		return data;
	}

	async saveData(tableName, column, value) {
		const { data, error } = await this.supabase
			.from(tableName)
			.update([{ [column]: value }])
			.eq("id", 1);

		if (error) {
			throw new Error(error);
		}

		return data;
	}
};

export default Database;

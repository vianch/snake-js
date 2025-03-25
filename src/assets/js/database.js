import { createClient } from "@supabase/supabase-js";
import { dbColumns } from "./constants";

// Create a single supabase client for interacting with your database
const Database = class Database {
	constructor(
		url,
		key,
		settings = {
			db: {
				schema: "public",
			},
		}
	) {
		this.supabase = createClient(url, key, settings);
	}

	async fetchData(
		tableName,
		columnName,
		options = { ascending: false, orderBy: dbColumns.id, limit: 10 }
	) {
		const { ascending, orderBy, limit } = options;
		const { data, error } = await this.supabase
			.from(tableName)
			.select(columnName)
			.order(orderBy, { ascending })
			.limit(limit);

		if (error) {
			throw new Error(error);
		}

		return data;
	}

	/** Update data in the db
	 * @param tableName
	 * @param newValue e.g: { score: value, updated_at: new Date() }
	 * @returns {Promise<null>}
	 */
	async updateData(tableName, newValue) {
		const { data, error } = await this.supabase
			.from(tableName)
			.update([newValue])
			.eq("id", 1);

		if (error) {
			throw new Error(error);
		}

		return data;
	}

	/** insert data in the db
	 * @param tableName
	 * @param newValue e.g: { score: value, created_at: new Date() }
	 * @returns {Promise<null>}
	 */
	async insertData(tableName, newValue) {
		const { data, error } = await this.supabase
			.from(tableName)
			.insert([newValue]);

		if (error) {
			throw new Error(error);
		}

		return data;
	}
};

export default Database;

import { dbColumns, dbTables } from "./constants";

const STORAGE_KEY = "snake-js:db";
const SCORES_HISTORY_LIMIT = 50;

const emptyState = () => ({
	[dbTables.highScores]: [
		{ [dbColumns.score]: 0, [dbColumns.updatedAt]: null },
	],
	[dbTables.scores]: [],
});

const readState = () => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);

		if (!raw) return emptyState();
		const parsed = JSON.parse(raw);

		return {
			[dbTables.highScores]:
				parsed[dbTables.highScores] ?? emptyState()[dbTables.highScores],
			[dbTables.scores]: parsed[dbTables.scores] ?? [],
		};
	} catch {
		return emptyState();
	}
};

const writeState = (state) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		// Quota exceeded or storage unavailable (e.g. Safari private mode).
		// Don't crash the game over a missed score persist.
	}
};

const fetchData = async (
	tableName,
	_columnName,
	options = { ascending: false, orderBy: dbColumns.id, limit: 10 }
) => {
	const { ascending = false, orderBy = dbColumns.id, limit = 10 } = options;
	const state = readState();
	const rows = [...(state[tableName] ?? [])];

	rows.sort((a, b) => {
		const av = a[orderBy];
		const bv = b[orderBy];

		if (av === bv) return 0;
		const cmp = av > bv ? 1 : -1;

		return ascending ? cmp : -cmp;
	});

	return rows.slice(0, limit);
};

const updateData = async (tableName, newValue) => {
	const state = readState();

	state[tableName] = [{ ...(state[tableName]?.[0] ?? {}), ...newValue }];
	writeState(state);

	return null;
};

const insertData = async (tableName, newValue) => {
	const state = readState();
	const list = state[tableName] ?? [];
	const nextId = list.reduce((max, r) => Math.max(max, r.id ?? 0), 0) + 1;

	list.unshift({ id: nextId, ...newValue });
	state[tableName] = list.slice(0, SCORES_HISTORY_LIMIT);
	writeState(state);

	return null;
};

const database = { fetchData, updateData, insertData };

export default database;

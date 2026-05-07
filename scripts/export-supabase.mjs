#!/usr/bin/env node
/**
 * One-shot export of highScores + scores tables from Supabase to JSON.
 * Usage:  node scripts/export-supabase.mjs
 * Output: ./supabase-export.json
 *
 * URL + anon key are public (RLS-protected anon role) and hardcoded so the
 * script stays runnable as a backup until the Supabase project is deleted.
 */

import { writeFile } from "node:fs/promises";

const SUPABASE_URL = "https://kelhaifqldjdszizxtrp.supabase.co";
const SUPABASE_ANON_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbGhhaWZxbGRqZHN6aXp4dHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDUzMzQsImV4cCI6MjA1ODQ4MTMzNH0.AIFP_bPkg67iLpwoyuYehu6fyNdbX4e1rVU1obXps_A";

async function fetchTable(table) {
	const url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
	const res = await fetch(url, {
		headers: {
			apikey: SUPABASE_ANON_KEY,
			Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
		},
	});
	if (!res.ok) {
		throw new Error(`${table}: ${res.status} ${await res.text()}`);
	}
	return res.json();
}

try {
	const [highScores, scores] = await Promise.all([
		fetchTable("highScores"),
		fetchTable("scores"),
	]);

	const out = {
		exportedAt: new Date().toISOString(),
		highScores,
		scores,
	};

	await writeFile("./supabase-export.json", JSON.stringify(out, null, 2));
	console.log(
		`Wrote supabase-export.json — highScores: ${highScores.length}, scores: ${scores.length}`
	);
} catch (err) {
	console.error("Export failed:", err.message);
	process.exit(1);
}

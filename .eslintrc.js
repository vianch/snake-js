module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ["prettier"],
	extends: ["airbnb-base", "eslint:recommended", "prettier"],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"prettier/prettier": "error",
		"no-console": "error",
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: "block", next: "*" },
			{ blankLine: "always", prev: "*", next: "block-like" },
			{ blankLine: "always", prev: "block-like", next: "*" },
			{ blankLine: "always", prev: ["case", "default"], next: "*" },
			{ blankLine: "always", prev: "block-like", next: "block-like" },
			{ blankLine: "always", prev: "*", next: "return" },
			{ blankLine: "always", prev: "*", next: "if" },
			{ blankLine: "always", prev: "*", next: "for" },
			{
				blankLine: "always",
				prev: ["const", "let", "var"],
				next: "*",
			},
			{
				blankLine: "any",
				prev: ["const", "let", "var"],
				next: ["const", "let", "var"],
			},
			{ blankLine: "always", prev: "directive", next: "*" },
			{ blankLine: "any", prev: "directive", next: "directive" },
		],
		"lines-between-class-members": [
			"error",
			"always",
			{ exceptAfterSingleLine: true },
		],
	},
};

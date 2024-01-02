import { uglify } from "rollup-plugin-uglify";

const devMode = process.env.NODE_ENV === "development";

export default [
	{
		input: "./src/assets/js/index.js",
		output: {
			file: "./src/assets/js/bundle.min.js",
			format: "iife",
			sourcemap: devMode ? "inline" : false,
		},
		plugins: [uglify()],
	},
];

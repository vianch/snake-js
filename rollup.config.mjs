import { uglify } from "rollup-plugin-uglify";

export default [
	{
		input: "./src/assets/js/index.js",
		output: {
			file: "./src/assets/js/bundle.min.js",
			format: "iife",
			sourcemap: false,
		},
		plugins: [uglify()],
	},
];

// eslint-disable-next-line
module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		"plugin:tailwindcss/recommended",
	],
	ignorePatterns: ["dist/*"],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh', 'simple-import-sort'],
	rules: {
		"no-trailing-spaces": ["error", { "skipBlankLines": true }],
		"indent": ["error", "tab"],
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		'semi': [2, 'always'],
		'react/jsx-indent': ["error", 'tab'],
		"react/self-closing-comp": ["error", {
			"component": true,
			"html": true
		}],
		'react-refresh/only-export-components': 'warn',
	},
};

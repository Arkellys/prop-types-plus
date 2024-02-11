module.exports = {
	extends: [
		"plugin:mocha/recommended",
		"arklint"
	],
	rules: {
		"mocha/no-mocha-arrows": "off"
	},
	ignorePatterns: ["lib"]
};
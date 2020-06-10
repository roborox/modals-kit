module.exports = {
	roots: [
		"<rootDir>/src",
	],
	transform: {
		"\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest",
		"\\.(js)$": "<rootDir>/node_modules/babel-jest",
	},
	setupFiles: [
		"./setup-jest.js",
	],
}

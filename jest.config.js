module.exports = {
	preset: 'ts-jest',
	testMatch: [
	  "**/__tests__/**/*.+(ts|tsx|js)",
	  "**/?(*.)+(spec|test).+(ts|tsx|js)"
	],
	transform: {
	  "^.+\\.(ts|tsx)$": "ts-jest",
	  '^.+\\.(js|jsx)$': 'babel-jest'
	},
}
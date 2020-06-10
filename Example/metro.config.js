const path = require("path")

module.exports = {
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: false,
			},
		}),
	},
	projectRoot: path.resolve(__dirname),
	watchFolders: [
		path.resolve(__dirname, "../src"),
	],
	resolver: {
		extraNodeModules: new Proxy({}, {
			get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
		}),
	},
}

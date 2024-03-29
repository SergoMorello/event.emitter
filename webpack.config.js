const path = require('path');

module.exports = {
  entry: {
	index: '/src/index.ts'
  },
  target: 'web',
  mode: 'production', //production | development
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
			'ts-loader'
		],
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
	library: 'EventEmitter',
	libraryTarget: 'umd',
	auxiliaryComment: 'Easy Event Emitter'
  }
};
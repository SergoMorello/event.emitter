import type { Configuration } from 'webpack';
import path from 'path';

const config: Configuration = {
  entry: {
	index: path.resolve(__dirname, 'src/index.ts')
  },
  target: 'web',
  mode: 'production',
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
    extensions: ['.ts'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
	clean: true,
	library: {
	  name: 'EventEmitter',
	  type: 'umd',
	  export: 'default'
	},
	globalObject: 'this'
  }
};

export default config;
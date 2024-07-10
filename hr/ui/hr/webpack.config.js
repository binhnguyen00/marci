const path = require('path');

const config = { 
  context: __dirname,
  entry: "./src/index.tsx",
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'bootstrap': 'bootstrap',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  output: {
    publicPath: '/',
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  devtool: 'inline-source-map',
} 

module.exports = config;
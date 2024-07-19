const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configPlugins = [
  new HtmlWebpackPlugin({ // This helps create index.html in dist.
    template: './public/index.html'
  })
];

const config = { 
  context: __dirname,

  entry: [
    "./src/index.tsx", 
    "./src/main.tsx"
  ],

  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: { // Required for exporting custom library
      name: 'marci_ui_lib',
      type: 'umd2',
      umdNamedDefine: true
    },
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

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/,
  },

  /** This reduces the bundle size.
   * Consiser using this config with CDN in index.html. Else, shall not use. 
    externals: {
      'bootstrap': 'bootstrap',
    }, 
   */

  devtool: 'source-map',

  devServer: {
    port: 3000
  },
  
  plugins: configPlugins
} 

module.exports = config;
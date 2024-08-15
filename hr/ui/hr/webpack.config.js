const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const developing = process.argv[process.argv.indexOf('--mode') + 1] === 'development';
const watching = process.argv[process.argv.indexOf('--watch')];

// Development
let devtool = false;
if (developing) devtool = 'source-map'

// Plugins
let configPlugins = [
  new HtmlWebpackPlugin({ // This helps create index.html in dist.
    template: './public/index.html',
    favicon: './public/assets/imgs/favicon.ico'
  }),
];
if (watching) {
}

const config = { 
  context: __dirname,

  entry: [
    "./src/index.tsx", 
    "./src/main.tsx",
  ],

  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: { // Required for exporting custom library
      name: 'marci-ui/hr',
      type: 'umd2',
      umdNamedDefine: true
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { sourceMap: developing } }
        ],
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  optimization: {
    minimize: !developing,
  },

  watchOptions: {
    ignored: /node_modules/,
  },

  /** This reduces the bundle size.
   * Consiser using this config with CDN in index.html. Else, shall not use. 
    externals: {
      'bootstrap': 'bootstrap',
    }, 
   */

  devtool: devtool,

  devServer: {
    port: 3000,
  },
  
  plugins: configPlugins
} 

module.exports = config;
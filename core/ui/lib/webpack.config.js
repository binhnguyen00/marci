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
    "./src/index.tsx"
  ],
  output: {
    publicPath: '/',
    filename: 'main.js', // Output file name
    chunkFilename: 'main.js',
    library: {
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
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  /** This reduces the bundle size.
   * Consiser using this config with CDN in index.html. Else, shall not use. 
    externals: {
      'react': 'react',
      'react-dom': 'react-dom',
      'bootstrap': 'bootstrap',
    }, 
   */
  devtool: 'source-map',
  plugins: configPlugins
} 

module.exports = config;
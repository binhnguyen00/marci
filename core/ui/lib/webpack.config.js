const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const configPlugins = [
  new HtmlWebpackPlugin({ // This helps create index.html in dist.
    template: './public/index.html'
  })
];

const config = { 
  context: __dirname,

  entry: {
    main: "./src/index.tsx"
  },

  output: {
    publicPath: '/',
    filename: '[name].js', // Output file name. The name is depended on entry.
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/,
  },

  // Gotta external these, or else there will be 2 instant of React running
  externals: { 
    'react': 'react',
    'react-dom': 'react-dom',
    'bootstrap': 'bootstrap',
  }, 

  devtool: 'source-map',

  plugins: configPlugins,
} 

module.exports = config;
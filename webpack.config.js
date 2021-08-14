const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  mode: 'development',
  devServer: {
    port: 8085,
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        /* The following line to ask babel
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel.
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader:
          'babel-loader',
        options: {
          presets: [
            '@babel/preset-env' /* to transfer any advansed ES to ES5 */,
            '@babel/preset-react',
          ], // to compile react to ES5
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin(
      {
        name: 'UIComponent',
        filename:
          'remoteEntry.js',
        exposes: {
          './Button':
            './src/Button',
        },
        remotes: {
          LibApp: "libApp@http://localhost:8087/remoteEntry.js",
        },
      }
    ),
    new HtmlWebpackPlugin({
      template:
        './public/index.html',
    }),
  ],
};

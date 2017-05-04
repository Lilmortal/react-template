const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // It will look for index.js inside /src, and create a 'bundle.js' in /build which is a generated webpack bundle.
  context: path.resolve(__dirname, "src"),
  // Added babel-polyfill, this is needed for IE11 to work
  entry: ["babel-polyfill", "./index.js"],
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    alias: {
      react$: path.resolve("./node_modules/react"),
    },
  },

  // hot means Hot module reloading, meaning it will update the browser when there is a code change without reloading
  // the entire browser; inline means reloading the entire browser and this happens when hot module reloading fails.
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000,
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        // For all js files, babel-loader will transpile them to be able to use >=ES6, babel plugins etc are handled in '.babelrc' file.
        // Check for code correctness using ESLint and Prettier which follows the AirBnB coding standard. Some rules are disabled on '.eslintrc'
        // file. Will fail the build if there are any errors.
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        // Process CSS files with PostCSS plugins which is handled in 'postcss.config.js' file;
        // css-loader interprets @import and url() like requires;
        // style-loader inject CSS to the <style> tag in DOM.
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        // Url loader handles files with an url.
        test: /\.(png|jpg)$/,
        use: ["url-loader"],
      },
    ],
  },

  plugins: [
    // Creates the default HTML page using this template
    new HtmlWebpackPlugin({
      template: "public/index.template.html",
      hash: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // This should move css files into a seperate stylesheet; this is good because CSS and JS can load in parallel,
    // reducing the time for the website to load. (SHOULD ONLY WORK IN PRODUCTION I THINK; TODO: implement this for production)
    new ExtractTextPlugin("css/styles.css"),
  ],
};

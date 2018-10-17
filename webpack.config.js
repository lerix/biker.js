const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        publicPath: '/',
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        }, {
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }],

        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //activates HMR

        new webpack.NamedModulesPlugin(),
        //prints more readable module names in the browser console on HMR updates
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};
/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfiguration = require('../../../../webpack.base');

module.exports = merge(baseConfiguration, {
    output: {
        path: path.resolve(__dirname, '../../../../dist/WebSPA'),
        filename: "app.js",
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/Apps/WebSPA/index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/Apps/WebSPA/favicon.ico', to: './dist/WebSPA/favicon.ico' },
            ],
        })
    ],
});
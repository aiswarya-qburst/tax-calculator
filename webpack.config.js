"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    // Set debugging source maps to be "inline" for
    // simplicity and ease of use
    devtool: "inline-source-map",
    // The application entry point
    entry: "./src/index.tsx",
    // Where to compile the bundle
    // By default the output directory is `dist`
    output: {
        filename: "bundle.js"
    },
    mode: 'development',
    // Supported file loaders
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    // File extensions to support resolving
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
        publicPath: "/",
        contentBase: "dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            scriptLoading: 'defer'
        })
    ]
};
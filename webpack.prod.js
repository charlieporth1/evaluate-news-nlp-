const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    devtool: 'source-map',
    stats: 'verbose',
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    }
                }
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ["style-loader", {
                    loader: 'css-loader',
                    options: {
                        url: true,
                        import: true,
                    }
                }],
            },
            {
                test: /\.link\.css$/i,
                exclude: /node_modules/,
                use: [
                    {loader: 'style-loader', options: {injectType: 'linkTag'}},
                    {loader: 'file-loader'},
                ],
            },
            {
                test: /\.(png|jp?e?g|gif)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],

            }, {
                test: /\.(ttf|woff|woff2)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            inject: true,
            minify: true,
            cache: true,
            title: "Webpack App Prod",
            excludeChunks: [ 'server' ]
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
    ]
};

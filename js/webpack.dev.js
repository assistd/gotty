const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    entry: {
        "gotty": "./src/main.ts",
    },
    output: {
        path: path.resolve(__dirname, '/js/'),
        filename: '[name].js',
    },
    mode: 'development',
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new LicenseWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'webpack Boilerplate',
          template: path.resolve(__dirname, './index.html'), // template file
          filename: 'index.html', // output file
          NODE_ENV: process.env.NODE_ENV,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            includePaths: ["node_modules/bootstrap/scss"]
                        }
                    }
                }
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, '../bindata/static'),
      },
      port: 9090,
    }
};

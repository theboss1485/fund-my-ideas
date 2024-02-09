const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const { InjectManifest} = require('workbox-webpack-plugin');

module.exports = () => {
    return {
        mode: 'development',
        entry: {

            main: './src/javascript/index.js',
            install: './src/javascript/install.js'
        },
        output: {

            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        plugins: [
            
            // Here, we generate an HTML file with webpack, seemingly for the dist.
            new HtmlWebpackPlugin({
                
                template: './index.html',
                title: 'Webpack Plugin',
                favicon: './favicon.ico'
            }),

            // Here, we set up configuration for the creation of the manifest.
            new WebpackPwaManifest({

                name: 'Text Editor',
                short_name: 'TE',
                description: 'This is the the third group project for the OSU Web Development bootcamp, Fund My Idea$.',
                background_color: '#225ca3',
                theme_color: '#225ca3',
                crossorigin: 'use-credentials',
                start_url: '/',
                publicPath: '/',
                icons: [

                    {
                        src: path.resolve('src/images/vite.svg'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join('assets', 'icons'),
                    }
                ]
            }),

            new MiniCssExtractPlugin(),

            // We use InjectManifest to set up the service worker.
            new InjectManifest({

                swSrc: './src-sw.js',
                swDest: 'src-sw.js'
            })
        ],
        module: {

            // I took this ruleset from activity 10 of Module 18.
            // Here, we use rules to be able to bundle images, CSS and JavaScript into the dist folder.
            rules: [

                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {

                        loader: 'babel-loader',
                        options: {

                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.jsx?$/, // Match .js and .jsx files
                    exclude: /node_modules/,
                    use: {

                        loader: 'babel-loader', // Use Babel to transpile JSX code
                        options: {
                            
                            presets: ['@babel/preset-react'], // Use the React preset
                        },
                    },
                },
                {
                    test: /\.(jsx|js)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": "defaults" 
                                }],
                                '@babel/preset-react'
                            ]
                        }
                    }]
                }
            ],
        },
    };
};

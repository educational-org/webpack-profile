// aquí trabajamos configuraciones que añadiremos a nuestro proyecto, extensiones, entry point

const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotevn = require('dotenv-webpack');

//cofiguraciones del web pack
module.exports ={
    //este es el punto de entrada
    entry:'./src/index.js',
    //output hacia donde vamos a enviar lo que se preparará
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].[contenthash].js',
        // assetModuleFilename:'assets/images/[hash][ext][query]'
    },
    mode:'development',
    watch :true,
    resolve:{
        //qué tipo de extensiones va a identificar webpack e nuestro proyecto
        extensions:['.js'],
        alias:{
            '@utils': path.resolve(__dirname,'src/utils/'),
            '@templates': path.resolve(__dirname,'src/templates/'),
            '@styles': path.resolve(__dirname,'src/styles/'),
            '@images': path.resolve(__dirname,'src/assets/images/')
        }
    },
    module:{
        rules:[
            {
                //expresion regular cualquier archivo que comience con m o .js 
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.css|.styl$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator:{
                    filename:'static/images/[hash][ext][query]'
                }
            },
            {
                test:/\.(woff|woff2)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        mimetype:"application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath:"./assets/fonts/",
                        publicPath:"./assets/fonts/",
                        esModule:false,
                    }
                },
                generator:{
                    filename:'assets/fonts/[hash][ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject : true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,"src","assets/images"),
                    to:"assets/images"
                }
            ]
        }),
        new Dotevn()
    ]
}
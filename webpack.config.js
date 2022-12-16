// aquí trabajamos configuraciones que añadiremos a nuestro proyecto, extensiones, entry point

const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')

//cofiguraciones del web pack
module.exports ={
    //este es el punto de entrada
    entry:'./src/index.js',
    //output hacia donde vamos a enviar lo que se preparará
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'main.js',
        // assetModuleFilename:'assets/images/[hash][ext][query]'
    },
    resolve:{
        //qué tipo de extensiones va a identificar webpack e nuestro proyecto
        extensions:['.js']
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
                        name: "[name].[ext]",
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
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,"src","assets/images"),
                    to:"assets/images"
                }
            ]
        }),
    ]
}
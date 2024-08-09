const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require("dotenv-webpack")
const TerserPlugin = require('terser-webpack-plugin')


module.exports ={
    mode: 'production',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[ 
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test:/\.(png|jpg|jpeg|gif|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]'
                    }

                },
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    use:{
                        loader:'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
    },
   plugins:[
    new Dotenv(),
   
    new MiniCssExtractPlugin({
        filename:'styles.css'
    }),
   ],
   optimization: {
    minimize: true, // Enable minimization
    minimizer: [
        new TerserPlugin({
            parallel: true, // Enable parallel processing
        }),
    ],
},
    
    watch:true
}
const path = require("path")
const Dotenv = require("dotenv-webpack")
const TerserPlugin = require('terser-webpack-plugin')


module.exports ={
    mode: 'development',
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[ {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
                },
                {
                    test:/\.(png|jpg|jpeg|gif|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]'
                    }

                }
            ]
    },
   plugins:[
    new Dotenv()
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
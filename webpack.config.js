const path = require("path")
const Dotenv = require('dotenv-webpack');

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
    plugins: [
        new Dotenv()
    ],
    
    watch:true
}
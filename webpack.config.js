var path = require('path');

const webpack = require('webpack');

module.exports = {
    entry : {
        app : './src/client.js'
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname,'public')
    },
    watch : true,
    // module:{
    //     loaders = [
    //         {
    //             test:/\.js$/,
    //             exclude : /node_modules/,
    //             loader : 'babel-loader',
    //             query : {
    //                 presets : ['react','es2015','stage-1']
    //             }
    //         }
    //     ]
    // }
    module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query:{
                    presets:['react', 'es2015','stage-0','stage-1'],
                    plugins:[ 'transform-object-rest-spread','transform-es2015-destructuring' ]
				}
			}
		]
	}   

}
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
   devtool:'eval-soure-map',
   entry: __dirname +"/app/main.js",
   output:{
       path:__dirname +"/build",
       filename:"bundle.js"
   },

   devServer:{
      contentBase:"./public", 
      historyApiFallback: true, 
      inline:true ,
       hot:true
   },
   module:{
       rules:[
           {
        	   test: /(\.jsx|\.js)$/,
               use: {
                    loader: "babel-loader",
	                options: {
                        presets: [
                          "env", "react"
                        ]
                    }
 	           },
	           exclude: /node_modules/
           },
           {
                test: /\.css$/,
 			    use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
			        	options: {
                                  modules: true,
                                  localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
             ]
           }
       ]
   },
    plugins:[
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin()

    ],

}
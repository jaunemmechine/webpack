#  Webpack简介
   WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

# webpack配置文件
根目录下新建一个名为webpack.config.js的文件
const webpack = require('webpack');<br/>
const HtmlWebpackPlugin = require('html-webpack-plugin');<br/>
const ExtractTextPlugin = require('extract-text-webpack-plugin');<br/>

module.exports = {<br/>
        entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件<br/>
        output: {<br/>
            path: __dirname + "/build",//打包后的文件存放的地方<br/>
            filename: "bundle-[hash].js"//打包后输出文件的文件名(缓存)<br/>
        },<br/>
        devtool: 'none',//打包速度，调试更容易<br/>
        devServer: //构建本地服务器{<br/>
            contentBase: "./public", //本地服务器所加载的页面所在的目录<br/>
            historyApiFallback: true, //不跳转<br/>
            inline: true,//实时刷新<br/>
            hot: true//热加载<br/>
        },<br/>
        module: {<br/>
            rules: [{<br/>
                    test: /(\.jsx|\.js)$/,<br/>
                    use: {<br/>
                        loader: "babel-loader"<br/>
                    },<br/>
                    exclude: /node_modules/<br/>
                }, {<br/>
                    test: /\.css$/,<br/>
                    use: ExtractTextPlugin.extract({<br/>
                        fallback: "style-loader",<br/>
                        use: [{<br/>
                            loader: "css-loader",<br/>
                            options: {<br/>
                                modules: true,<br/>
                                localIdentName: '[name]__[local]--[hash:base64:5]'<br/>
                            }
                        }, {<br/>
                            loader: "postcss-loader"<br/>
                        }],<br/>
                    })<br/>
                }<br/>
            }<br/>
        ]<br/>
    },<br/>
    plugins: [<br/>
        new webpack.BannerPlugin('版权所有，翻版必究'),<br/>
        new HtmlWebpackPlugin({<br/>
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数<br/>
        }),<br/>
        new webpack.HotModuleReplacementPlugin(),//热加载插件<br/>
        new webpack.optimize.OccurrenceOrderPlugin(),//:为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID<br/>
        new webpack.optimize.UglifyJsPlugin(),//压缩JS代码<br/>
        new ExtractTextPlugin("style.css")//分离CSS和JS文件<br/>
    ]<br/>
}; 
# Webpack的使用
  全局安装npm install -g webpack<br/>
  安装到你的项目目录npm install --save-dev webpack<br/>
  使用npm init命令可以自动创建这个package.json文件<br/>
  webpack {入口文件的路径} {打包文件的存放路径},例如：webpack main.js  build.js
# webpack构建本地服务器
  npm install --save-dev webpack-dev-server
# Loaders
  Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。所以如果我们需要在应用中添加 css 文件，就需要使用到 css-loader 和 style-loader，他们做两件不同的事情，css-loader 会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。
  使用以下命令来安装 css-loader 和 style-loader(全局安装需要参数 -g)。<br/>
  ```cnpm install css-loader style-loader ```
# Babel
  Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；
#Babel的安装与配置
  Babel其实是几个模块化的包，其核心功能位于称为babel-core的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的babel-env-preset包和解析JSX的babel-preset-react包）。<br/>
  一次性安装这些依赖包
  ```npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react ```
# CSS module
  只需要在CSS loader中进行简单配置即可，然后就可以直接把CSS的类名传递到组件的代码中，这样做有效避免了全局污染
   ```{
        loader: "css-loader",
        options: {
            modules: true, // 指定启用css modules
            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
    } ```
# CSS预处理器
  ``` npm install --save-dev postcss-loader autoprefixer ```
# 插件（Plugins）
  要使用某个插件，我们需要通过npm安装它，然后要做的就是在webpack配置中的plugins关键字部分添加该插件的一个实例（plugins是一个数组），添加了一个给打包后代码添加版权声明的插件。
    ``` plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究')
    ] ```<br/>
 下面给大家推荐几个常用的插件<br/>

  HtmlWebpackPlugin:这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。
   ```npm install --save-dev html-webpack-plugin```<br/>

  Hot Module Replacement:是webpack里很有用的一个插件，它允许你在修改组件代码后，自动刷新实时预览修改后的效果
  
  Babel有一个叫做react-transform-hrm的插件
  ```npm install --save-dev babel-plugin-react-transform react-transform-hmr```
# 优化插件
   OccurenceOrderPlugin，UglifyJsPlugin，ExtractTextPlugin,OccurenceOrder 和 UglifyJS plugins 都是内置插件，你需要做的只是安装其它非内置插件<br/>
   ```npm install --save-dev extract-text-webpack-plugin```
# 缓存
  webpack可以把一个哈希值添加到打包的文件名中,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前
# 去除build文件中的残余文件
  插件clean-webpack-plugin。
   ```cnpm install clean-webpack-plugin --save-dev```
# pack.json
 如果是window电脑，build需要配置为"build": "set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress".

参考链接：https://www.jianshu.com/p/42e11515c10f

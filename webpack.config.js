/*
$ webpack --display-error-details
即可，后面的参数“--display-error-details”是推荐加上的，方便出错时能查阅更详尽的信息（比如 webpack 寻找模块的过程），从而更好定位到问题。
其他主要的参数有：
$ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包

$ webpack --watch   //监听变动并自动打包

$ webpack -p    //压缩混淆脚本，这个非常非常重要！

$ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
其中的 -p 是很重要的参数，曾经一个未压缩的 700kb 的文件，压缩后直接降到 180kb（主要是样式这块一句就独占一行脚本，导致未压缩脚本变得很大）。
*/
var webpack = require('webpack');
var path = require('path');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// 有时候可能希望项目的样式能不要被打包到脚本中，而是独立出来作为.css，然后在页面中以<link>标签引入。这时候我们需要 extract-text-webpack-plugin 来帮忙
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //插件项 这里我们使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。
    plugins: [new ExtractTextPlugin("[name].css")],
    //页面入口文件配置
    entry: {
        robotList : [
            'webpack-dev-server/client?http://127.0.0.1:3333',
            'webpack/hot/only-dev-server',
            './js/index.js'
        ],
    },
    //入口文件输出配置 （即入口文件最终要生成什么名字的文件、存放到哪里）
    // path: 打包文件存放的绝对路径
    // publicPath: 网站运行时的访问路径
    // filename: 打包后的文件名
    output: {
        path: __dirname + 'http://127.0.0.1:3333/js/',
        publicPath: 'http://127.0.0.1:3333/js/',
        filename: 'bundle.js',
    },
    module: {
        //加载器配置 module.loaders是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理
        //"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/ 
        }, { 
            test: /\.jsx?$/, 
            loaders: ['react-hot', 'babel-loader'], 
            exclude: /node_modules/ 
        },{ 
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            test: /\.scss$/, 
            loader: 'style!css!sass?sourceMap'
        },{ 
            test: /\.css$/, 
            loader: 'style-loader!css-loader' 
        },]
    },
    //其它解决方案配置
    resolve: {
         //查找module的话从这里开始查找
        root: '/Library/WebServer/Documents/react/js/components/', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss','.jsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'build/nav.js',//后续直接 require('AppStore') 即可
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
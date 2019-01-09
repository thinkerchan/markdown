var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode:'development',
    mode:'production',
    //插件项
    // plugins: [commonsPlugin],
    //页面入口文件配置
    entry : './src/js/index.js',
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname+'/docs', 'dist'),
        filename: 'index.js'
    },
    module: {
        //加载器配置
        rules: [
            { test: /\.css$/, use: 'style-loader!css-loader' },
            { test: /\.js$/, use: 'jsx-loader?harmony' },
            // { test: /\.less$/, use: 'style-loader!css-loader!less-loader?sourceMap'},
            { test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            { test: /\.(png|jpg)$/, use: 'url-loader?limit=8192'}
        ]
    },
    resolve:{
        extensions: [".js", ".less", ".css"],  //用到文件的扩展名
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                context: path.join(__dirname, './src/css/pageThemes'),
                from: '*',
                to: '../pageThemes',
                force: true
            },
            {
                context: path.join(__dirname, './src/imgs'),
                from: '*',
                to: '../imgs',
                force: true
            },
            {
                context: path.join(__dirname, './src/css/themes'),
                from: '*',
                to: '../themes',
                force: true
            },
            {
                context: path.join(__dirname, './src'),
                from: "index.html",
                to: '../index.html',
                force: true
            },
            {
                context: path.join(__dirname, './src'),
                from: "demo.md",
                to: '../demo.md',
                force: true
            },
            // {
            //     context: path.join(__dirname, './src'),
            //     from: "favicon.ico",
            //     to: '../favicon.ico',
            //     force: true
            // },
            // {
            //     context: path.join(__dirname, './src'),
            //     from: "CNAME",
            //     to: '../CNAME',
            //     toType: 'file',
            //     force: true
            // }
        ])
    ]
};

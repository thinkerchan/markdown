const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：

// 1.webpack's Watch Mode,即: webpack --watch, 缺点是需要手动刷新
// 2.安装webpack-dev-server插件:webpack-dev-server --open(此参数自动打开浏览器)
// 3.webpack-dev-middleware

module.exports = {
  entry: {
    index:'./src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname+'/dist'),
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    //如果目标文件不存在index.html那么就在output path中输出index.html
    // new HtmlWebpackPlugin({
    //   title: '输出管理'
    // }),

    // 删除output path的dits文件夹中旧文件
    // clean-webpack-plugin only accepts an options object.
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
          context: path.join(__dirname, './src/css/pageThemes'),
          from: '*',
          to: './pageThemes',
          force: true
      },
      {
          context: path.join(__dirname, './src/imgs'),
          from: '*',
          to: './imgs',
          force: true
      },
      {
          context: path.join(__dirname, './src/css/themes'),
          from: '*',
          to: './themes',
          force: true
      },
      {
          context: path.join(__dirname, './src'),
          from: "index.html",
          to: './index.html',
          force: true
      },
      {
          context: path.join(__dirname, './src'),
          from: "demo.md",
          to: './demo.md',
          force: true
      },
    ])
  ],
  module: {
    rules: [
      // css-loader,style-loader
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ]
  }
};
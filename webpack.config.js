const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './apps/front-end/index.js',
  output: {
    path: `${path.resolve(__dirname)}/dist`,
    filename: '_bundle.js'
  },
  plugins: [new MiniCssExtractPlugin({
    filename:"output.css",
})],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
}
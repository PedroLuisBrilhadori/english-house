var path = require('path');

module.exports = {
  entry: './apps/front-end/index.js',
  output: {
    path: `${path.resolve(__dirname)}/dist`,
    filename: '_bundle.js'
  }
}
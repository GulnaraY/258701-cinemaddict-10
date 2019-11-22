
const path = require(`path`);
const outputPath = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: outputPath,
  },
  devtool: `source-map`,
  devServer: {
    contentBase: outputPath,
    publicPath: 'http://localhost:8080/',
    compress: true,
    watchContentBase: true
  }
};

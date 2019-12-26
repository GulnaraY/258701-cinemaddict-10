
const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
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
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
};

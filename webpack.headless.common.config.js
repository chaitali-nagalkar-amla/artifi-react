const path = require("path");
module.exports = {
  releaseFolder: "artifi-headless-releases",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-url-loader",
          options: {
            encoding: "base64",
          },
        },
      },
    ],
  },
};

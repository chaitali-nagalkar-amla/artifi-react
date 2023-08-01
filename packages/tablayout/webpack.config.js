const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("../../webpack.headless.common.config");
const packageConfig = require("./package.json");
const bundleFileName = packageConfig.name.split("@chaitali-nagalkar-amla/")[1];
const lerna = require("../../lerna.json");

const config = {
    entry: {
        [bundleFileName]: path.resolve(__dirname, "src/index.tsx"),
    },
};
require('dotenv').config();
const webpack = require('webpack');

module.exports = (env, args) => {
    const versionFolder = lerna.version.match(/(\d+\.)(\d+\.)(\d)/g);
    const outPath = path.join(
        __dirname,
        `../../${commonConfig.releaseFolder}/${bundleFileName}/${versionFolder}/`
    );
    delete commonConfig.releaseFolder;
    config["output"] = {
        path: outPath,
        filename: `Artifi.[name].js`,
        library: ["Artifi", "[name]"],
        libraryTarget: "umd",
    };
    config["plugins"] = [
        new webpack.DefinePlugin({
            'process.env': {
                REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV)
            },
        }),
    ];
    return merge(commonConfig, config);
};

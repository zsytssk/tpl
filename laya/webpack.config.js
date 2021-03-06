"use strict";
const path = require("path");
const webpack = require("webpack");
const findParam = require("./script/findEnv");

const ENV = JSON.stringify(findParam("ENV"));
const common_config = {
  entry: ["./test/test.ts", "./src/main.ts"],
  output: {
    filename: "js/bundle.js",
    path: path.join(__dirname, "bin"),
  },
  resolve: {
    modules: [
      path.resolve("./node_modules"),
      path.resolve("./library"),
      path.resolve("./libs"),
      path.resolve("./src"),
    ],
    alias: {
      "@app": path.resolve(__dirname, "./src"),
      "@test": path.resolve(__dirname, "./test"),
      "@laya": path.resolve(__dirname, "./libs"),
      "@library": path.resolve(__dirname, "./library"),
    },
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /(\.ts|\.js)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /(\.glsl|.fs|.vs)$/,
        loader: "webpack-glsl-loader",
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({ ENV })],
};

const dev_config = {
  devtool: "eval-source-map",
  stats: {
    warnings: false,
  },
  watch: ENV === "DEV" ? true : false,
  devServer: {
    clientLogLevel: "silent",
    host: "0.0.0.0",
    contentBase: path.join(__dirname, "bin"),
    disableHostCheck: true,
  },
};

const prod_config = {
  entry: ["./src/main.ts"],
};

module.exports = (env, argv) => {
  if (ENV === "TEST") {
    const dist_folder = path.join(__dirname, "build");
    common_config.output.path = dist_folder;
    dev_config.devServer.contentBase = dist_folder;
  }
  if (argv.mode === "development") {
    const result = { ...common_config, ...dev_config };
    return result;
  } else {
    common_config.module.rules[0].use.unshift({ loader: "babel-loader" });
    const result = { ...common_config, ...prod_config };
    return result;
  }
};

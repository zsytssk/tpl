import { Configuration } from "webpack";
import { fileLoader, tsLoaderFn, cssLoaderFn } from "./loader";
import { resolve } from "./other";
import { pluginsFn } from "./plugin";
import { paths } from "./paths";
import { devServerConfigFn } from "./devserver";

export default function (_, argv: Configuration) {
  const mode = argv.mode;
  return {
    entry: paths.appIndexJs,
    output: {
      path: paths.appBuild,
      filename: "[name].[hash].js",
      publicPath: "/",
    },
    mode,
    target: mode === "production" ? ["web", "es5"] : ["web"],
    module: {
      rules: [
        { ...tsLoaderFn(mode) },
        { ...cssLoaderFn(mode) },
        { ...fileLoader },
      ],
    },
    resolve,
    devServer: devServerConfigFn(mode),
    plugins: pluginsFn(mode),
  };
}

import { Configuration } from "webpack";
import { fileLoader, tsLoaderFn } from "./loader";
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
    },
    mode,
    module: {
      rules: [{ ...tsLoaderFn(mode) }, { ...fileLoader }],
    },
    resolve,
    devServer: devServerConfigFn(mode),
    plugins: pluginsFn(mode),
  };
}

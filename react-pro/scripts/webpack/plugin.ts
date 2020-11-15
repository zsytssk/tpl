import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  favicon: "./public/favicon.ico",
  template: "./public/index.html",
  inject: true,
});

export const pluginsFn = (mode: Configuration["mode"]) => {
  let plugins = [htmlWebpackPlugin, new CleanWebpackPlugin()];

  if (process.env.analyze) {
    plugins = [...plugins, new BundleAnalyzerPlugin()];
  }

  return plugins;
};

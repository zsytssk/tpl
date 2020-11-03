import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  favicon: "./public/favicon.ico",
  template: "./public/index.html",
});

export const pluginsFn = (mode: Configuration["mode"]) => {
  return [htmlWebpackPlugin, new CleanWebpackPlugin()];
};

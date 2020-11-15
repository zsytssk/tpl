import { Configuration } from "webpack";
import { paths } from "./paths";

export const resolve = {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  alias: {
    "@app": paths.appSrc,
  },
};

export function genDevtool(mode: Configuration["mode"]) {
  if (mode === "development") {
    return "eval-source-map";
  }
  return false;
}

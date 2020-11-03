import { Configuration } from "webpack";

export const fileLoader = {
  test: /\.(png|jpg|svg|gif)$/,
  exclude: /node_modules/,
  use: ["file-loader"],
};

export const tsLoaderFn = (mode: Configuration["mode"]) => {
  const default_config = {
    test: /(\.ts|\.tsx|\.jsx|\.js)$/,
    exclude: [/\bnode_modules\b/],
    use: [
      {
        loader: "thread-loader",
      },
      {
        loader: "ts-loader",
        options: {
          happyPackMode: true,
        },
      },
    ],
  };

  if (mode === "production") {
    default_config.use.splice(1, 0, {
      loader: "babel-loader",
    });
  }
  return default_config;
};

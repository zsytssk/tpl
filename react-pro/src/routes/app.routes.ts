import { RouteConfig } from "react-router-config";

export const routes: RouteConfig[] = [
  {
    path: ["/", "/home"],
    component: require("@app/pages/home").default,
    exact: true,
    routes: [],
  },
  {
    path: "/loading",
    component: require("@app/pages/loading").default,
    exact: true,
    routes: [],
  },
];

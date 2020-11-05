import React from "react";
import { RouteConfig } from "react-router-config";

export const routes: RouteConfig[] = [
  {
    path: ["/:lang", "/:lang/"],
    component: require("@app/containers/Root").default,
    routes: [
      {
        path: ["/", "/home"],
        component: React.lazy(() => import("@app/pages/home")),
        exact: true,
        routes: [],
      },
      {
        path: "/loading",
        component: React.lazy(() => import("@app/pages/loading")),
        exact: true,
        routes: [],
      },
    ],
  },
];

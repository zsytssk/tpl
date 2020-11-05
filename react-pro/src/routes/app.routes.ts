import React from "react";
import { RouteConfig } from "react-router-config";

export const routes: RouteConfig[] = [
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
];

import { getLang } from "@app/utils/i18nUtils";
import React from "react";
import { RouteConfig } from "react-router-config";
import { Redirect } from "react-router-dom";

export const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    render: () => {
      return <Redirect to={`${getLang()}/${window.location.search}`} />;
    },
  },
  {
    path: ["/:lang/", "/:lang"],
    component: require("@app/pages/root").default,
    routes: [
      {
        path: ["/:lang/", "/:lang"],
        component: React.lazy(() => import("@app/pages/home")),
        exact: true,
      },
      {
        path: "/loading",
        component: React.lazy(() => import("@app/pages/loading")),
        exact: true,
      },
    ],
  },
];

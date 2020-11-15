import { getLang } from "@app/utils/i18nUtils";
import React from "react";
import { RouteConfig } from "react-router-config";
import { Redirect } from "react-router-dom";

const { search, hash } = window.location;
export const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    render: () => {
      return <Redirect to={`${getLang()}${search}${hash}`} />;
    },
  },
  {
    path: ["/:lang", "/:lang/"],
    component: require("@app/pages/root").default,
    routes: [
      {
        path: ["/:lang", "/:lang/"],
        exact: true,
        component: React.lazy(() => import("@app/pages/home")),
      },
      {
        path: "/:lang/loading",
        component: React.lazy(() => import("@app/pages/loading")),
        exact: true,
      },
    ],
  },
];

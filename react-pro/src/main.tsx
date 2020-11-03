import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import configureStore from "@app/redux/store";
import { routes } from "@app/routes/app.routes";

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Switch>{renderRoutes(routes)}</Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

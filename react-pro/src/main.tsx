import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import configureStore from '@app/redux/store';
import { routes } from '@app/routes/app.routes';
import Loading from './pages/loading';

ReactDOM.render(
    <Provider store={configureStore()}>
        <React.StrictMode>
            <React.Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <Switch>{renderRoutes(routes)}</Switch>
                </BrowserRouter>
            </React.Suspense>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
);

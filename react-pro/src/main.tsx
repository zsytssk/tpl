import { StrictMode, Suspense } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import configureStore from '@app/redux/store';
import { routes } from '@app/routes/app.routes';
import Loading from './pages/loading';
import { ThemeProvider } from './pages/shared/theme';

ReactDOM.render(
    <Provider store={configureStore()}>
        <StrictMode>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    {/* <JSSPluginProvider> */}
                    <ThemeProvider>
                        <Switch>{renderRoutes(routes)}</Switch>
                    </ThemeProvider>
                    {/* </JSSPluginProvider> */}
                </BrowserRouter>
            </Suspense>
        </StrictMode>
    </Provider>,
    document.getElementById('root'),
);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { routes } from './routes';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, IApplicationState } from './app/store/index';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

// Create browser history to use in the Redux store / Get the application-wide store instance, prepopulating with state from the server where available.
const history = createBrowserHistory();
const initialState = (window as any).initialReduxState as IApplicationState;
const store = configureStore(history, initialState);

// This function starts up the React app when it runs in a browser. It sets up the routing configuration and injects the app into a DOM element.
const renderApp = (): void => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history} children={routes} />
			</Provider>
		</AppContainer>,
		document.getElementById('root'),
	);
};

// Execute function above to patch app to DOM
renderApp();

// Allow Hot Module Replacement
if (module.hot) {
	module.hot.accept('./routes', () => {
		renderApp();
	});
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

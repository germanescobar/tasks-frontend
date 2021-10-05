import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import store from './store';

import './index.css';

const Root = (
  <React.StrictMode>
    <Provider store={store()}>
      <Auth0Provider
        domain="khriztianmoreno.auth0.com"
        clientId="9XKzaGgxJeCtxCrXEdk6Y9sYIgflpv7a"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(Root, document.getElementById('root'));

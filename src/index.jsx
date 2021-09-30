import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import App from './App';
import store from './store';
import MESSAGES from './messages';
import { flattenMessages } from './utils';

import './index.css';

const locale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US';

const Root = (
  <React.StrictMode>
    <IntlProvider locale={locale} messages={flattenMessages(MESSAGES[locale])}>
      <Provider store={store()}>
        <App />
      </Provider>
    </IntlProvider>
  </React.StrictMode>
);

ReactDOM.render(Root, document.getElementById('root'));

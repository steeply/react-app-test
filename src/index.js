import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import Routes from './routes';

import 'sanitize.css/sanitize.css';
import 'react-table/react-table.css';
import 'font-awesome/css/font-awesome.css';
import 'react-notifications/lib/notifications.css';
import './index.css';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root')
);

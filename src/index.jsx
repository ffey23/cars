import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import './index.css';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { modelApi, makeApi } from './common/api';

import 'mobx-react/batchingForReactDom';
import {
  ModelStore,
  MakeStore,
  InterfaceStore,
  MakeEditStore,
  ModelEditStore,
  ModelListStore,
  MakeListStore,
} from './stores';

const { createBrowserHistory } = require('history');

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const interfaceStore = new InterfaceStore(routingStore);
const makeStore = new MakeStore(makeApi, interfaceStore);
const modelStore = new ModelStore(modelApi, makeStore, interfaceStore);
const modelListStore = new ModelListStore(modelStore, interfaceStore);
const makeListStore = new MakeListStore(makeStore, interfaceStore);
const makeEditStore = new MakeEditStore(makeStore, interfaceStore);
const modelEditStore = new ModelEditStore(modelStore, interfaceStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      modelStore={modelStore}
      makeStore={makeStore}
      interfaceStore={interfaceStore}
      modelListStore={modelListStore}
      makeEditStore={makeEditStore}
      modelEditStore={modelEditStore}
      makeListStore={makeListStore}
      routing={routingStore}
    >
      {' '}
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ModelStore from './stores/model/ModelStore';
import MakeStore from './stores/make/MakeStore';
import modelApi from './common/api/modelApi';
import makeApi from './common/api/makeApi';
import 'mobx-react/batchingForReactDom';
import InterfaceStore from './stores/InterfaceStore';

const interfaceStore = new InterfaceStore();
const makeStore = new MakeStore(makeApi, interfaceStore);
const modelStore = new ModelStore(modelApi, makeStore, interfaceStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider modelStore={modelStore} makeStore={makeStore} interfaceStore={interfaceStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

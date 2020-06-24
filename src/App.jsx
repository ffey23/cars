/* eslint-disable */
import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router';
import {observer, inject} from 'mobx-react';
import { ModelList, ModelEdit, MakeList, MakeEdit, Error404} from './pages';
import { Navigation, ToastComponent, Loader } from './components';

function App({routing}) {
  return (
    <div className="App">
      <Router history={routing.history}>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Redirect to="model-list" />
          </Route>
          <Route exact path="/model-list">
            <ModelList />
          </Route>
          <Route path="/model-edit/:id">
            <ModelEdit />
          </Route>
          <Route exact path="/make-list">
            <MakeList />
          </Route>
          <Route path="/make-edit/:id">
            <MakeEdit />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Router>
      <ToastComponent />
      <Loader />
    </div>
  )   
}

export default inject('routing')(observer(App));

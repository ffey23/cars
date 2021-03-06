/* eslint-disable */
import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router';
import {observer, inject} from 'mobx-react';
import ModelList from './pages/ModelList/ModelList';
import ModelEdit from './pages/ModelEdit/ModelEdit';
import MakeList from './pages/MakeList/MakeList';
import MakeEdit from './pages/MakeEdit/MakeEdit';
import Error404 from './pages/Error404';
import Navigation from './components/Navigation';
import ToastComponent from './components/ToastComponent';
import Loader from './components/Loader';

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

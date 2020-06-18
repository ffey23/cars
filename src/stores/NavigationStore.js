import { observable, action, decorate } from 'mobx';
// import createBrowserHistory from 'history/createBrowserHistory';
const { createBrowserHistory } = require('history');

class NavigationStore {
  location = null;

  history = createBrowserHistory();

  push = (location) => {
    this.history.push(location);
  }

 replace = (location) => {
   this.history.replace(location);
 }

 go = (n) => {
   this.history.go(n);
 }

 goBack = () => {
   this.history.goBack();
 }

 goForward = () => {
   this.history.goForward();
 }
}

decorate(NavigationStore, {
  location: observable,
  push: action,
  replace: action,
  go: action,
  goBack: action,
  goForward: action,

});

const navigationStore = new NavigationStore();

export default navigationStore;

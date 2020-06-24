import {
  observable, decorate, action, runInAction,
} from 'mobx';
import { v4 } from 'uuid';

class Model {
    id = null

    store = null

    /**
    * Observables
    */

    name = ''

    // refferences to object from another stores
    make = null

    constructor(store, id = v4()) {
      this.store = store;
      this.id = id;
    }

    updateOnServer = (json) => this.store.api.updateModel({ ...json, id: this.id })
      .then((data) => {
        runInAction(() => {
          this.updateFromJson(data);
        });
      })

    updateFromJson(json) {
      this.name = json.name;
      this.make = this.store.makeStore.resolveMake(json.makeId);
    }
}

decorate(Model, {
  name: observable,
  make: observable,
  updateFromJson: action,
});

export default Model;

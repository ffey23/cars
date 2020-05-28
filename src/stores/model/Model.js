import {
  observable, decorate, action, computed,
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

    updateFromJson(json) {
      this.name = json.name;
      this.make = this.store.makeStore.resolveMake(json.makeId);
    }

    get asJson() {
      return {
        id: this.id,
        name: this.name,
        makeId: this.make ? this.make.id : null,
      };
    }
}

decorate(Model, {
  name: observable,
  make: observable,
  updateFromJson: action,
  asJson: computed,
});

export default Model;

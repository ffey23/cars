import {
  observable, decorate, action, runInAction,
} from 'mobx';
import { v4 } from 'uuid';

class Make {
    id = null

    store = null

    name = ''

    constructor(store, id = v4()) {
      this.store = store;
      this.id = id;
    }

    updateOnServer = (json) => this.store.api.updateMake({ ...json, id: this.id })
      .then((data) => {
        runInAction(() => {
          this.updateFromJson(data);
        });
      })

    updateFromJson(json) {
      this.name = json.name;
    }
}

decorate(Make, {
  name: observable,
  updateFromJson: action,
});

export default Make;

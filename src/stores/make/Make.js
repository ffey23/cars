import { observable, decorate, action } from 'mobx';
import { v4 } from 'uuid';

class Make {
    id = null

    store = null

    name = ''

    // refferences to object from another stores

    constructor(store, id = v4()) {
      this.store = store;
      this.id = id;
    }

    updateFromJson(json) {
      this.name = json.name;
    }
}

decorate(Make, {
  name: observable,
  updateFromJson: action,
});

export default Make;

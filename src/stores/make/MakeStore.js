import { observable, decorate, action } from 'mobx';
import Make from './Make';

class MakeStore {
    api;

    makes = [];

    isLoading = false;

    constructor(api) {
      this.api = api;
    }

    loadMakes() {
      // Load just if not already loaded
      if (!this.makes.length) {
        this.isLoading = true;
        return this.api.fetchMakes().then((fetchedMakes) => {
          fetchedMakes.forEach((json) => this.updateMakeFromServer(json));
          this.isLoading = false;
          return Promise.resolve(this.makes);
        });
      }
      return Promise.resolve(this.makes);
    }

    updateMakeFromServer(json) {
      let make = this.makes.find((m) => m.id === json.id);
      if (!make) {
        make = new Make(this, json.id);
        this.makes.push(make);
      }
      make.updateFromJson(json);
    }

    resolveMake(id) {
      return this.makes.find((m) => m.id === id);
    }
}

decorate(MakeStore, {
  makes: observable,
  isLoading: observable,
  updateMakeFromServer: action,
});

export default MakeStore;

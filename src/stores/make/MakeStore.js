import {
  observable, decorate, action, runInAction,
} from 'mobx';
import Make from './Make';
import Pagination from '../../common/utils/Pagination/Pagination';

class MakeStore {
    api;

    interfaceStore;

    makes = [];


    pagination;

    constructor(api, interfaceStore) {
      this.api = api;
      this.interfaceStore = interfaceStore;
      this.pagination = new Pagination(this.makes);
    }

    loadMakes() {
      return this.api.fetchMakes().then((fetchedMakes) => {
        runInAction(() => {
          fetchedMakes.forEach((json) => this.updateMakeFromServer(json));
          return Promise.resolve(this.makes);
        });
      });
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
  pagination: observable,
});

export default MakeStore;

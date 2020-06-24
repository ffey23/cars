import {
  observable, decorate, action, runInAction,
} from 'mobx';
import Make from './Make';
import { Pagination } from '../../common/utils';

class MakeStore {
    api;

    interfaceStore;

    makes = [];


    pagination;

    /**
     * none - before any fetching
     * pending - fetching request sent
     * success - data was fetched
     */
    loadingDataStatus = 'none';

    constructor(api, interfaceStore) {
      this.api = api;
      this.interfaceStore = interfaceStore;
      this.pagination = new Pagination(this.makes);
    }

    loadMakes() {
      this.setLoadingDataStatus('pending');
      return this.api.fetchMakes().then((fetchedMakes) => {
        runInAction(() => {
          this.setLoadingDataStatus('success');
          fetchedMakes.forEach((json) => this.updateMakeFromServer(json));
          return Promise.resolve(this.makes);
        });
      }).catch((error) => {
        this.setLoadingDataStatus('none');
        throw error;
      });
    }

    async addMake(json) {
      const response = await this.api.addMake(json);
      this.updateMakeFromServer(response);
      return response;
    }

    setLoadingDataStatus = (status) => {
      this.loadingDataStatus = status;
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
  loadingDataStatus: observable,
  setLoadingDataStatus: action,
  addMake: action,
});

export default MakeStore;

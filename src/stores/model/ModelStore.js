import {
  observable, decorate, action, runInAction,
} from 'mobx';
import Model from './Model';
import Pagination from '../../common/utils/Pagination/Pagination';

class ModelStore {
    makeStore;

    interfaceStore;

    api;

    models = [];

    pagination;

    /**
     * none - before any fetching
     * pending - fetching request sent
     * success - data was fetched
     */
    loadingDataStatus = 'none';

    constructor(api, makeStore, interfaceStore) {
      this.makeStore = makeStore;
      this.interfaceStore = interfaceStore;
      this.api = api;
      this.pagination = new Pagination(this.models);
    }

    // When loading models we also load makes
    loadModels() {
      if (!this.makeStore.makes.length) {
        this.setLoadingDataStatus('pending', true);
        return Promise.all([this.api.fetchModels(), this.makeStore.api.fetchMakes()])
          .then(([fetchedModels, fetchedMakes]) => {
            runInAction(() => {
              this.setLoadingDataStatus('success', true);
              fetchedMakes.forEach((json) => this.makeStore.updateMakeFromServer(json));
              fetchedModels.forEach((json) => this.updateModelFromServer(json));
            });
          }).catch((error) => {
            this.setLoadingDataStatus('none', true);
            throw error;
          });
      }
      this.setLoadingDataStatus('pending');
      return this.api.fetchModels().then((fetchedModels) => {
        runInAction(() => {
          this.setLoadingDataStatus('success');
          fetchedModels.forEach((json) => this.updateModelFromServer(json));
        });
      }).catch((error) => {
        this.setLoadingDataStatus('none');
        throw error;
      });
    }

    async addModel(json) {
      const response = await this.api.addModel(json);
      this.updateModelFromServer(response);
      return response;
    }

    setLoadingDataStatus = (status, includeMake) => {
      this.loadingDataStatus = status;
      if (includeMake) this.makeStore.loadingDataStatus = status;
    }

    updateModelFromServer(json) {
      let model = this.models.find((m) => m.id === json.id);
      if (!model) {
        model = new Model(this, json.id);
        this.models.push(model);
      }
      model.updateFromJson(json);
    }
}

decorate(ModelStore, {
  models: observable,
  isLoading: observable,
  updateModelFromServer: action,
  pagination: observable,
  loadingDataStatus: observable,
  setLoadingDataStatus: action,
  addModel: action,
});

export default ModelStore;

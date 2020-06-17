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

    selectedModel = null;

    pagination;

    /**
     * none - before any fetching
     * pending - fetching request sent
     * success - data was fetched
     * failure - failure happened while fetching data
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
      this.setLoadingDataStatus('pending');
      if (!this.makeStore.makes.length) {
        return Promise.all([this.api.fetchModels(), this.makeStore.loadMakes()])
          .then(([fetchedModels]) => {
            runInAction(() => {
              this.setLoadingDataStatus('success');
              fetchedModels.forEach((json) => this.updateModelFromServer(json));
            });
          }).catch((error) => {
            this.setLoadingDataStatus('none');
            throw error;
          });
      }
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

    setLoadingDataStatus = (status) => {
      this.loadingDataStatus = status;
    }

    selectModel = (model) => {
      this.selectedModel = model;
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
  modelFilters: observable,
  isLoading: observable,
  selectedModel: observable,
  updateModelFromServer: action,
  selectModel: action,
  pagination: observable,
  loadingDataStatus: observable,
  setLoadingDataStatus: action,
});

export default ModelStore;

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

    constructor(api, makeStore, interfaceStore) {
      this.makeStore = makeStore;
      this.interfaceStore = interfaceStore;
      this.api = api;
      this.pagination = new Pagination(this.models);
    }

    // When loading models we also load makes
    loadModels() {
      if (!this.makeStore.makes.length) {
        return Promise.all([this.api.fetchModels(), this.makeStore.loadMakes()])
          .then(([fetchedModels]) => {
            runInAction(() => {
              fetchedModels.forEach((json) => this.updateModelFromServer(json));
            });
          });
      }
      return this.api.fetchModels().then((fetchedModels) => {
        runInAction(() => {
          fetchedModels.forEach((json) => this.updateModelFromServer(json));
        });
      });
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
});

export default ModelStore;

import {
  observable, decorate, action,
} from 'mobx';
import Model from './Model';
import Pagination from '../../common/utils/Pagination';

class ModelStore {
    makeStore;

    api;

    models = [];

    selectedModel = null;

    isLoading = false;

    pagination;

    constructor(api, makeStore) {
      this.makeStore = makeStore;
      this.api = api;
      this.pagination = new Pagination(this.models);
      this.loadModels();
    }

    loadModels() {
      this.isLoading = true;

      // We also need makes information for displaying models
      Promise.all([this.api.fetchModels(), this.makeStore.loadMakes()])
        .then(([fetchedModels]) => {
          fetchedModels.forEach((json) => this.updateModelFromServer(json));
          this.isLoading = false;
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

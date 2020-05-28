import {
  observable, decorate, action, computed,
} from 'mobx';
import viewList from '../utils/viewList';
import filterList from '../utils/filterList';
import Model from './Model';
import Pagination from '../../common/Pagination';

class ModelStore {
    makeStore;

    transportLayer;

    models = [];

    isLoading = false;

    pagination;

    constructor(transportLayer, makeStore) {
      this.makeStore = makeStore;
      this.transportLayer = transportLayer;
      this.pagination = new Pagination();
      // this.transportLayer.onReceiveModelUpdate((updatedModel) =>
      //  this.updateModelFromServer(updatedModel));
      this.loadModels();
    }

    loadModels() {
      this.isLoading = true;

      Promise.all([this.transportLayer.fetchModels(), this.makeStore.loadMakes()])
        .then(([fetchedModels]) => {
          fetchedModels.forEach((json) => this.updateModelFromServer(json));
          this.isLoading = false;
        });
    }

    updateModelFromServer(json) {
      let model = this.models.find((m) => m.id === json.id);
      if (!model) {
        model = new Model(this, json.id);
        this.models.push(model);
      }
      model.updateFromJson(json);
    }

    // creates list view records
    get modelsList() {
      const { models, pagination } = this;
      return viewList(models, pagination);
    }

    // Filtered records count needed for total pages number
    get modelsListCount() {
      return filterList(
        this.models,
        this.pagination.filters,
      ).length;
    }

    get previousPage() {
      const { currentPage } = this.pagination;
      return currentPage === 1 ? null : currentPage - 1;
    }

    get nextPage() {
      const { modelsListCount } = this;
      const { currentPage, perPage } = this.pagination;
      return (currentPage * perPage < modelsListCount) ? currentPage + 1 : null;
    }
}

decorate(ModelStore, {
  models: observable,
  modelFilters: observable,
  isLoading: observable,
  updateModelFromServer: action,
  pagination: observable,
  modelsList: computed,
  modelsListCount: computed,
  previousPage: computed,
  nextPage: computed,
});

export default ModelStore;

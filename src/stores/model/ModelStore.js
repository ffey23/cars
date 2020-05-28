import { observable, decorate, action } from 'mobx';
import Model from './Model';

class ModelStore {
    makeStore;

    transportLayer;

    models = [];

    isLoading = false;

    constructor(transportLayer, makeStore) {
      this.makeStore = makeStore;
      this.transportLayer = transportLayer;
      // this.transportLayer.onReceiveModelUpdate((updatedModel) =>
      //  this.updateModelFromServer(updatedModel));
      this.loadModels();
    }

    loadModels() {
      this.isLoading = true;
      this.transportLayer.fetchModels().then((fetchedModels) => {
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
}

decorate(ModelStore, {
  models: observable,
  isLoading: observable,
  updateModelFromServer: action,
});

export default ModelStore;

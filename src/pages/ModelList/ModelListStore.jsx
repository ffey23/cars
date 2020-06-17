import {
  decorate, computed, reaction, observable, action,
} from 'mobx';

class ModelListStore {
    modelStore;

    tableCells = [{ name: 'Model', propertyName: 'name' }, { name: 'Manufacturer', propertyName: 'make.name' }];

    constructor(modelStore) {
      this.modelStore = modelStore;
      reaction(() => this.modelStore.loadingDataStatus, (status) => {
        if (status === 'pending') this.setWasLoading(true);
      });
    }

    setWasLoading(wasLoading) {
      this.wasLoading = wasLoading;
    }

    wasLoading = false;

    get wasLoadingError() {
      return this.wasLoading && this.modelStore.loadingDataStatus === 'none';
    }

    get loadingStatusMessage() {
      const status = this.modelStore.loadingDataStatus;
      if (status === 'pending') return 'Loading data...';

      if (this.wasLoadingError) { return 'Error while loading data! Try to refresh the page!'; }

      if (status === 'none') return '';

      // this is on success
      return null;
    }
}

decorate(ModelListStore, {
  loadingStatusMessage: computed,
  wasLoading: observable,
  setWasLoading: action,
  wasLoadingError: computed,
});
export default ModelListStore;

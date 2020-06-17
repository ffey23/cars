import {
  decorate, computed, reaction, observable, action,
} from 'mobx';

class MakeListStore {
      makeStore;

      tableCells = [{ name: 'Make', propertyName: 'name' }];

      constructor(makeStore) {
        this.makeStore = makeStore;
        reaction(() => this.makeStore.loadingDataStatus, (status) => {
          if (status === 'pending') this.setWasLoading(true);
        });
      }

      setWasLoading(wasLoading) {
        this.wasLoading = wasLoading;
      }

      wasLoading = false;

      get wasLoadingError() {
        return this.wasLoading && this.makeStore.loadingDataStatus === 'none';
      }

      get loadingStatusMessage() {
        const status = this.makeStore.loadingDataStatus;
        if (status === 'pending') return 'Loading data...';

        if (this.wasLoadingError) { return 'Error while loading data! Try to refresh the page!'; }

        if (status === 'none') return '';

        // this is on success
        return null;
      }
}

decorate(MakeListStore, {
  loadingStatusMessage: computed,
  wasLoading: observable,
  setWasLoading: action,
  wasLoadingError: computed,
});
export default MakeListStore;

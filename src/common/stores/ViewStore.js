import {
  decorate, observable, action, reaction, computed,
} from 'mobx';

/**
 * Parent class of all view stores
 * 1. Exposes business store
 * 2. Exposes interface store
 * 3. Exposes loading status message on page loading
 */
class ViewStore {
      dataStore;

      interfaceStore;

      wasLoading = false;

      isCurrentPage = false;

      constructor(dataStore, interfaceStore, routePathName) {
        this.dataStore = dataStore;
        this.interfaceStore = interfaceStore;
        reaction(() => this.dataStore.loadingDataStatus, (status) => {
          if (status === 'pending') this.setWasLoading(true);
        });
        this.interfaceStore.routing.history.subscribe((location) => {
          if (location.pathname.split('/')[1] === routePathName) {
            this.isCurrentPage = true;
          } else if (this.isCurrentPage) {
            this.isCurrentPage = false;
            this.setWasLoading(false);
          }
        });
      }

      setWasLoading(wasLoading) {
        this.wasLoading = wasLoading;
      }


      get wasLoadingError() {
        return this.wasLoading && this.dataStore.loadingDataStatus === 'none';
      }

      get loadingStatusMessage() {
        const status = this.dataStore.loadingDataStatus;
        if (status === 'pending') return 'Loading data...';

        if (this.wasLoadingError) { return 'Error while loading data! Try to refresh the page!'; }

        if (status === 'none') return '';

        // this is on success
        return null;
      }
}

decorate(ViewStore, {
  loadingStatusMessage: computed,
  wasLoading: observable,
  setWasLoading: action,
  wasLoadingError: computed,
  isCurrentPage: observable,
});
export default ViewStore;

import ViewStore from '../../common/stores/ViewStore';
import loadMakes from '../../common/services/loadMakes';

class MakeListStore extends ViewStore {
  constructor(makeStore, interfaceStore) {
    const routePathName = 'make-list';
    super(makeStore, interfaceStore);
    this.tableCells = [{ name: 'Make', propertyName: 'name' }];
    const unsubscribeRoute = this.interfaceStore.routing.history.subscribe((location) => {
      if (location.pathname.split('/')[1] === routePathName) {
        loadMakes(makeStore).then(() => {
          if (makeStore.loadingDataStatus === 'success') unsubscribeRoute();
        });
      }
    });
  }
}

export default MakeListStore;

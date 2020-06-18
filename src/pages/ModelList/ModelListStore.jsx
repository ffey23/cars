import ViewStore from '../../common/stores/ViewStore';
import loadModels from '../../common/services/loadModels';

class ModelListStore extends ViewStore {
  constructor(modelStore, interfaceStore) {
    const routePathName = 'model-list';
    super(modelStore, interfaceStore, routePathName);
    this.tableCells = [
      { name: 'Model', propertyName: 'name' },
      { name: 'Manufacturer', propertyName: 'make.name' },
    ];
    const unsubscribeRoute = this.interfaceStore.routing.history.subscribe((location) => {
      if (location.pathname.split('/')[1] === routePathName) {
        loadModels(modelStore).then(() => {
          if (modelStore.loadingDataStatus === 'success') unsubscribeRoute();
        });
      }
    });
  }
}

export default ModelListStore;

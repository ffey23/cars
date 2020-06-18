import ViewStore from '../../common/stores/ViewStore';

class ModelListStore extends ViewStore {
  constructor(dataStore) {
    super(dataStore);
    this.tableCells = [{ name: 'Make', propertyName: 'name' }];
  }
}

export default ModelListStore;

import ViewStore from '../../common/stores/ViewStore';

class ModelListStore extends ViewStore {
  constructor(dataStore) {
    super(dataStore);
    this.tableCells = [
      { name: 'Model', propertyName: 'name' },
      { name: 'Manufacturer', propertyName: 'make.name' },
    ];
  }
}

export default ModelListStore;

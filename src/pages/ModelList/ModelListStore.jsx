import {
  decorate, observable, action, runInAction,
} from 'mobx';
import ViewStore from '../../common/stores/ViewStore';
import loadModels from '../../common/services/loadModels';
import modelFormInitalizer from '../../common/utils/FormInitializers/modelFormInitalizer';

class ModelListStore extends ViewStore {
  constructor(modelStore, interfaceStore) {
    const routePathName = 'model-list';
    super(modelStore, interfaceStore, routePathName);
    const unsubscribeRoute = this.interfaceStore.routing.history.subscribe((location) => {
      if (location.pathname.split('/')[1] === routePathName) {
        loadModels(modelStore).then(() => {
          if (modelStore.loadingDataStatus === 'success') unsubscribeRoute();
        });
      }
    });
    this.initForm();
  }

  tableCells = [
    { name: 'Model', propertyName: 'name' },
    { name: 'Manufacturer', propertyName: 'make.name' },
  ];

  form;

  editLinkBase = 'model-edit';

  isAddModalOpened = false;

  addModalContentLabel = 'Add Model'

  initForm() {
    const onSuccess = this.addModel;
    this.form = modelFormInitalizer({ initMakeId: 1, onSuccess });
  }

  toggleAddModal = () => {
    this.isAddModalOpened = !this.isAddModalOpened;
    if (!this.isAddModalOpened) this.initForm();
  }

  addModel = async () => {
    const { dataStore, form, interfaceStore } = this;
    try {
      interfaceStore.toggleLoader('Adding model...');
      const response = await dataStore.addModel({
        name: form.values().name,
        makeId: Number(form.values().makeId),
      });
      runInAction(() => {
        interfaceStore.pushNotification({
          type: 'success',
          message: 'Model added!',
        });
        dataStore.pagination.goToPageWhereIsItem(response.id);
      });
    } catch (error) {
      interfaceStore.pushNotification({
        message: 'Error while updating model!',
      });
    }
    interfaceStore.toggleLoader();
    this.toggleAddModal();
  }
}
decorate(ModelListStore, {
  isAddModalOpened: observable,
  toggleAddModal: action,
  initForm: action,
  addModel: action,
});
export default ModelListStore;

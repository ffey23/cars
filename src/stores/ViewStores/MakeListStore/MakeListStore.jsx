import {
  decorate, observable, action, runInAction,
} from 'mobx';
import ViewStore from '../ViewStore';
import { loadMakes } from '../../../common/services';
import makeFormInitalizer from '../../../common/utils/FormInitializers/makeFormInitalizer';

class MakeListStore extends ViewStore {
  constructor(makeStore, interfaceStore) {
    const routePathName = 'make-list';
    super(makeStore, interfaceStore, routePathName);
    const unsubscribeRoute = this.interfaceStore.routing.history.subscribe((location) => {
      if (location.pathname.split('/')[1] === routePathName) {
        loadMakes(makeStore).then(() => {
          if (makeStore.loadingDataStatus === 'success') unsubscribeRoute();
        });
      }
    });
    this.initForm();
  }

  tableCells = [{ name: 'Make', propertyName: 'name' }];

  editLinkBase = 'make-edit';

  form;

  isAddModalOpened = false;

  addModalContentLabel = 'Add Make'

  initForm() {
    const onSuccess = this.addMake;
    this.form = makeFormInitalizer({ onSuccess });
  }

  toggleAddModal = () => {
    this.isAddModalOpened = !this.isAddModalOpened;
    if (!this.isAddModalOpened) this.initForm();
  }

  addMake = async () => {
    const { dataStore, form, interfaceStore } = this;
    try {
      interfaceStore.toggleLoader('Adding model...');
      const response = await dataStore.addMake(form.values());
      runInAction(() => {
        interfaceStore.pushNotification({
          type: 'success',
          message: 'Model added!',
        });
        dataStore.pagination.goToPageWhereIsItem(response.id);
      });
    } catch (error) {
      interfaceStore.pushNotification({
        message: 'Error while updating make!',
      });
    }
    interfaceStore.toggleLoader();
    this.toggleAddModal();
  }
}

decorate(MakeListStore, {
  isAddModalOpened: observable,
  toggleAddModal: action,
  initForm: action,
  addModel: action,
});

export default MakeListStore;

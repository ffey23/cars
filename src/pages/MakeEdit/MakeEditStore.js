import {
  decorate, observable, action,
} from 'mobx';
import ViewStore from '../../common/stores/ViewStore';
import makeFormInitializer from '../../common/utils/FormInitializers/makeFormInitalizer';

class MakeEditStore extends ViewStore {
    make;

    form;

    // eslint-disable-next-line
    constructor(makeStore, interfaceStore) {
      super(makeStore, interfaceStore);
    }

    initForm = () => {
      const onSuccess = this.updateMake;
      this.form = makeFormInitializer({ initName: this.make.name, onSuccess });
    }

    selectMake = (id) => {
      if (!this.make || this.make.id !== Number(id)) {
        this.make = this.dataStore.makes.find((m) => m.id === Number(id));
        this.setNameInput(this.make.name);
        this.initForm();
      }
    }

    setNameInput = (name) => {
      this.nameInput = name;
    }

    updateMake = () => {
      const { interfaceStore, make, form } = this;
      interfaceStore.toggleLoader('Updating make...');
      make.updateOnServer({
        name: form.values().name,
      }).then(() => {
        interfaceStore.pushNotification({
          type: 'success',
          message: `Make with id ${make.id} updated!`,
        });
        interfaceStore.routing.history.push('/make-list');
      }).catch(() => {
        interfaceStore.pushNotification({
          message: 'Error while updating make!',
        });
      }).finally(() => {
        interfaceStore.toggleLoader();
      });
    }
}

decorate(MakeEditStore, {
  make: observable,
  nameInput: observable,
  selectMake: action,
  setNameInput: action,
  updateMake: action,
});
export default MakeEditStore;

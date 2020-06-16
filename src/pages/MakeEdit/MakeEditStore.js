import { decorate, observable, action } from 'mobx';

class MakeEditStore {
    makeStore;

    interfaceStore;

    constructor(makeStore, interfaceStore) {
      this.makeStore = makeStore;
      this.interfaceStore = interfaceStore;
    }

    make;

    nameInput;

    selectMake = (id) => {
      if (!this.make || this.make.id !== Number(id)) {
        this.make = this.makeStore.makes.find((m) => m.id === Number(id));
        this.setNameInput(this.make.name);
      }
    }

    setNameInput = (name) => {
      this.nameInput = name;
    }

    updateMake(history) {
      const { interfaceStore, make, nameInput } = this;
      interfaceStore.toggleLoader('Updating make...');
      make.updateOnServer({
        name: nameInput,
      }).then(() => {
        interfaceStore.pushNotification({
          type: 'success',
          message: `Make with id ${make.id} updated!`,
        });
        history.push('/make-list');
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

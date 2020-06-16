import { decorate, observable, action } from 'mobx';

class ModelEditStore {
    modelStore;

    interfaceStore;

    constructor(modelStore, interfaceStore) {
      this.modelStore = modelStore;
      this.interfaceStore = interfaceStore;
    }

    model;

    nameInput;

    makeIdInput;

    selectModel = (id) => {
      if (!this.model || this.model.id !== id) {
        this.model = this.modelStore.models.find((m) => m.id === id);
        this.setNameInput(this.model.name);
        this.setMakeIdInput(this.model.make.id);
      }
    }

    setNameInput = (name) => {
      this.nameInput = name;
    }

    setMakeIdInput = (make) => {
      this.makeIdInput = make;
    }

    updateModel = (history) => {
      const {
        interfaceStore, model, nameInput, makeIdInput,
      } = this;
      interfaceStore.toggleLoader('Updating model...');
      model.updateOnServer({
        name: nameInput,
        makeId: Number(makeIdInput),
      }).then(() => {
        interfaceStore.pushNotification({
          type: 'success',
          message: `Model with id ${model.id} updated!`,
        });
        history.push('/model-list');
      }).catch(() => {
        interfaceStore.pushNotification({
          message: 'Error while updating model!',
        });
      }).finally(() => {
        interfaceStore.toggleLoader();
      });
    }
}

decorate(ModelEditStore, {
  model: observable,
  nameInput: observable,
  makeIdInput: observable,
  selectModel: action,
  setNameInput: action,
  selectMakeIdInput: action,
});
export default ModelEditStore;

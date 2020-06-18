import {
  decorate, observable, action,
} from 'mobx';
import ViewStore from '../../common/stores/ViewStore';
import formInitializer from '../../common/utils/formInitializer';

class ModelEditStore extends ViewStore {
    model;

    form;

    // eslint-disable-next-line
    constructor(...params) {
      super(...params);
    }

    initForm = () => {
      const fields = {
        name: {
          label: 'Name',
          placeholder: 'Insert Name',
          rules: 'required|string',
          value: this.model.name,
        },
        makeId: {
          label: 'Make',
          placeholder: 'Select Make',
          value: this.model.make.id,
        },
      };
      const onSuccess = this.updateModel;

      this.form = formInitializer({ fields, onSuccess });
    }

    selectModel = (id) => {
      if (!this.model || this.model.id !== id) {
        this.model = this.dataStore.models.find((m) => m.id === id);
        this.initForm();
      }
    }

    updateModel = () => {
      const {
        interfaceStore, model, form,
      } = this;
      interfaceStore.toggleLoader('Updating model...');
      model.updateOnServer({
        name: form.values().name,
        makeId: Number(form.values().makeId),
      }).then(() => {
        interfaceStore.pushNotification({
          type: 'success',
          message: `Model with id ${model.id} updated!`,
        });
        interfaceStore.routing.history.push('/model-list');
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
  selectModel: action,
  initForm: action,
  updateModel: action,
});
export default ModelEditStore;

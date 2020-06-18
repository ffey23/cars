import { decorate, observable, action } from 'mobx';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

class ModelEditStore {
    modelStore;

    interfaceStore;

    model;

    form;

    constructor(modelStore, interfaceStore) {
      this.modelStore = modelStore;
      this.interfaceStore = interfaceStore;
    }

    initForm = () => {
      const plugins = {
        dvr: dvr(validatorjs),
      };

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

      const hooks = {
        onSuccess: () => {
          this.updateModel();
        },
        onError(form) {
          form.invalidate('There was an error!');
        },
      };

      this.form = new MobxReactForm({ fields }, { plugins, hooks });
    }

    selectModel = (id) => {
      if (!this.model || this.model.id !== id) {
        this.model = this.modelStore.models.find((m) => m.id === id);
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
        interfaceStore.navigationStore.history.push('/model-list');
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

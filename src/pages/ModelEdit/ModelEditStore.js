import {
  decorate, observable, action, reaction, computed,
} from 'mobx';
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
      reaction(() => this.modelStore.loadingDataStatus, (status) => {
        if (status === 'pending') this.setWasLoading(true);
      });
    }

    setWasLoading(wasLoading) {
      this.wasLoading = wasLoading;
    }

    wasLoading = false;

    get wasLoadingError() {
      return this.wasLoading && this.modelStore.loadingDataStatus === 'none';
    }

    get loadingStatusMessage() {
      const status = this.modelStore.loadingDataStatus;
      if (status === 'pending') return 'Loading data...';

      if (this.wasLoadingError) { return 'Error while loading data! Try to refresh the page!'; }

      if (status === 'none') return '';

      // this is on success
      return null;
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
  loadingStatusMessage: computed,
  wasLoading: observable,
  setWasLoading: action,
  wasLoadingError: computed,
});
export default ModelEditStore;

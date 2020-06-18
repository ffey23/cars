import { decorate, observable, action } from 'mobx';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

class MakeEditStore {
    makeStore;

    interfaceStore;

    make;

    form;

    constructor(makeStore, interfaceStore) {
      this.makeStore = makeStore;
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
          value: this.make.name,
        },
      };

      const hooks = {
        onSuccess: () => {
          this.updateMake();
        },
        onError(form) {
          form.invalidate('There was an error!');
        },
      };

      this.form = new MobxReactForm({ fields }, { plugins, hooks });
    }

    selectMake = (id) => {
      if (!this.make || this.make.id !== Number(id)) {
        this.make = this.makeStore.makes.find((m) => m.id === Number(id));
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
        interfaceStore.navigationStore.history.push('/make-list');
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

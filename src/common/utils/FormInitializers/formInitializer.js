import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

export default function formInitializer({ fields = {}, errorMessage = 'There was an error!', onSuccess }) {
  const plugins = {
    dvr: dvr(validatorjs),
  };

  const hooks = {
    onSuccess,
    onError(form) {
      form.invalidate(errorMessage);
    },
  };

  return new MobxReactForm({ fields }, { plugins, hooks });
}

import { formInitializer } from '..';

export default function modelFormInitializer({ initName = '', initMakeId = '', onSuccess }) {
  const fields = {
    name: {
      label: 'Name',
      placeholder: 'Insert Name',
      rules: 'required|string',
      value: initName,
    },
    makeId: {
      label: 'Make',
      placeholder: 'Select Make',
      rules: 'required',
      value: initMakeId,
    },
  };

  return formInitializer({ fields, onSuccess });
}

import { formInitializer } from '..';

export default function makeFormInitializer({ initName = '', onSuccess }) {
  const fields = {
    name: {
      label: 'Name',
      placeholder: 'Insert Name',
      rules: 'required|string',
      value: initName,
    },
  };

  return formInitializer({ fields, onSuccess });
}

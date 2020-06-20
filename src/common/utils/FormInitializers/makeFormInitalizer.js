import formInitializer from './formInitializer';

export default function makeFormInitalizer({ initName = '', onSuccess }) {
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

import React from 'react';
import { oneOfType, instanceOf } from 'prop-types';
import { observer } from 'mobx-react';
import ModelEditStore from '../../pages/ModelEdit/ModelEditStore';
import ModelListStore from '../../pages/ModelList/ModelListStore';

function ModelForm({ store }) {
  const { form } = store;
  return (
    <div className="model-edit">
      <form>
        <label htmlFor={form.$('name').id}>
          {form.$('name').label}
        </label>
        {/* eslint-disable-next-line */}
        <input {...form.$('name').bind()} />
        <p>{form.$('name').error}</p>

        <label htmlFor={form.$('makeId').id}>
          {form.$('makeId').label}
        </label>
        {/* eslint-disable-next-line */}
        <select {...form.$('makeId').bind()}>
          {store.dataStore.makeStore.makes.map(
            (m) => <option value={m.id} key={m.id}>{m.name}</option>,
          )}
        </select>
        <p>{form.$('makeId').error}</p>

        <button type="submit" onClick={form.onSubmit}>Submit</button>

        <p>{form.error}</p>
      </form>
    </div>
  );
}

ModelForm.propTypes = {
  store: oneOfType([
    instanceOf(ModelEditStore),
    instanceOf(ModelListStore),
  ]).isRequired,
};

export default observer(ModelForm);

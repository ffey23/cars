import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import ModelEditStore from './ModelEditStore';
import useLoadModels from '../../common/hooks/useLoadModels';
import useResetForm from '../../common/hooks/useResetForm';

function ModelEdit({ modelEditStore: store }) {
  // Load models if not already loaded
  useLoadModels(store.modelStore);

  // Reset form on leaving page;
  useResetForm(store);

  const { models } = store.modelStore;
  const { id } = useParams();

  // Waiting until models are loaded
  if (!models.length) return null;

  // Select model if not already selected
  store.selectModel(id);
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
          {store.modelStore.makeStore.makes.map(
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

ModelEdit.propTypes = {
  modelEditStore: instanceOf(ModelEditStore).isRequired,
};

export default inject('modelEditStore')(observer(ModelEdit));

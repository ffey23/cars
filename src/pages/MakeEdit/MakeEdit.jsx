import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import useLoadMakes from '../../common/hooks/useLoadMakes';
import MakeEditStore from './MakeEditStore';
import useResetForm from '../../common/hooks/useResetForm';

function MakeEdit({ makeEditStore: store }) {
  // Load makes if not already loaded
  useLoadMakes(store.makeStore);

  // Reset form on leaving page;
  useResetForm(store);

  const { id } = useParams();

  // Waiting until makes are loaded
  if (!store.makeStore.makes.length) return null;

  // Selecting make if not already selected or if id
  store.selectMake(id);
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

        <button type="submit" onClick={form.onSubmit}>Submit</button>

        <p>{form.error}</p>
      </form>
    </div>
  );
}

MakeEdit.propTypes = {
  makeEditStore: instanceOf(MakeEditStore).isRequired,
};

export default inject('makeEditStore')(observer(MakeEdit));

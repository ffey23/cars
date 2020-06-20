import React from 'react';
import { observer } from 'mobx-react';
import { oneOfType, instanceOf } from 'prop-types';
import MakeEditStore from '../pages/MakeEdit/MakeEditStore';
import MakeListStore from '../pages/MakeList/MakeListStore';

function MakeForm({ store }) {
  const { form } = store;
  return (
    <div className="make-edit">
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

MakeForm.propTypes = {
  store: oneOfType([
    instanceOf(MakeEditStore),
    instanceOf(MakeListStore),
  ]).isRequired,
};

export default observer(MakeForm);

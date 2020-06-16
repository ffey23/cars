import React from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import useLoadMakes from '../../common/hooks/useLoadMakes';
import MakeEditStore from './MakeEditStore';

function MakeEdit({ makeEditStore: store }) {
  // Load makes if not already loaded
  useLoadMakes(store.makeStore);
  const { id } = useParams();
  const history = useHistory();

  // Waiting until makes are loaded
  if (!store.makeStore.makes.length) return null;

  // Selecting make if not already selected or if id
  store.selectMake(id);

  return (
    <div className="make-edit">
      <div>
        <label htmlFor="name-input">
          Make name:
          {' '}
          <input
            id="name-input"
            type="text"
            value={store.nameInput}
            onChange={(e) => store.setNameInput(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => store.updateMake(history)}
        >
          Update
        </button>
      </div>
    </div>
  );
}

MakeEdit.propTypes = {
  makeEditStore: instanceOf(MakeEditStore).isRequired,
};

export default inject('makeEditStore')(observer(MakeEdit));

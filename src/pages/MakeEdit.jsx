import React, { useRef } from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import MakeStore from '../stores/make/MakeStore';
import useLoadMakes from '../common/hooks/useLoadMakes';

function updateMake(make, nameInput, history) {
  make.store.interfaceStore.toggleLoader('Updating make...');
  make.updateOnServer({
    name: nameInput.current.value,
  }).then(() => {
    history.push('/make-list');
  }).catch(() => {
    make.store.interfaceStore.pushNotification({
      message: 'Error while updating make!',
    });
  }).finally(() => {
    make.store.interfaceStore.toggleLoader();
  });
}
function MakeEdit({ makeStore }) {
  const { id } = useParams();
  useLoadMakes(makeStore);
  const nameInput = useRef();
  const history = useHistory();

  if (!makeStore.makes.length) return null;
  const make = makeStore.makes.find((m) => m.id === Number(id));
  return (
    <div className="make-edit">
      <div>
        <label htmlFor={nameInput}>
          Make name:
          {' '}
          <input type="text" defaultValue={make.name} ref={nameInput} />
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => updateMake(make, nameInput, history)}
        >
          Update
        </button>
      </div>
    </div>
  );
}

MakeEdit.propTypes = {
  makeStore: instanceOf(MakeStore).isRequired,
};

export default inject('makeStore')(observer(MakeEdit));

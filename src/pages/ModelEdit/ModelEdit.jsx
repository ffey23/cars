import React from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import ModelEditStore from './ModelEditStore';
import useLoadModels from '../../common/hooks/useLoadModels';

function ModelEdit({ modelEditStore: store }) {
  // Load models if not already loaded
  useLoadModels(store.modelStore);

  const { models } = store.modelStore;
  const { id } = useParams();
  const history = useHistory();

  // Waiting until models are loaded
  if (!models.length) return null;

  // Select model if not already selected
  store.selectModel(id);

  return (
    <div className="model-edit">
      <div>
        <label htmlFor="name-input">
          Model name:
          {' '}
          <input type="text" id="name-input" value={store.nameInput} onChange={(e) => store.setNameInput(e.target.value)} />
        </label>
      </div>
      <div>
        <label htmlFor="make-input">
          Make:
          {' '}
          <select id="make-input" value={store.makeIdInput} onChange={(e) => store.setMakeIdInput(e.target.value)}>
            {store.modelStore.makeStore.makes.map(
              (m) => <option value={m.id} key={m.id}>{m.name}</option>,
            )}
          </select>
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => store.updateModel(history)}
        >
          Update
        </button>
      </div>
    </div>
  );
}

ModelEdit.propTypes = {
  modelEditStore: instanceOf(ModelEditStore).isRequired,
};

export default inject('modelEditStore')(observer(ModelEdit));

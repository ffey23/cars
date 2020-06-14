import React, { useRef } from 'react';
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import ModelStore from '../stores/model/ModelStore';
import useLoadModels from '../common/hooks/useLoadModels';

function updateModel(model, modelInput, makeInput, history) {
  model.updateOnServer({
    name: modelInput.current.value,
    makeId: Number(makeInput.current.value),
  }).then(() => {
    history.push('/model-list');
  }).catch(() => {
    model.store.interfaceStore.pushNotification({
      message: 'Error while updating model!',
    });
  });
}
function ModelEdit({ modelStore }) {
  const { models } = modelStore;
  const { id } = useParams();
  const modelInput = useRef();
  const makeInput = useRef();
  const history = useHistory();
  useLoadModels(modelStore);
  if (!models.length || !modelStore.makeStore.makes.length) {
    return null;
  }
  const model = models.find((m) => m.id === id);
  return (
    <div className="model-edit">
      <div>
        <label htmlFor={modelInput}>
          Model name:
          {' '}
          <input type="text" defaultValue={model.name} ref={modelInput} />
        </label>
      </div>
      <div>
        <label htmlFor={makeInput}>
          Make:
          {' '}
          <select defaultValue={model.make.id} ref={makeInput}>
            {modelStore.makeStore.makes.map(
              (m) => <option value={m.id} key={m.id}>{m.name}</option>,
            )}
          </select>
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => updateModel(model, modelInput, makeInput, history)}
        >
          Update
        </button>
      </div>
    </div>
  );
}

ModelEdit.propTypes = {
  modelStore: instanceOf(ModelStore).isRequired,
};

export default inject('modelStore')(observer(ModelEdit));

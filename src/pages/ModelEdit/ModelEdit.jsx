import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import ModelEditStore from './ModelEditStore';
import useLoadModels from '../../common/hooks/useLoadModels';
import useResetForm from '../../common/hooks/useResetForm';
import ModelForm from '../../components/ModelForm';

function ModelEdit({ modelEditStore: store }) {
  // Load models if not already loaded
  useLoadModels(store.dataStore);

  // Reset form on leaving page;
  useResetForm(store);

  const { id } = useParams();

  // Waiting until models are loaded
  if (store.loadingStatusMessage != null) return store.loadingStatusMessage;

  // Select model if not already selected
  store.selectModel(id);

  return (
    <ModelForm store={store} />
  );
}

ModelEdit.propTypes = {
  modelEditStore: instanceOf(ModelEditStore).isRequired,
};

export default inject('modelEditStore')(observer(ModelEdit));

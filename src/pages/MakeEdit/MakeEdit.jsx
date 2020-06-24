import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { instanceOf } from 'prop-types';
import { useLoadMakes, useResetForm } from '../../common/hooks';
import { MakeEditStore } from '../../stores';
import { MakeForm } from '../../components';

function MakeEdit({ makeEditStore: store }) {
  // Load makes if not already loaded
  useLoadMakes(store.dataStore);

  // Reset form on leaving page;
  useResetForm(store);

  const { id } = useParams();

  // Waiting until makes are loaded
  if (store.loadingStatusMessage != null) return store.loadingStatusMessage;

  // Selecting make if not already selected or if id
  store.selectMake(id);
  return (
    <MakeForm store={store} />
  );
}

MakeEdit.propTypes = {
  makeEditStore: instanceOf(MakeEditStore).isRequired,
};

export default inject('makeEditStore')(observer(MakeEdit));

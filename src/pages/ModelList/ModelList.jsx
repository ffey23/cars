import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ModelFilter from './ModelFilter';
import ModelListStore from './ModelListStore';
import useLoadModels from '../../common/hooks/useLoadModels';
import useResetErrorMessage from '../../common/hooks/useResetErrorMessage';
import FilterTable from '../../components/FilterTable/FilterTable';
import styles from './ModelList.module.scss';

function ModelList({ modelListStore: store }) {
  useLoadModels(store.dataStore);
  useResetErrorMessage(store);
  if (store.loadingStatusMessage != null) return store.loadingStatusMessage;
  return (
    <FilterTable
      tableCells={store.tableCells}
      pagination={store.dataStore.pagination}
      editLinkBase="model-edit"
      top={<ModelFilter modelStore={store.dataStore} />}
      tableHeaderClassName={styles.tableRows}
      tableRecordClassName={styles.tableRows}
    />
  );
}

ModelList.propTypes = {
  modelListStore: PropTypes.instanceOf(ModelListStore).isRequired,
};

export default inject('modelListStore')(observer(ModelList));

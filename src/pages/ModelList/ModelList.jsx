import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ModelFilter from './ModelFilter/ModelFilter';
import ModelListStore from './ModelListStore';
import FilterTable from '../../components/FilterTable/FilterTable';
import styles from './ModelList.module.scss';
import ModelForm from '../../components/forms/ModelForm';

function ModelList({ modelListStore: store }) {
  if (store.loadingStatusMessage != null) return store.loadingStatusMessage;
  return (
    <FilterTable
      tableCells={store.tableCells}
      pagination={store.dataStore.pagination}
      editLinkBase={store.editLinkBase}
      filters={<ModelFilter modelStore={store.dataStore} />}
      onAddButtonClick={store.toggleAddModal}
      onAddModalRequestClose={store.toggleAddModal}
      isAddModalOpened={store.isAddModalOpened}
      addModalForm={<ModelForm store={store} />}
      addModalContentLabel={store.addModalContentLabel}
      tableHeaderClassName={styles.tableRows}
      tableRecordClassName={styles.tableRows}
    />
  );
}

ModelList.propTypes = {
  modelListStore: PropTypes.instanceOf(ModelListStore).isRequired,
};

export default inject('modelListStore')(observer(ModelList));

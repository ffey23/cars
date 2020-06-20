import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import MakeListStore from './MakeListStore';
import FilterTable from '../../components/FilterTable/FilterTable';
import styles from './MakeList.module.scss';
import MakeForm from '../../components/MakeForm';

function MakeList({ makeListStore: store }) {
  if (store.loadingStatusMessage != null) return store.loadingStatusMessage;
  return (
    <div>
      <FilterTable
        tableCells={store.tableCells}
        pagination={store.dataStore.pagination}
        editLinkBase="make-edit"
        tableHeaderClassName={styles.tableRows}
        tableRecordClassName={styles.tableRows}
        onAddButtonClick={store.toggleAddModal}
        onAddModalRequestClose={store.toggleAddModal}
        isAddModalOpened={store.isAddModalOpened}
        addModalForm={<MakeForm store={store} />}
        addModalContentLabel={store.addModalContentLabel}
      />
    </div>
  );
}

MakeList.propTypes = {
  makeListStore: PropTypes.instanceOf(MakeListStore).isRequired,
};

export default inject('makeListStore')(observer(MakeList));

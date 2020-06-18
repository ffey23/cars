import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import MakeListStore from './MakeListStore';
import FilterTable from '../../components/FilterTable/FilterTable';
import styles from './MakeList.module.scss';

function MakeList({ makeListStore: store }) {
  if (store.loadingStatusMessage != null) return store.loadingStatusMessage;
  return (
    <FilterTable
      tableCells={store.tableCells}
      pagination={store.dataStore.pagination}
      editLinkBase="make-edit"
      tableHeaderClassName={styles.tableRows}
      tableRecordClassName={styles.tableRows}
    />
  );
}

MakeList.propTypes = {
  makeListStore: PropTypes.instanceOf(MakeListStore).isRequired,
};

export default inject('makeListStore')(observer(MakeList));

import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import MakeStore from '../stores/make/MakeStore';
import useLoadMakes from '../common/hooks/useLoadMakes';
import FilterTable from '../components/FilterTable/FilterTable';
import styles from './MakeList.module.scss';

const tableCells = [{ name: 'Make', propertyName: 'name' }];
function MakeList({ makeStore }) {
  useLoadMakes(makeStore);
  if (!makeStore.makes.length) return null;
  return (
    <FilterTable
      tableCells={tableCells}
      pagination={makeStore.pagination}
      editLinkBase="make-edit"
      tableHeaderClassName={styles.tableRows}
      tableRecordClassName={styles.tableRows}
    />
  );
}

MakeList.propTypes = {
  makeStore: PropTypes.instanceOf(MakeStore).isRequired,
};

export default inject('makeStore')(observer(MakeList));

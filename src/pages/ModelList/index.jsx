import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ModelFilter from './ModelFilter';
import ModelStore from '../../stores/model/ModelStore';
import useLoadModels from '../../common/hooks/useLoadModels';
import FilterTable from '../../components/FilterTable';
import styles from './index.module.scss';

const tableCells = [{ name: 'Model', propertyName: 'name' }, { name: 'Manufacturer', propertyName: 'make.name' }];
function ModelList({ modelStore }) {
  useLoadModels(modelStore);
  if (!modelStore.models.length) return null;
  return (
    <FilterTable
      tableCells={tableCells}
      pagination={modelStore.pagination}
      editLinkBase="model-edit"
      top={<ModelFilter modelStore={modelStore} />}
      tableHeaderClassName={styles.tableRows}
      tableRecordClassName={styles.tableRows}
    />
  );
}

ModelList.propTypes = {
  modelStore: PropTypes.instanceOf(ModelStore).isRequired,
};

export default inject('modelStore')(observer(ModelList));

import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ModelFilter from './ModelFilter';
import ModelStore from '../../stores/model/ModelStore';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import ModelTableHeader from './ModelTableHeader';

const tableCells = [{ name: 'Model', propertyName: 'name' }, { name: 'Manufacturer', propertyName: 'make.name' }];
function ModelList({ modelStore }) {
  return (
    <div className="model-list">
      <ModelFilter modelStore={modelStore} />
      <ModelTableHeader cells={tableCells} pagination={modelStore.pagination} />
      <Table data={modelStore.pagination.list} cells={tableCells} editLinkBase="model-edit" />
      <Pagination pagination={modelStore.pagination} />
    </div>
  );
}

ModelList.propTypes = {
  modelStore: PropTypes.instanceOf(ModelStore).isRequired,
};

export default inject('modelStore')(observer(ModelList));

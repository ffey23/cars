/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ModelFilter from './ModelFilter';
import ModelTable from './ModelTable';
import ModelPagination from './ModelPagination';
import ModelStore from '../../stores/model/ModelStore';

function ModelList({ modelStore }) {
  return (
    <div className="model-list">
      <ModelFilter />
      <ModelTable models={modelStore.pagination.list} />
      <ModelPagination />
    </div>
  );
}

ModelList.propTypes = {
  modelStore: PropTypes.instanceOf(ModelStore).isRequired,
};

export default inject('modelStore')(observer(ModelList));

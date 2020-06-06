/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import modelType from '../../common/types/modelType';
import ModelTableItem from './ModelTableItem';


function ModelTable({ models }) {
  return (
    <div className="model-table">
      {models.map((model) => (
        <ModelTableItem key={model.id} model={model}/>
      ))}
    </div>
  );
}

ModelTable.propTypes = {
  models: PropTypes.arrayOf(modelType).isRequired,
};

export default observer(ModelTable);

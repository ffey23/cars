/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import modelType from '../../common/types/modelType';
import ModelTableItem from './ModelTableItem';


function ModelTable({ models }) {
  console.log("here");
  return (
    <div className="model-table">
      {models.map((model) => (
        <ModelTableItem key={model.id} model={model}/>
      ))}
    </div>
  );
}

ModelTable.propTypes = {
  list: PropTypes.arrayOf(modelType),
};

export default observer(ModelTable);

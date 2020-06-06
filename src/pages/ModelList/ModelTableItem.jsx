/* eslint-disable */
import React from 'react';
import modelType from '../../common/types/modelType';

function ModelTableItem({ model }) {
  return (
    <div className="model-table-item">
      <div className="model-table-item__cell">{model.name}</div>
      <div className="model-table-item__cell">{model.make.name}</div>
    </div>
  );
}

ModelTableItem.propTypes = {
  model: modelType.isRequired,
};

export default ModelTableItem;

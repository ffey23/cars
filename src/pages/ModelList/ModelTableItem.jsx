/* eslint-disable */
import React from 'react';
import modelType from '../../common/types/modelType';

function ModelTableItem({ model }) {
  return (
    <div className="model-table-item">
      {model.id}
      {' '}
      {model.name}
    </div>
  );
}

ModelTableItem.propTypes = {
  model: modelType.isRequired,
};

export default ModelTableItem;

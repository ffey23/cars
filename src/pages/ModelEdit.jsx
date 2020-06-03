import React from 'react';
import { useParams } from 'react-router-dom';

function ModelEdit() {
  const { id } = useParams();
  return (
    <div className="model-edit">
      Maodel Edit
      {' '}
      { id }
    </div>
  );
}

ModelEdit.propTypes = {

};

export default ModelEdit;

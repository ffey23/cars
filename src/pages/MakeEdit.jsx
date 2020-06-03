import React from 'react';
import { useParams } from 'react-router-dom';

function MakeEdit() {
  const { id } = useParams();
  return (
    <div className="make-edit">
      Make Edit
      {' '}
      {id}
    </div>
  );
}

MakeEdit.propTypes = {

};

export default MakeEdit;

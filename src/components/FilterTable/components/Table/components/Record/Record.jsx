import React from 'react';
import {
  arrayOf, shape, string, oneOfType, number,
} from 'prop-types';
import { Link } from 'react-router-dom';

const nestedProperty = require('nested-property');

function Record({
  record, cells, editLinkBase, containerClassName, dataClassName,
}) {
  return (
    <div className={containerClassName}>
      {/* 1 cell for each property plus link */}
      {cells.map((c) => (
        <div key={c.propertyName} className={dataClassName}>
          {nestedProperty.get(record, c.propertyName)}
        </div>
      ))}
      <div className={dataClassName}>
        <Link to={`/${editLinkBase}/${record.id}`}>Edit</Link>
      </div>
    </div>
  );
}

Record.propTypes = {
  record: shape({ id: oneOfType([string, number]) }).isRequired,
  cells: arrayOf(shape({ label: string, propertyName: string })).isRequired,
  editLinkBase: string.isRequired,
  containerClassName: string,
  dataClassName: string,
};

Record.defaultProps = {
  containerClassName: '',
  dataClassName: '',
};

export default Record;

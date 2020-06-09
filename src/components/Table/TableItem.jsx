import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

const nestedProperty = require('nested-property');

function TableItem({ item, cells, editLinkBase }) {
  return (
    <div className="model-table-item">
      {/* 1 cell for each property plus link */}
      {cells.map((c) => <div key={c.propertyName} className="model-table-item__cell">{nestedProperty.get(item, c.propertyName)}</div>)}
      <Link to={`/${editLinkBase}/${item.id}`}>Edit</Link>
    </div>
  );
}

TableItem.propTypes = {
  item: shape({}).isRequired,
  cells: arrayOf(shape({ label: string, propertyName: string })).isRequired,
  editLinkBase: string.isRequired,
};

export default TableItem;

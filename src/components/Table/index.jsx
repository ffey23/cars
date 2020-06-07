import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { observer } from 'mobx-react';
import TableItem from './TableItem';


function Table({ data, cells, editLinkBase }) {
  return (
    <div className="model-table">
      {data.map((item) => (
        <TableItem key={item.id} item={item} cells={cells} editLinkBase={editLinkBase} />
      ))}
    </div>
  );
}

Table.propTypes = {
  data: arrayOf(shape({})).isRequired,
  cells: arrayOf(string).isRequired,
  editLinkBase: string.isRequired,
};

export default observer(Table);

import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { observer } from 'mobx-react';
import TableItem from './Record';


function TableData({
  data, cells, editLinkBase, tableClassName,
}) {
  return (
    <div className={tableClassName}>
      {data.map((item) => (
        <TableItem key={item.id} item={item} cells={cells} editLinkBase={editLinkBase} />
      ))}
    </div>
  );
}

TableData.propTypes = {
  data: arrayOf(shape({})).isRequired,
  cells: arrayOf(shape({ label: string, propertyName: string })).isRequired,
  editLinkBase: string.isRequired,
  tableClassName: string,
};

TableData.defaultProps = {
  tableClassName: 'table',
};

export default observer(TableData);

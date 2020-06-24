import React from 'react';
import {
  arrayOf, shape, string, instanceOf,
} from 'prop-types';
import { observer } from 'mobx-react';
import Pagination from '../../../../common/utils/Pagination/Pagination';
import { Header, Record } from './components';

function Table({
  pagination, tableCells, editLinkBase, containerClassName, headerClassName,
  headerCellClassName,
  recordClassName,
  recordCellClassName,
}) {
  return (
    <div className={containerClassName}>
      <Header
        cells={tableCells}
        pagination={pagination}
        containerClassName={headerClassName}
        cellClassName={headerCellClassName}
      />
      {pagination.list.map((item) => (
        <Record
          key={item.id}
          record={item}
          cells={tableCells}
          editLinkBase={editLinkBase}
          containerClassName={recordClassName}
          dataClassName={recordCellClassName}
        />
      ))}
    </div>
  );
}

Table.propTypes = {
  tableCells: arrayOf(shape({
    name: string,
    propertyName: string,
  })).isRequired,
  editLinkBase: string.isRequired,
  pagination: instanceOf(Pagination).isRequired,
  containerClassName: string,
  headerClassName: string,
  headerCellClassName: string,
  recordClassName: string,
  recordCellClassName: string,
};

Table.defaultProps = {
  containerClassName: '',
  headerClassName: '',
  headerCellClassName: '',
  recordClassName: '',
  recordCellClassName: '',
};

export default observer(Table);

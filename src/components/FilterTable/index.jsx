import React from 'react';
import {
  instanceOf, arrayOf, string, shape, node,
} from 'prop-types';
import { observer } from 'mobx-react';
import Pagination from '../Pagination';
import styles from './index.module.scss';
import Table from './Table';

function addCustomClass(className) {
  if (className == null) return '';
  return ` ${className}`;
}

function FilterTable({
  tableCells,
  pagination,
  editLinkBase,
  top,
  containerClassName,
  tableClassName,
  tableHeaderClassName,
  tableHeaderCellClassName,
  tableRecordClassName,
  tableRecordCellClassName,
}) {
  return (
    <div className={`${styles.container}${addCustomClass(containerClassName)}`}>
      { top }
      <Table
        pagination={pagination}
        tableCells={tableCells}
        editLinkBase={editLinkBase}
        containerClassName={`${styles.table}${addCustomClass(tableClassName)}`}
        headerClassName={`${styles.tableHeader}${addCustomClass(tableHeaderClassName)}`}
        headerCellClassName={`${styles.tableHeaderCell}${addCustomClass(tableHeaderCellClassName)}`}
        recordClassName={`${styles.tableRecord}${addCustomClass(tableRecordClassName)}`}
        recordCellClassName={`${styles.tableRecordCell}${addCustomClass(tableRecordCellClassName)}`}
      />
      <Pagination pagination={pagination} />
    </div>
  );
}

/**
 * tableHeaderClassName and tableRecordClassName are required for now
 * they determine how many columns will table have
 * classes must have rule: grid-template-column: repeat(tableCells.length, 1fr)
 * TODO: make better solution in future which would do it automatically
 */
FilterTable.propTypes = {
  tableCells: arrayOf(shape({
    name: string,
    propertyName: string,
  })).isRequired,
  editLinkBase: string.isRequired,
  pagination: instanceOf(Pagination).isRequired,
  containerClassName: string,
  tableClassName: string,
  tableHeaderClassName: string.isRequired,
  tableHeaderCellClassName: string,
  tableRecordClassName: string.isRequired,
  tableRecordCellClassName: string,
  top: node,
};

FilterTable.defaultProps = {
  containerClassName: null,
  tableClassName: null,
  tableHeaderCellClassName: null,
  tableRecordCellClassName: null,
  top: null,
};

export default observer(FilterTable);

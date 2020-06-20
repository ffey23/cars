import React from 'react';
import {
  instanceOf, arrayOf, string, shape, node, func, bool,
} from 'prop-types';
import { observer } from 'mobx-react';
import Modal from 'react-modal';
import PaginationComponent from '../Pagination';
import Pagination from '../../common/utils/Pagination/Pagination';
import styles from './FilterTable.module.scss';
import Table from './Table';

function addCustomClass(className) {
  if (className == null) return '';
  return ` ${className}`;
}

function FilterTable({
  tableCells,
  pagination,
  editLinkBase,
  filters,
  isAddModalOpened,
  onAddButtonClick,
  onAddModalRequestClose,
  addModalForm,
  addModalContentLabel,
  containerClassName,
  topClassName,
  addButtonContainerClassName,
  addButtonrClassName,
  filtersContainerClassName,
  tableClassName,
  tableHeaderClassName,
  tableHeaderCellClassName,
  tableRecordClassName,
  tableRecordCellClassName,
}) {
  return (
    <div className={`${styles.container}${addCustomClass(containerClassName)}`}>
      <div className={`${styles.top}${addCustomClass(topClassName)}`}>
        <div className={`${styles.addButtonContainer}${addCustomClass(addButtonContainerClassName)}`}>
          <button
            type="button"
            className={`${styles.addButton}${addCustomClass(addButtonrClassName)}`}
            onClick={onAddButtonClick}
          >
            +
          </button>
        </div>
        <div className={`${styles.filtersContainer}${addCustomClass(filtersContainerClassName)}`}>
          { filters }
        </div>
      </div>
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
      <PaginationComponent pagination={pagination} />
      <Modal
        isOpen={isAddModalOpened}
        contentLabel={addModalContentLabel}
        onRequestClose={onAddModalRequestClose}
      >
        { addModalForm }
      </Modal>
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
  topClassName: string,
  addButtonContainerClassName: string,
  addButtonrClassName: string,
  filtersContainerClassName: string,
  tableClassName: string,
  tableHeaderClassName: string.isRequired,
  tableHeaderCellClassName: string,
  tableRecordClassName: string.isRequired,
  tableRecordCellClassName: string,
  filters: node,
  isAddModalOpened: bool.isRequired,
  onAddButtonClick: func.isRequired,
  onAddModalRequestClose: func.isRequired,
  addModalForm: node.isRequired,
  addModalContentLabel: string.isRequired,
};

FilterTable.defaultProps = {
  containerClassName: null,
  topClassName: null,
  addButtonContainerClassName: null,
  addButtonrClassName: null,
  filtersContainerClassName: null,
  tableClassName: null,
  tableHeaderCellClassName: null,
  tableRecordCellClassName: null,
  filters: null,
};

export default observer(FilterTable);

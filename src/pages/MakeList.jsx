import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import MakeStore from '../stores/make/MakeStore';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import TableHeader from '../components/Table/TableHeader';

const tableCells = [{ name: 'Make', propertyName: 'name' }];
function MakeList({ makeStore }) {
  return (
    <div className="make-list">
      <TableHeader cells={tableCells} pagination={makeStore.pagination} />
      <Table data={makeStore.pagination.list} cells={tableCells} editLinkBase="make-edit" />
      <Pagination pagination={makeStore.pagination} />
    </div>
  );
}

MakeList.propTypes = {
  makeStore: PropTypes.instanceOf(MakeStore).isRequired,
};

export default inject('makeStore')(observer(MakeList));

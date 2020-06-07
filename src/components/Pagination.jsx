import React from 'react';
import PropTypes from 'prop-types';
import { Observer, observer } from 'mobx-react';
import ReactPaginate from 'react-paginate';
import PaginationClass from '../common/utils/Pagination';

function Pagination({ pagination }) {
  const pageCount = Math.ceil(pagination.listCount / pagination.perPage);
  return (
    <Observer>
      { () => (
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={10}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => pagination.setCurrentPage(selected + 1)}
        />
      )}
    </Observer>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.instanceOf(PaginationClass).isRequired,
};

export default observer(Pagination);

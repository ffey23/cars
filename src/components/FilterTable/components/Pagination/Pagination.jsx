import React from 'react';
import PropTypes from 'prop-types';
import { Observer, observer } from 'mobx-react';
import ReactPaginate from 'react-paginate';
import PaginationClass from '../../../../common/utils/Pagination/Pagination';
import styles from './Pagination.module.scss';

function Pagination({ pagination }) {
  return (
    <Observer>
      { () => (
        <ReactPaginate
          pageCount={pagination.listPagesCount}
          pageRangeDisplayed={10}
          marginPagesDisplayed={1}
          forcePage={pagination.currentPage - 1}
          onPageChange={({ selected }) => pagination.setCurrentPage(selected + 1)}
          containerClassName={styles.pagination}
          pageClassName={styles.page}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          activeClassName={styles.pageActive}
          pageLinkClassName={styles.pageLink}
          nextLinkClassName={styles.nextLink}
          previousLinkClassName={styles.previousLink}
          disabledClassName={styles.disabled}
        />
      )}
    </Observer>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.instanceOf(PaginationClass).isRequired,
};

export default observer(Pagination);

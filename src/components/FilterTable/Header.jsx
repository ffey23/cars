import React from 'react';
import {
  shape, string, arrayOf, instanceOf,
} from 'prop-types';
import { observer } from 'mobx-react';
import Pagination from '../../common/utils/Pagination/Pagination';

function determineArrow(cell, sortBy) {
  let arrowCode;
  if (!sortBy || sortBy.field !== cell.propertyName) {
    arrowCode = 8597;
  } else {
    arrowCode = sortBy.desc ? 8595 : 8593;
  }
  return arrowCode;
}

function onKeyDown(e, pagination, propertyName) {
  if (e.keyCode === 13) { pagination.setSortByField(propertyName); }
}

function Header({
  cells, pagination, containerClassName, cellClassName,
}) {
  return (
    <div className={containerClassName}>
      {cells.map((c) => {
        const arrowCode = determineArrow(c, pagination.sortBy);
        return (
          <div
            key={c.propertyName}
            role="button"
            className={cellClassName}
            onClick={() => pagination.setSortByField(c.propertyName)}
            onKeyDown={(e) => onKeyDown(e, pagination, c.propertyName)}
            tabIndex={0}
          >
            {c.name}
            <span>{String.fromCharCode(arrowCode)}</span>
          </div>
        );
      })}
    </div>
  );
}

Header.propTypes = {
  cells: arrayOf(shape({ label: string, propertyName: string })).isRequired,
  pagination: instanceOf(Pagination).isRequired,
  containerClassName: string,
  cellClassName: string,
};

Header.defaultProps = {
  containerClassName: '',
  cellClassName: '',
};

export default observer(Header);

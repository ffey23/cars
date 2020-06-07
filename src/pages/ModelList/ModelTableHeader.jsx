import React from 'react';
import {
  shape, string, arrayOf, instanceOf,
} from 'prop-types';
import { observer } from 'mobx-react';
import Pagination from '../../common/utils/Pagination';

class ModelTableHeader extends React.Component {
  determineArrow(cell) {
    const { pagination } = this.props;
    let arrowCode;
    if (!pagination.sortBy || pagination.sortBy.field !== cell.propertyName) {
      arrowCode = 8597;
    } else {
      arrowCode = pagination.sortBy.desc ? 8595 : 8593;
    }
    return arrowCode;
  }

  render() {
    const { pagination, cells } = this.props;

    return (
      <div className="model-table-header">
        {cells.map((c) => {
          const arrow = this.determineArrow(c);
          return (
            <div
              role="button"
              className="model-table-header__cell"
              onClick={() => pagination.setSortByField(c.propertyName)}
              onKeyDown={() => pagination.setSortByField(c.propertyName)}
              tabIndex={0}
            >
              {c.name}
              <span>{String.fromCharCode(arrow)}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

ModelTableHeader.propTypes = {
  cells: arrayOf(shape({ label: string, propertyName: string })).isRequired,
  pagination: instanceOf(Pagination).isRequired,
};

export default observer(ModelTableHeader);

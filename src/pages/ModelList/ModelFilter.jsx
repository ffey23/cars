import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ModelStore from '../../stores/model/ModelStore';

function ModelFilter({ modelStore }) {
  const makeIdFilter = modelStore.pagination.filters.find((f) => f.field === 'make.id');
  const selectedMakeId = makeIdFilter && makeIdFilter.value;
  return (
    <div className="model-filter">
      <div className="select">
        <select
          value={selectedMakeId}
          onChange={(event) => modelStore.pagination.setFilters([
            { field: 'make.id', value: Number(event.target.value) },
          ])}
        >
          <option value={null}>All</option>
          {modelStore.makeStore.makes.map((m) => <option value={m.id} key={m.id}>{m.name}</option>)}
        </select>
      </div>
    </div>
  );
}

ModelFilter.propTypes = {
  modelStore: PropTypes.instanceOf(ModelStore).isRequired,
};

export default observer(ModelFilter);

/* eslint-disable */
import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject('modelStore')(observer(class App extends React.Component {
  render() {
    const {setCurrentPage, setFilters, setSortBy} = this.props.modelStore.pagination;
    return (
      <div className="App">
        <ul>
          {this.props.modelStore.modelsList.map((m) => <li key={m.id}>{m.id} {m.name} {m.make.name}</li>)}
        </ul>
        <button
           onClick={() => setCurrentPage(this.props.modelStore.previousPage)}
        >
            Go to {this.props.modelStore.previousPage}
        </button>
        <button
          onClick={() => setCurrentPage(this.props.modelStore.nextPage)}
        >Go to {this.props.modelStore.nextPage}</button>
        <button
          onClick={() => setFilters([
            {field: 'make.name', value: 'BMW'}
          ])}
        >Go to {this.props.modelStore.nextPage}</button>
        <button
          onClick={() => setSortBy(
            {field: 'name'}
          )}
        >Sort</button>
      </div>
    );
  }
}))

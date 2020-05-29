/* eslint-disable */
import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject('modelStore', 'makeStore')(observer(class App extends React.Component {

  render() {
    

    const {setCurrentPage, setFilters, setSortBy, previousPage, nextPage, list: modelList} = this.props.modelStore.pagination;
    const { list: makeList } = this.props.makeStore.pagination;
    const {selectModel, selectedModel} = this.props.modelStore;
    

    const renderSelected = () => {
      if(!selectedModel) return null;

      return(
        <div>
          {selectedModel.id} {selectedModel.name} {selectedModel.make.name}
        </div>
      )
    } 

    const renderUpdate = () => {
      if(!selectedModel) return null;

      return(
        <button onClick={() => this.props.modelStore.models[2].updateOnServer({name: 'New name', makeId: 1})}>Change</button>
      )
    } 
    return (
      <div className="App">
        <ul>
          {modelList.map((m) => <li key={m.id}>{m.id} {m.name} {m.make.name}</li>)}
        </ul>
        <button
           onClick={() => setCurrentPage(previousPage)}
        >
            Go to {previousPage}
        </button>
        <button
          onClick={() => setCurrentPage(nextPage)}
        >Go to {nextPage}</button>
        <button
          onClick={() => setFilters([
            {field: 'make.name', value: 'BMW'}
          ])}
        >Filter</button>
        <button
          onClick={() => setSortBy(
            {field: 'name'}
          )}
        >Sort</button>
        <button
          onClick={() => selectModel(
            this.props.modelStore.models[2]
          )}
        >Select</button>
        {renderSelected()}
        {renderUpdate()}
        <ul>
          {makeList.map((m) => <li key={m.id}>{m.id} {m.name}</li>)}
        </ul>
      </div>
    );
  }
}))

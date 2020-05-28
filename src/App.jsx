/* eslint-disable */
import React from 'react';
import { observer, inject } from 'mobx-react';

export default inject('models')(observer(class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ul>
          {this.props.models.models.map((m) => <li key={m.id}>{m.id} {m.name}</li>)}
        </ul>
      </div>
    );
  }
}))

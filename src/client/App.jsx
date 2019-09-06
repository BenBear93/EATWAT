import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './style.scss';
import Start from './components/start/start'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Start />
      </div>
    );
  }
}

export default hot(module)(App);
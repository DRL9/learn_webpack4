import React from 'react';
import styles from './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.main}>
        hello worldssss
        <button className={'btn'} type="button">
          click me
        </button>
      </div>
    );
  }
}

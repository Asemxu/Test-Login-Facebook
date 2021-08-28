import logo from './logo.svg';
import './App.css';
import { login } from './Facebook';
import React ,{ useEffect } from 'react';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="btn btn-facebook" onClick={login}>
            <i className="fa fa-facebook mr-1"></i>
            Login with Facebook
        </button>
      </header>
    </div>
  );
}

export default App;

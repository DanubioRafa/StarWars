import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StartWarsProvider from './context/StartWarsProvider';

ReactDOM.render(
  <StartWarsProvider>
    <App />
  </StartWarsProvider>, document.getElementById('root'),
);

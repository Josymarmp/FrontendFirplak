import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "primereact/resources/themes/md-light-deeppurple/theme.css";
import 'primeicons/primeicons.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
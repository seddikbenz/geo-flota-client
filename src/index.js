import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';
import './css/photon.css'
import 'leaflet'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
const rootEl = document.getElementById('app');
const renderApp = () => {
  ReactDOM.render(
    <App />, rootEl
  );
}

serviceWorker.unregister();
renderApp();

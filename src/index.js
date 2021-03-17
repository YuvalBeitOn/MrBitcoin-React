import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { store } from './store/index'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();

serviceWorker.register();

window.addEventListener( 'beforeinstallprompt', ( e ) => {
  console.log( 'beforeinstallprompt event has fired' )
  e.prompt ()
});
import React from 'react';
import ReactDOM from 'react-dom/client';
import { makeAutoObservable } from 'mobx';
import App from './App';


class Store {
  content = '';
  constructor() {
    makeAutoObservable(this);
  }
}
const store = new Store();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

window.document.addEventListener('message', (e) => {
  store.content = e.data;
});


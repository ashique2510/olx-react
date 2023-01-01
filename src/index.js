import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { FirebaseContext } from './store/firebaseContext'
import Context from './store/firebaseContext'
import {auth,db,storage} from './firebase/config'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={{auth,db,storage}}>
        <Context>
        <App />
        </Context>
      </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

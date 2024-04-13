import React from 'react';
import './App.css';
import { Reviews } from './shared/Reviews';
import { Cart } from './shared/Cart';
import { Products } from './shared/Products';
import { Provider } from 'react-redux';
import { store } from './store/store';



function App() {
  return (
    <Provider store={store}>
    <div className="app">
      <div className="container">
        <span className="header">тестовое задание</span>
        <Reviews/>
        <Cart/>
        <Products/>
      </div>
        

    </div>
    </Provider>
  );
}

export default App;

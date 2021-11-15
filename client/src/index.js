import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';  
import { cartStore,persistor } from './redux/cart/cartStore';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={cartStore}>
    <PersistGate loading={null} persistor={persistor}>

    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
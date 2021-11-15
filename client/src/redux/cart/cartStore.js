import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./../user/userSlice"

import { 
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key:'root',
  version:1,
  storage, 
}

// fijate que los nombres vienen del name del xxSlice
const rootReducer = combineReducers({
  user:userReducer,
  cart:cartReducer,
})

// Ejemplo para un único reducer,no será lo normal
// const persistedReducer = persistReducer(persistConfig,userReducer);
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const cartStore = configureStore({
/*   reducer: { 
     cart: cartReducer ,
     user: persistedReducer
 }, */
//  dado que he combinado los reducer ya no sera un {}
 reducer:persistedReducer,
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(cartStore)

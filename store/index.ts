import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import alertReducer from './slices/alertSlice';
import themeReducer from './slices/themeSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  ui: uiReducer,
  alert: alertReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'organic-food-root',
  storage,
  whitelist: ['cart'], // only persist the cart; alerts should never survive a refresh
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
      }),
  });

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

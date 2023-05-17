import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import counterReducer from '../features/counter/counterSlice';

const persistConfig = {
	key: 'root',
	storage,
};
const persistedReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
	reducer: {
		counter: persistedReducer
	},
	devTools: true,
	middleware: [thunk]
});
export const persistor = persistStore(store);
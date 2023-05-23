import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import counterReducer from '@/features/counter/counterSlice';
import departmentReducer from '@/features/department/departmentSlice';
import employeeReducer from '@/features/employee/employeeSlice';
import modalReducer from '@/features/modal/modalSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistDepartmentConfig = {
	key: 'department',
	storage,
};

const persistedCounter = persistReducer(persistConfig, counterReducer);
const persistedDepartment = persistReducer(persistDepartmentConfig, departmentReducer);

export const store = configureStore({
	reducer: {
		counter: persistedCounter,
		department: persistedDepartment,
		modal: modalReducer,
		employee: employeeReducer
	},
	devTools: true,
	middleware: [thunk]
});
export const persistor = persistStore(store);
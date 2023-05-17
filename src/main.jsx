import './i18n';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { setLocale } from 'yup';

import App from './App.jsx';
import StoreProvider from './app/StoreProvider';
import { yupLocale } from './utils/yupLocale.jsx';

setLocale(yupLocale);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
);

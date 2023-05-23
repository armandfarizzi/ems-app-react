import './App.css';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routesArray } from '@/routes/routes';

import Modal from './components/Modal/Modal';

function App() {
	return (
		<>
			<Modal/>
			<RouterProvider router={createBrowserRouter(routesArray)}/>
		</>
	);
}

export default App;

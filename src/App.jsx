import './App.css';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routesArray } from '@/routes/routes';

function App() {
	return (
		<RouterProvider router={createBrowserRouter(routesArray)}/>
	);
}

export default App;

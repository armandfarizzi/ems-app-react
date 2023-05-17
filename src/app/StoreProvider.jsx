import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import { store } from './store';

const StoreProvider = ({ children }) => {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	); 
};

StoreProvider.propTypes = {
	children: PropTypes.element
};
export default StoreProvider;

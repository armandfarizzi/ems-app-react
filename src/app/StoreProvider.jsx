import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { fetchDepartment } from '@/features/department/departmentSlice';

import { store } from './store';

const RunFirstReduxEffect = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchDepartment());
	});
	return <>
		{children}
	</>;
};

const StoreProvider = ({ children }) => {
	return (
		<Provider store={store}>
			<RunFirstReduxEffect>
				{children}
			</RunFirstReduxEffect>
		</Provider>
	);
};




RunFirstReduxEffect.propTypes = {
	children: PropTypes.element
};
StoreProvider.propTypes = {
	children: PropTypes.element
};
export default StoreProvider;

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const ErrorMessage = ({ error }) => {
	const { t } = useTranslation();

	if (error === undefined) {
		return null;
	} else if (typeof error === 'string') {
		return <div className="error-text">{error}</div>;
	} else {
		const { key, values } = error;
		return <div className="error-text">{t(key, values)}</div>;
	}
};

ErrorMessage.propTypes = {
	error: PropTypes.shape({
		key: PropTypes.string,
		values: PropTypes.string,
	})
};
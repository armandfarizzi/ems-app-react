import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const ErrorMessage = ({ error }) => {
	const { t } = useTranslation();

	if (error === undefined) {
		return null;
	} else if (typeof error === 'string') {
		return <span className="label-text-alt text-sm text-slate-300">{error}</span>;
	} else {
		const { key, values } = error;
		return <span className="label-text-alt text-sm text-slate-300">{t(key, values)}</span>;
	}
};

ErrorMessage.propTypes = {
	error: PropTypes.shape({
		key: PropTypes.string,
		values: PropTypes.string,
	})
};
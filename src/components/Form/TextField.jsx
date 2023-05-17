import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { ErrorMessage } from './ErrorMessage';

export const TextField = forwardRef(
	(
		{
			id,
			name,
			label,
			error,
			renderContainer = (props) => <input {...props} />,
			onBlur,
			onChange,
		},
		ref
	) => {
		return (
			<>
				{label !== undefined ? (
					<label htmlFor={id}>{label}</label>
				) : null}
				{renderContainer({
					id,
					name,
					type: 'text',
					ref,
					className: 'form-control form-control-sm',
					onBlur,
					onChange,
				})}
				<ErrorMessage error={error} />
			</>
		);
	}
);

TextField.displayName = "TextField";
TextField.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string,
	renderContainer: PropTypes.any,
	onBlur: PropTypes.any,
	onChange: PropTypes.any
};
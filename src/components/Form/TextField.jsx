import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { ErrorMessage } from './ErrorMessage';

export const TextField = forwardRef(
	(
		{
			value,
			id,
			name,
			label,
			error,
			renderContainer = (props) => <input {...props} />,
			onBlur,
			onChange,
			className
		},
		ref
	) => {
		return (
			<>
				{label !== undefined ? (
					<label htmlFor={id} className='label'>
						<span className='label-text text-slate-200'>{label}</span>
						<ErrorMessage error={error} />
					</label>
				) : null}
				{renderContainer({
					value,
					id,
					name,
					type: 'text',
					ref,
					className,
					onBlur,
					onChange,
				})}
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
	onChange: PropTypes.any,
	value: PropTypes.any,
	className: PropTypes.any,
};
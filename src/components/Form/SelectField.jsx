import PropTypes from 'prop-types';
import { forwardRef } from "react";

import { ErrorMessage } from './ErrorMessage';

export const SelectField = forwardRef(
	(
		{
			value,
			id,
			name,
			label,
			error,
			onChange,
			className,
			options
		},
		ref) => {
		return (
			<>
				{label !== undefined ? (
					<label htmlFor={id} className='label'>
						<span className='label-text text-slate-200'>{label}</span>
						<ErrorMessage error={error} />
					</label>
				) : null}
				<select
					ref={ref}
					value={value}
					onChange={onChange}
					name={name}
					id={id}
					className={className}
				>
					{options.map(option => (
						<option disabled={option.default} value={option.value} key={option.value}>{option.key}</option>
					))}
				</select>
			</>
		);
	}
);


SelectField.displayName = "SelectField";
SelectField.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string,
	renderContainer: PropTypes.any,
	onBlur: PropTypes.any,
	onChange: PropTypes.any,
	value: PropTypes.any,
	className: PropTypes.any,
	options: PropTypes.any,
};
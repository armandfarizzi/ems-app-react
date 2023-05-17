import clsx from "clsx";
import PropType from "prop-types";
import { forwardRef } from "react";

const Table = forwardRef(({className, ...props}, ref) => {
	return (
		<div className="w-full overflow-auto">
			<table
				ref={ref}
				className={clsx("table w-full", className)}
				{...props}
			/>
		</div>
	);
});
Table.propTypes = {
	className: PropType.string,
	data: PropType.array,
};
Table.displayName = "Table";

const TableHeader = forwardRef(({ className, ...props }, ref) => (
	<thead ref={ref} className={clsx(className)} {...props} />
));
TableHeader.displayName = "TableHeader";
TableHeader.propTypes = {
	className: PropType.string,
};

const TableBody = forwardRef(({ className, ...props }, ref) => (
	<tbody
		ref={ref}
		className={clsx(className)}
		{...props}
	/>
));
TableBody.displayName = "TableBody";
TableBody.propTypes = {
	className: PropType.string,
};


export {
	Table,
	TableBody,
	TableHeader
};
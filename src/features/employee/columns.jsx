import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import PropType from "prop-types";
import { useSelector } from "react-redux";

import { getDepartmentById } from "@/features/department/departmentSlice";

import EmployeeExpandCell from "./EmployeeExpandCell";

function ArrowIcon({column}) {
	return (
		column.getIsSorted() === "desc" ?
			<ArrowDown className="ml-2 h-4 w-4" /> :
			column.getIsSorted() === "asc" ?
				<ArrowUp className="ml-2 h-4 w-4"/> :
				<ArrowUpDown className="ml-2 h-4 w-4"/>
	);
}
ArrowIcon.propTypes = {
	column: PropType.any,
};

/**
 * @typedef {import('@tanstack/react-table').ColumnDef[]}
 */
export const columns = [
	{
		accessorKey: "id",
		cell: null,
		header: null,
	},
	{
		accessorKey: "name",
		header: ({column}) =>
			<div
				className="flex"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				<span>name</span>
				<ArrowIcon column={column}/>
			</div>,
		expandCell: EmployeeExpandCell,
		cell: ({row}) => {
			return <div {...{
				onClick: () => {row.toggleExpanded();},
				style: { cursor: 'pointer' },
				className: "font-medium"
			}}>
				{row.getIsExpanded() ?
					<ChevronUp  className="inline"/> :
					<ChevronDown  className="inline"/>}
				{row.getValue("name")}
			</div>;
		}
	},
	{
		accessorKey: "email",
		header: ({column}) => <div
			className="flex"
			onClick={() => {
				console.log(column.getIsSorted());
				return column.toggleSorting(column.getIsSorted() === "asc");
			}}
		>
			<span>email</span>
			<ArrowIcon column={column}/>
		</div>,
		cell: ({row}) => {
			return <div className="font-medium">{row.getValue("email")}</div>;
		}
	},
	{
		accessorKey: "role",
		header: () => <div>Role</div>,
		cell: ({row}) => {
			const role = row.getValue("role");
			const normalized = role.split("_").join(" ").toLowerCase();
			return <div className="font-medium">{normalized}</div>;
		}
	},
	{
		accessorKey: "department_id",
		header: () => <div>Department</div>,
		cell: ({row}) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const department = useSelector(getDepartmentById(row.getValue("department_id")));
			return <div className="font-medium">{department.department_name}</div>;
		}
	}
];
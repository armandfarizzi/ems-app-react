import { useSelector } from "react-redux";

import { getDepartmentById } from "@/features/department/departmentSlice";

export const columns = [
	{
		accessorKey: "name",
		header: () => <div>Name</div>,
		cell: ({row}) => {
			return <div className="font-medium">{row.getValue("name")}</div>;
		}
	},
	{
		accessorKey: "email",
		header: () => <div>Email</div>,
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
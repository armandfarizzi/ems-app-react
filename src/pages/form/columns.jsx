export const columns = [
	{
		accessorKey: "name",
		header: () => <div className="text-left">Name</div>,
		cell: ({row}) => {
			return <div className="font-medium text-center">{row.getValue("name")}</div>;
		}
	},
	{
		accessorKey: "email",
		header: () => <div className="text-left">Email</div>,
		cell: ({row}) => {
			return <div className="text-center font-medium">{row.getValue("email")}</div>;
		}
	},
	{
		accessorKey: "role",
		header: () => <div className="text-left">Role</div>,
		cell: ({row}) => {
			return <div className="text-center font-medium">{row.getValue("role")}</div>;
		}
	},
	{
		accessorKey: "department",
		header: () => <div className="text-left">Department</div>,
		cell: ({row}) => {
			return <div className="text-center font-medium">{row.getValue("department")}</div>;
		}
	}
];
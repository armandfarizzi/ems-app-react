import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

import { DataTable } from "@/components/Table/DataTable";
import { getSelectedDepartmentId } from "@/features/department/departmentSlice";

import { columns } from "./columns";
import EmployeeTableTabs from "./EmployeeTableTabs";

function EmployeeTable() {
	const data = useLoaderData();
	const filterDepartmentId = useSelector(getSelectedDepartmentId);
	return (
		<DataTable
			className="table-zebra"
			columns={columns}
			data={data}
			tabs={<EmployeeTableTabs/>}
			tabColumnFilter={"department_id"}
			tabSelected={filterDepartmentId}
		/>
	);
}

export default EmployeeTable;
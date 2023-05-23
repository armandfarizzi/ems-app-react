import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "@/components/Table/DataTable";
import { getSelectedDepartmentId } from "@/features/department/departmentSlice";
import { openModal } from "@/features/modal/modalSlice";
import { EMPLOYEE_ADD_MODAL } from "@/features/modal/modalType";

import { columns } from "./columns";
import { fetchEmployees, getEmployeesListing, getIsLoadingEmployee } from "./employeeSlice";
import EmployeeTableTabs from "./EmployeeTableTabs";

function EmployeeTable() {
	const dispatch = useDispatch();
	const filterDepartmentId = useSelector(getSelectedDepartmentId);
	const isLoading = useSelector(getIsLoadingEmployee);
	const data = useSelector(getEmployeesListing);
	
	useEffect(() => {
		dispatch(fetchEmployees());
	}, []);
	return (
		<>
			<div className="w-full text-left">
				<button
					onClick={() =>
						dispatch(openModal(EMPLOYEE_ADD_MODAL))
					}
					className="btn-sm btn self-end"
				>Add</button>
			</div>
			<DataTable
				initialSort={[{id:"name", desc:false}]}
				className="table-zebra"
				columns={columns}
				isLoading={isLoading}
				data={data}
				tabs={<EmployeeTableTabs/>}
				tabColumnFilter={"department_id"}
				tabSelected={filterDepartmentId}
			/>
		</>
	);
}

export default EmployeeTable;
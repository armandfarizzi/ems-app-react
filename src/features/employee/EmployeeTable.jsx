import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

import { DataTable } from "@/components/Table/DataTable";
import { getSelectedDepartmentId } from "@/features/department/departmentSlice";
import { openModal } from "@/features/modal/modalSlice";
import { EMPLOYEE_ADD_MODAL } from "@/features/modal/modalType";

import { columns } from "./columns";
import EmployeeTableTabs from "./EmployeeTableTabs";

function EmployeeTable() {
	const data = useLoaderData();
	const dispatch = useDispatch();
	const filterDepartmentId = useSelector(getSelectedDepartmentId);
	return (
		<>
			<div className="w-full text-left">
				<button
					onClick={() => dispatch(openModal(EMPLOYEE_ADD_MODAL))}
					className="btn-dark btn-sm btn self-end"
				>Add</button>
			</div>
			<DataTable
				className="table-zebra"
				columns={columns}
				data={data}
				tabs={<EmployeeTableTabs/>}
				tabColumnFilter={"department_id"}
				tabSelected={filterDepartmentId}
			/>
		</>
	);
}

export default EmployeeTable;
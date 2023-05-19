import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";

import { getAllDepartment, getSelectedDepartmentId, selectDepartmentById, unselectDepartmentById } from "@/features/department/departmentSlice";

function EmployeeTableTabs() {
	const dispatch = useDispatch();
	const allDepartment = useSelector(getAllDepartment);
	const filterDepartmentId = useSelector(getSelectedDepartmentId);

	return (
		<div className="tabs">
			<a
				onClick={() => dispatch(unselectDepartmentById())}
				className={clsx("tab-bordered tab", {"tab-active": filterDepartmentId === ""})}
			>
				All
			</a>
			{
				allDepartment
					.map(
						dep =>{
							return (
								<a
									onClick={() =>  dispatch(selectDepartmentById(dep.id))}
									className={clsx("tab-bordered tab", {"tab-active": filterDepartmentId === dep.id})}
									key={dep.id}>
									{dep.department_name}
								</a>
							);
						}
					)
			}
		</div>
	);
}

export default EmployeeTableTabs;
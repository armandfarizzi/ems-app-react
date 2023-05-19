import clsx from "clsx";
import { useSelector } from "react-redux";

import EmployeeAddModal from "@/features/employee/EmployeeAddModal";
import { getModalOpenState, getModalType } from "@/features/modal/modalSlice";
import { EMPLOYEE_ADD_MODAL } from "@/features/modal/modalType";

const modalSet = {
	[EMPLOYEE_ADD_MODAL] : <EmployeeAddModal/>
};

function Modal () {
	const modalType = useSelector(getModalType);
	const isOpen = useSelector(getModalOpenState);
	return <div className={clsx({"hidden": !isOpen}, "fixed inset-x-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 backdrop-blur md:inset-0")}>
		<div className="relative top-1/2 mx-auto max-h-full min-h-[50%] w-full max-w-2xl -translate-y-1/2 rounded-md border border-slate-700 bg-slate-500 shadow">
			{modalSet[modalType]}
		</div>
	</div>;
}

export default Modal;
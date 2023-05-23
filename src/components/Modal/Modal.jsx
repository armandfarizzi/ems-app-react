import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmployeeAddModal from "@/features/employee/EmployeeAddModal";
import { closeModal, getModalOpenState, getModalType } from "@/features/modal/modalSlice";
import { EMPLOYEE_ADD_MODAL } from "@/features/modal/modalType";

const modalSet = {
	[EMPLOYEE_ADD_MODAL] : <EmployeeAddModal/>
};

function Modal () {
	const modalType = useSelector(getModalType);
	const dispatch = useDispatch();
	const isOpen = useSelector(getModalOpenState);

	useEffect(() => {
		const escFunction = (event) => {
			if (event.key === "Escape") {
				dispatch(closeModal());
			}
		};
		if(isOpen) {
			document.addEventListener("keydown", escFunction, false);
		} else {
			document.removeEventListener("keydown", escFunction, false);
		}
		return () => void document.removeEventListener("keydown", escFunction, false);
	}, [isOpen]);
	return <div className={clsx({"hidden": !isOpen}, "fixed inset-x-0 top-0 z-50 max-h-full w-full overflow-y-auto overflow-x-hidden p-4 backdrop-blur md:inset-0")}>
		<div className="relative top-1/2 mx-auto max-h-full w-full -translate-y-1/2 rounded-md border border-slate-700 bg-slate-500 shadow sm:max-w-[425px]">
			{modalSet[modalType]}
		</div>
	</div>;
}

export default Modal;
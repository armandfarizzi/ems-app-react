import { useDispatch } from "react-redux";

import { closeModal } from "../modal/modalSlice";

function EmployeeAddModal() {
	const dispatch = useDispatch();
	return (
		<div className="text-white">
			Modal here! &nbsp;
			<span
				onClick={() => dispatch(closeModal())}
				className="underline hover:text-slate-200">
				close
			</span>
		</div>
	);
}

export default EmployeeAddModal;
import clsx from "clsx";
import PropType from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SelectField } from "@/components/Form/SelectField";
import { TextField } from "@/components/Form/TextField";

import { getAllDepartment } from "../department/departmentSlice";
import { closeModal } from "../modal/modalSlice";
import { addEmployeeIndex, changeIndex, getCurrentIndex, getEmployeeForm, getErrorBag, getIsLoadingEmployee, getValueByIndex, resetEmployeeState, setAddEmployeeForm, submitAddEmployee } from "./employeeSlice";

function EmployeeIndexTab() {
	const dispatch = useDispatch();
	const allForm = useSelector(getEmployeeForm);
	const currentIndex = useSelector(getCurrentIndex);
	const errBag = useSelector(getErrorBag);
	const containErr = index =>  !!Object.keys(errBag).find(k => k.startsWith(`[${index}]`));
	const IndicateError = () => <span className="absolute right-0 top-1 inline-block h-2 w-2 rounded-full bg-slate-700"/>;

	return (
		<div className="tabs flex justify-end">
			{allForm.
				map((_, index) =>
					<a
						className={clsx(
							{"tab-bordered": currentIndex == index},
							"tab border-slate-300 text-slate-300")}
						key={index}
						onClick={() => dispatch(changeIndex(index))}
					>
						{containErr(index) && <IndicateError/>}
						{index+1}</a>)}
			<a
				onClick={() => dispatch(addEmployeeIndex())}
				className="tab text-slate-300 hover:bg-slate-400"
			>+</a>
		</div>
	);
}

function ErrorLabel({name}) {
	const errBag = useSelector(getErrorBag);
	const index= useSelector(getCurrentIndex);
	if(errBag[`[${index}].${name}`]) {
		return <span className="label-text-alt text-sm text-red-200">{errBag[`[${index}].${name}`]}</span>;
	}
	return <></>;
}

ErrorLabel.propTypes = {
	name: PropType.string,
	index: PropType.number,
};


function AddEmployeeField() {
	const allDepartment = useSelector(getAllDepartment);
	const dispatch = useDispatch();
	const currentIndex= useSelector(getCurrentIndex);
	const formValue = useSelector(getValueByIndex);
	const onInputChange = (event) => dispatch(setAddEmployeeForm({
		index: currentIndex,
		field: event.target.name,
		value: event.target.value
	}));
	const errBag = useSelector(getErrorBag);
	const ROLE_OPTIONS = [
		{
			default: true,
			value: "",
			key: "Select one"
		},
		{
			value: "DIRECTOR",
			key: "Director",
		},
		{
			value: "MANAGER",
			key: "Manager",
		},
		{
			value: "SENIOR_STAFF",
			key: "Senior Staff",
		},
		{
			value: "JUNIOR_STAFF",
			key: "Junior Staff",
		}
	];
	const DEPARTMENT_OPTIONS = [
		{
			default: true,
			value: "",
			key: "Select one"
		},
		...allDepartment.map(dep => ({
			value: dep.id,
			key: dep.department_name
		}))];
	return  (
		<>
			<div>
				<TextField
					id="name"
					value={formValue.name}
					onChange={onInputChange}
					name="name"
					label="Name"
					placeholder="Input name.."
					error={errBag[`[${currentIndex}].name`]}
					className="input input-sm col-span-3 flex w-full rounded-sm"
				/>
			</div>
			<div>
				<TextField
					id="email"
					value={formValue.email}
					onChange={onInputChange}
					name="email"
					label="Email"
					placeholder="Input email.."
					error={errBag[`[${currentIndex}].email`]}
					className="input input-sm col-span-3 flex w-full rounded-sm"
				/>
			</div>
			<div>
				<SelectField
					value={formValue.role}
					id="role"
					name="role"
					label="Role"
					options={ROLE_OPTIONS}
					className="select-bordered select select-sm col-span-3 flex w-full rounded-sm"
					onChange={onInputChange}
					error={errBag[`[${currentIndex}].role`]}
				/>
			</div>
			<div>
				<SelectField
					value={formValue.department_id}
					id="department"
					name="department_id"
					label="Department"
					options={DEPARTMENT_OPTIONS}
					className="select-bordered select select-sm col-span-3 flex w-full rounded-sm"
					onChange={onInputChange}
					error={errBag[`[${currentIndex}].department_id`]}
				/>
			</div>
		</>
	);
}

function EmployeeAddModal() {
	const isLoading = useSelector(getIsLoadingEmployee);
	const dispatch = useDispatch();
	useEffect(()=> {
		dispatch(resetEmployeeState());
	}, []);
	return (
		<div className="p-5 text-white">
			<form onSubmit={(e) => {
				e.preventDefault();
				dispatch(submitAddEmployee());
			}}>
				<div className="mb-1 text-left text-lg font-semibold leading-none">
					Add Employee
				</div>
				<p className="mb-2 text-left text-sm">Save employee to their corresponding department</p>
				<div className="h-[1px] w-full shrink-0 bg-slate-400" />
				<EmployeeIndexTab/>
				<div className="grid gap-1 pb-3">
					<AddEmployeeField/>
				</div>
				<div className="text-right">
					<span
						onClick={() => dispatch(resetEmployeeState())}
						className="btn-sm btn cursor-pointer text-slate-300">
						reset
					</span>
					<button
						disabled={isLoading}
						type="submit"
						className="btn-sm btn mx-3 cursor-pointer text-slate-300">
						Save
					</button>
					<span
						onClick={() => dispatch(closeModal())}
						className="cursor-pointer uppercase text-slate-300">
						close
					</span>
				</div>
			</form>
		</div>
	);
}

export default EmployeeAddModal;
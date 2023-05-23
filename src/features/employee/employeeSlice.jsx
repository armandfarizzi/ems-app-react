import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { mande } from "mande";

import { closeModal } from "../modal/modalSlice";
import { submitEmployeeSchema } from "./schema";

const initialState = {
	currentIndex: 0,
	isLoading: false,
	addEmployeeForm: [
		{
			name: "",
			email: "",
			role: "",
			department_id: ""
		}
	],
	emloyeeList: [],
	errorBag: {

	}
};

export const fetchEmployees = createAsyncThunk(
	'employee/fetchEmployees',
	async () => {
		return mande(
			"http://localhost:8081/api/v1/employees"
		).get();
	}
);

export const submitAddEmployee = createAsyncThunk(
	'employee/submitAddmployee',
	async (_, thunkAPI) => {
		const body = thunkAPI.getState().employee.addEmployeeForm;
		try {
			await submitEmployeeSchema.validate(body, {strict: true, abortEarly: false});
		} catch (err) {
			if (err.inner) {
				const errBag = {};
				err.inner.forEach(e => {
					errBag[e.path] = e.message;
				});
				return thunkAPI.rejectWithValue(errBag);
			}
		}
		const response = await mande(
			"http://localhost:8081/api/v1/employees/bulk").post(
			body,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		// close and refetch the table list
		thunkAPI.dispatch(closeModal());
		thunkAPI.dispatch(fetchEmployees());
		return response;
	}
);

export const employeeForm = createSlice({
	name: "employee",
	initialState,
	reducers: {
		changeIndex: (state, action) => {
			state.currentIndex = action.payload;
		},
		resetEmployeeState: (state) => ({
			...initialState,
			emloyeeList: state.emloyeeList,
		}),
		addEmployeeIndex: (state) => {
			state.addEmployeeForm.push({
				name: "",
				email: "",
				role: "",
				department_id: ""
			});
			state.currentIndex = current(state.addEmployeeForm).length - 1;
		},
		setAddEmployeeForm: (state, action) => {
			const payload = action.payload;
			state.addEmployeeForm[payload.index][payload.field] = payload.value;

			// delete the errorbag if user input the respective fields
			delete state.errorBag[`[${payload.index}].${payload.field}`];
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchEmployees.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(submitAddEmployee.rejected, (state, action) => {
			state.errorBag = action.payload;
		});
		builder.addCase(fetchEmployees.fulfilled, (state, action) => {
			state.emloyeeList = action.payload;
			state.isLoading = false;
		});
	}
});

export const getErrorBag = state => state.employee.errorBag;
export const getIsLoadingEmployee = state => state.employee.isLoading;
export const getEmployeesListing = state => state.employee.emloyeeList;
export const getEmployeeForm = state => state.employee.addEmployeeForm;
export const getCurrentIndex = state => state.employee.currentIndex;
export const getValueByIndex = state => state.employee.addEmployeeForm[state.employee.currentIndex];
export const { setAddEmployeeForm, resetEmployeeState, addEmployeeIndex, changeIndex } = employeeForm.actions;
export default employeeForm.reducer;
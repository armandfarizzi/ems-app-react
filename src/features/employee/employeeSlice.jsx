import { createAsyncThunk, current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getEmployeeList, getEmployeeReviews, postSubmitAddEmployee } from "@/utils/api";

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
	errorBag: { },
	employeeReviewLoading: {

	},
	employeeReview: {

	}
};

export const fetchEmployeeReview = createAsyncThunk(
	'employee/fetchEmployeeReview',
	async (employeeId, thunkAPI) => {
		thunkAPI.dispatch(resetEmployeeReviewById(employeeId));
		return await getEmployeeReviews(employeeId);
	}
);

function addBuilderForFetchEmployeeReview(builder) {
	builder.addCase(fetchEmployeeReview.pending, (state, action) => {
		state.employeeReviewLoading[action.meta.arg] = true;
	});
	builder.addCase(fetchEmployeeReview.fulfilled, (state, action) => {
		state.employeeReview[action.meta.arg] = action.payload;
		state.employeeReviewLoading[action.meta.arg] = false;
	});
}

export const fetchEmployees = createAsyncThunk(
	'employee/fetchEmployees',
	async () => {
		return await getEmployeeList();
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
		const response = await postSubmitAddEmployee(body);

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
		},
		resetEmployeeReviewById: (state, action) => {
			state.employeeReview[action.payload] = {};
		},
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

		addBuilderForFetchEmployeeReview(builder);
	}
});

export const getEmployeeReviewLoadingById = (employeeId) => {
	return (state) => state.employee.employeeReviewLoading[employeeId];
};
export const getEmployeeReviewById = (employeeId) => {
	return (state) => state.employee.employeeReview[employeeId];
};
export const getErrorBag = state => state.employee.errorBag;
export const getIsLoadingEmployee = state => state.employee.isLoading;
export const getEmployeesListing = state => state.employee.emloyeeList;
export const getEmployeeForm = state => state.employee.addEmployeeForm;
export const getCurrentIndex = state => state.employee.currentIndex;
export const getValueByIndex = state => state.employee.addEmployeeForm[state.employee.currentIndex];
export const { setAddEmployeeForm, resetEmployeeState, addEmployeeIndex, changeIndex, resetEmployeeReviewById } = employeeForm.actions;
export default employeeForm.reducer;
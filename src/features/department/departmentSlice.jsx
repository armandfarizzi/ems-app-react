import { current } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMinutes, formatISO, isAfter, parseISO } from 'date-fns';

import { getDepartment } from "@/utils/api";

const initialState = {
	isLoading: false,
	populatedAt: false,
	selectedDepartment: {},
	departmentList: []
};

export const forceFetchDepartment = createAsyncThunk(
	'department/forceFetchDepartment',
	async () => {
		return await getDepartment();
	}
);

export const fetchDepartment = createAsyncThunk(
	'department/fetchDepartment',
	async (arg, api) => {
		const state = api.getState();
		if (state.department.populatedAt) {
			const datePopulated = parseISO(state.department.populatedAt);
			const added = addMinutes(datePopulated, 5);
			if (isAfter(added, new Date())) {
				return state.department.departmentList;
			}
		}
		return await getDepartment();
	}
);

export const departmentList = createSlice({
	name: 'department',
	initialState,
	reducers: {
		unselectDepartmentById: (state) => {
			state.selectedDepartment = {};
		},
		selectDepartmentById: (state, action) => {
			const findDepartment = current(state.departmentList).filter(d => d.id == action.payload);
			if (findDepartment.length !== 0 ) {
				state.selectedDepartment = findDepartment[0];
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchDepartment.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchDepartment.fulfilled, (state, action) => {
			state.populatedAt = formatISO(new Date());
			state.departmentList = action.payload;
			state.isLoading = false;
		});
		builder.addCase(forceFetchDepartment.fulfilled, (state, action) => {
			state.populatedAt = formatISO(new Date());
			state.departmentList = action.payload;
		});
	}
});

export const getDepartmentLoading = state => state.department.isLoading;
export const getDepartmentById = (id) => {
	return (state) => {
		return state.department.departmentList.find(dep => dep.id == id);
	};
};
export const getAllDepartment = state => state.department.departmentList;
export const getSelectedDepartment = state => state.department.selectedDepartment;
export const getSelectedDepartmentId = state => {
	const dep = state.department.selectedDepartment;
	if(!dep.id) {
		return "";
	}
	return dep.id;
};

export const { selectDepartmentById, unselectDepartmentById } = departmentList.actions;
export default departmentList.reducer;
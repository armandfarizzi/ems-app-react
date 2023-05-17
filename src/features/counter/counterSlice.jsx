import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
	valueToChange: 1
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += state.valueToChange;
		},
		decrement: (state) => {
			state.value -= state.valueToChange;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
		incrementValueToChange: (state) => {
			state.valueToChange++;
		},
		resetValueToChange: (state) => {
			state.valueToChange = 1;
		}
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, incrementValueToChange, resetValueToChange } = counterSlice.actions;

export default counterSlice.reducer;
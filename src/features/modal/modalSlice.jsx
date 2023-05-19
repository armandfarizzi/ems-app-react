import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	open: false,
	type: null,
};

export const modalState = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, actions) => {
			state.open = true;
			state.type = actions.payload;
		},
		closeModal: (state) => {
			state.open = false;
			state.type = null;
		}
	}
});

export const getModalOpenState = state => state.modal.open;
export const getModalType = state => state.modal.type;
export const { openModal, closeModal } = modalState.actions;
export default modalState.reducer;
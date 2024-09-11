import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  color:'',
  message: '',
};

const AlertReducer = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.showAlert = !(state.showAlert);
      state.color = action.payload.color;
      state.message = action.payload.message;
    }
  },
});

export const { showAlert} = AlertReducer.actions;

export default AlertReducer.reducer;

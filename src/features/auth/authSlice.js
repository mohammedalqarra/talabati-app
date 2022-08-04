import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  IsLogged: false,
  IsMerchantLogged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;

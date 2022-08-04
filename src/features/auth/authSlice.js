import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  IsLogged: false,
  IsMerchantLogged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handlelogIn: (state) => {
      state.IsLogged = true;
    },
    handlelogOut: (state) => {
      state.IsLogged = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handlelogIn, handlelogOut } = authSlice.actions;

export default authSlice.reducer;

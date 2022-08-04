import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  IsLogged: false,
  IsMerchant: false,
  IsUser: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handlelogInUser: (state) => {
      state.IsLogged = true;
      state.IsUser = true;
    },

    handlelogInMerchant: (state) => {
      state.IsLogged = true;
      state.IsMerchant = true;
    },

    handlelogOut: (state) => {
      state.IsLogged = false;
      state.IsMerchant = false;
      state.IsUser = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handlelogInUser, handlelogInMerchant, handlelogOut } =
  authSlice.actions;

export default authSlice.reducer;

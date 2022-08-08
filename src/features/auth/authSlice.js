import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  IsLogged: false,
  IsMerchant: false,
  IsUser: false,
  Token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handlelogInUser: (state, action) => {
      state.IsLogged = true;
      state.IsUser = true;
      state.data = action.payload;
    },

    handlelogInMerchant: (state, action) => {
      state.IsLogged = true;
      state.IsMerchant = true;
      state.data = action.payload;
    },

    handlelogOut: (state) => {
      state.IsLogged = false;
      state.IsMerchant = false;
      state.IsUser = false;
      state.date = null;
    },
  },
});

export const { handlelogInUser, handlelogInMerchant, handlelogOut } =
  authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../dataSlice";

const initialState = {
  data: [],
  IsGuest: true,
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
      state.IsGuest = false;
      state.data = action.payload;
    },

    handlelogInMerchant: (state, action) => {
      state.IsLogged = true;
      state.IsMerchant = true;
      state.IsGuest = false;
      state.data = action.payload;
    },
    handlelogInGuest: (state, action) => {
      state.IsLogged = false;
      state.IsUser = false;
      state.IsGuest = true;
      state.data = action.payload;
    },

    handlelogOut: (state) => {
      state.IsLogged = false;
      state.IsMerchant = false;
      state.IsUser = false;
      state.IsGuest = false;
      state.date = null;
    },
  },
});

export const {
  handlelogInUser,
  handlelogInMerchant,
  handlelogInGuest,
  handlelogOut,
} = authSlice.actions;

export default authSlice.reducer;

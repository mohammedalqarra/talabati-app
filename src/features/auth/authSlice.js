import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api_url, login_api } from "../../utilites/ApiRequest";

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

export const { handlelogInUser, handlelogInMerchant, handlelogOut } =
  authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  name: "",
  mobile: "",
  email: "",
  id: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    storeData: (state, action) => {
      state.data = action.payload;
    },

    RemoveData: (state) => {
      state.date = null;
    },
    Ordering: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storeData, RemoveData, Ordering } = dataSlice.actions;

export default dataSlice.reducer;

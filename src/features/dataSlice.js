import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
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
  },
});

export const { storeData, RemoveData } = dataSlice.actions;

export default dataSlice.reducer;

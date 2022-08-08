import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import dataReducer from "./dataSlice";

export const store = configureStore({
  reducer: { auth: authReducer, data: dataReducer },
});

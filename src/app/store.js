import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studentsReducer from "../features/students/studentSlice";
import { baseApi } from "../services/api/baseApi";
import studentPaymentReducer from "../features/students/slices/StudentPaymentSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    studentPayment: studentPaymentReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
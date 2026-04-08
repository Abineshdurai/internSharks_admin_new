import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studentsReducer from "../features/students/studentSlice";
import { baseApi } from "../services/api/baseApi";
import studentPaymentReducer from "../features/students/slices/StudentPaymentSlice"
import recruiterReducer from "../features/recruiters/slices/recruiterSlice"
import recruiterPaymentReducer from "../features/recruiters/slices/recruiterPaymentSlice"
import internshipReducer from "../features/internships/slices/internshipSlice"
import aiReducer from "../features/ai/slice/aiSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    studentPayment: studentPaymentReducer,
    recruiters: recruiterReducer,
    recruiterPayment: recruiterPaymentReducer,
    internships: internshipReducer,
    ai: aiReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin_token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Auth", "Students", "StudentsPayment"],
  endpoints: () => ({}),
});
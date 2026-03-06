import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("admin_token") || "",
  adminName: localStorage.getItem("admin_name") || "",
  isLoggedIn: !!localStorage.getItem("admin_token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, adminName } = action.payload;

      state.token = token;
      state.adminName = adminName;
      state.isLoggedIn = true;

      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_name", adminName);
    },
    logout(state) {
      state.token = "";
      state.adminName = "";
      state.isLoggedIn = false;

      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_name");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
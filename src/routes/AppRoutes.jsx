import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import Adminlayout from "../layouts/AdminLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import StudentsPage from "../features/students/pages/StudentsPage";
import RecruiterPage from "../features/recruiters/pages/RecruiterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Adminlayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />}/>
          <Route path="/recruiters" element={<RecruiterPage />}/>
          

        </Route>

      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
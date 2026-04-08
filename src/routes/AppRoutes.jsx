import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import Adminlayout from "../layouts/AdminLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import StudentsPage from "../features/students/pages/StudentsPage";
import RecruiterPage from "../features/recruiters/pages/RecruiterPage";
import StudentPaymentPage from "../features/students/pages/StudentPaymentPage";
import RecruiterPaymentPage from "../features/recruiters/pages/RecruiterPaymentPage";
import InternshipPage from "../features/internships/pages/InternshipPage";
import ApplicationPage from "../features/applications/pages/ApplicationPage";
import AIPages from "../features/ai/pages/AIPages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Adminlayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />}/>
          <Route path="/students/payment" element={<StudentPaymentPage />}/>
          <Route path="/recruiters" element={<RecruiterPage />}/>
          <Route path="/recruiters/payment" element={<RecruiterPaymentPage />}/>
          <Route path="/internships" element={<InternshipPage />}/>
          <Route path="/applications" element={<ApplicationPage />}/>
          <Route path="/aiSuccessRate" element={<AIPages />}/>

        </Route>

      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
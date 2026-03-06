import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoute() {
    const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
    const location = useLocation();

    if(!isLoggedIn) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <Outlet/>;
}
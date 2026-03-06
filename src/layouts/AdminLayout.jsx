import { useMemo, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "./AdminLayout.css"
import { Outlet, useLocation } from "react-router-dom";
import { adminMenus } from "../config/adminMenus";

export default function Adminlayout() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const pageTitle = useMemo(() => {
        const path = location.pathname;

        const exact = adminMenus.find((m) => m.to === path);
        if (exact) return exact.title;

        const prefix = adminMenus.find((m) => path === m.to || path.startsWith(m.to + "/"));
        if(prefix) return prefix.title;

        return "Admin Panel";
    }, [location.pathname]);

    return(
        <div className="admin-shell">
            <Sidebar isOpen={open} onClose={() => setOpen(false)}/>
            <div className="admin-main">
                <header className="admin-topbar">
                    <button 
                    className="admin-menu-btn"
                    type="button"
                    onClick={() => setOpen(true)}>
                        ☰
                    </button>
                    <div className="admin-topbar-title"> {pageTitle}</div>
                </header>
                <main className="admin-content">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}
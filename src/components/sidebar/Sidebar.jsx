import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import "./Sidebar.css";
import internSharksLogo from "../../assets/images/internSharksLogo.svg"
// import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboardIcon.svg"
// import { ReactComponent as StudentsIcon } from "../../assets/icons/studentsIcon.svg"
// import { ReactComponent as RecruiterIcon } from "../../assets/icons/recruiterIcon.svg"
// import { ReactComponent as InternshipIcon } from "../../assets/icons/internshipIcon.svg"
// import { ReactComponent as ApplicationsIcon } from "../../assets/icons/applicationsIcon.svg"
// import { ReactComponent as AiSuccessRateIcon } from "../../assets/icons/aiSuccessRateIcon.svg"
import { IoCloseSharp } from "react-icons/io5";
import { adminMenus } from "../../config/adminMenus";

// const links = [
//     { to: "/dashboard", label: "Dashboard", title: "Welcome Back", Icon: DashboardIcon },
//     { to: "/students", label: "Students", title: "Students Management", Icon: StudentsIcon },
//     { to: "/recruiters", label: "Recruiters", title: "Recruiters Management", Icon: RecruiterIcon },
//     { to: "/internships", label: "Internships", title: "Internship Management", Icon: InternshipIcon },
//     { to: "/applications", label: "Applications", title: "Applications Management", Icon: ApplicationsIcon },
//     { to: "/aiSuccessRate", label: "AI-Success Rate", title: "AI-Success Rate Details", Icon: AiSuccessRateIcon },
// ]

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };


    return (
        <>
            {/* overlay only for mobile */}
            <div className={`sb-overlay ${isOpen ? "show" : ""}`} onClick={onClose} />

            <aside className={`sb ${isOpen ? "open" : ""}`}>
                <div className="sb-head">
                    <div className="sb-brand">
                        {/* <div className="sb-logo"></div> */}

                        <div>
                            <img src={internSharksLogo} alt="InternSharks" className="sb-logo-img" />
                            {/* <div className="sb-title">InternSharks</div> */}
                            <div className="sb-sub">Admin Panel</div>
                        </div>
                    </div>

                    <button className="sb-close" onClick={onClose} type="button">
                        <IoCloseSharp />
                    </button>
                </div>

                <nav className="sb-nav">
                    {adminMenus.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `sb-link ${isActive ? "active" : ""}`}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="sb-iconBox">
                                        <link.Icon
                                            className={`sb-link-icon ${isActive ? "active-icon" : ""}`}
                                        />
                                    </span>
                                    <span className={isActive ? "sb-label-active" : "sb-label"}>
                                        {link.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="sb-foot">
                    <button className="sb-logout" onClick={onLogout} type="button">
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
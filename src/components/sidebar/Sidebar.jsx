import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import "./Sidebar.css";
import internSharksLogo from "../../assets/images/internSharksLogo.svg";
import { IoCloseSharp } from "react-icons/io5";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { adminMenus } from "../../config/adminMenus";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const toggleMenu = (label) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  const isChildActive = (children = []) => {
    return children.some(
      (child) =>
        location.pathname === child.to ||
        location.pathname.startsWith(child.to + "/")
    );
  };

  useEffect(() => {
    const activeParent = adminMenus.find(
      (menu) => menu.children && isChildActive(menu.children)
    );

    if (activeParent) {
      setOpenMenu(activeParent.label);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sb-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`sb ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sb-head">
          <div className="sb-brand">
            <div>
              <img
                src={internSharksLogo}
                alt="InternSharks"
                className="sb-logo-img"
              />
              <div className="sb-sub">Admin Panel</div>
            </div>
          </div>

          <button className="sb-close" onClick={onClose} type="button">
            <IoCloseSharp />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sb-nav">
          {adminMenus.map((menu) => {
            /* ---------- MENU WITH SUBMENU ---------- */
            if (menu.children) {
              const expanded = openMenu === menu.label;
              const parentActive = isChildActive(menu.children);

              return (
                <div key={menu.label} className="sb-menu-group">
                  {/* Parent button */}
                  <button
                    type="button"
                    className={`sb-link sb-parent-btn ${
                      parentActive ? "active" : ""
                    }`}
                    onClick={() => toggleMenu(menu.label)}
                  >
                    <span className="sb-iconBox">
                      <menu.Icon className="sb-link-icon" />
                    </span>

                    <span
                      className={
                        parentActive ? "sb-label-active" : "sb-label"
                      }
                    >
                      {menu.label}
                    </span>

                    <span className="sb-arrow">
                      {expanded ? <FiChevronDown /> : <FiChevronRight />}
                    </span>
                  </button>

                  {/* Submenu */}
                  {expanded && (
                    <div className="sb-submenu">
                      {menu.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          end
                          onClick={onClose}
                          className={({ isActive }) =>
                            `sb-sublink ${isActive ? "active" : ""}`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* ---------- NORMAL MENU ---------- */
            return (
              <NavLink
                key={menu.to}
                to={menu.to}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `sb-link ${isActive ? "active" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="sb-iconBox">
                      <menu.Icon
                        className={`sb-link-icon ${
                          isActive ? "active-icon" : ""
                        }`}
                      />
                    </span>

                    <span
                      className={
                        isActive ? "sb-label-active" : "sb-label"
                      }
                    >
                      {menu.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sb-foot">
          <button
            className="sb-logout"
            onClick={onLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
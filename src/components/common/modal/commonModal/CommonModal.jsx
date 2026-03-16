import { IoCloseSharp } from "react-icons/io5";
import "./CommonModal.css";

export default function CommonModal({
  open,
  title = "",
  subtitle = "",
  children,
  onClose,
  width = "1100px",
}) {
  if (!open) return null;

  return (
    <div className="cm-overlay" onClick={onClose}>
      <div
        className="cm-modal"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cm-header">
          <div>
            <h2 className="cm-title">{title}</h2>
            {subtitle ? <p className="cm-subtitle">{subtitle}</p> : null}
          </div>

          <button type="button" className="cm-close" onClick={onClose}>
            <IoCloseSharp />
          </button>
        </div>

        <div className="cm-body">{children}</div>
      </div>
    </div>
  );
}
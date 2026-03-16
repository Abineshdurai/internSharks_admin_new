import "./InfoCard.css";

export default function InfoCard({
  title,
  children,
  full = false,
  className = "",
}) {
  return (
    <div className={`info-card ${full ? "info-card-full" : ""} ${className}`}>
      {title ? <h3 className="info-card-title">{title}</h3> : null}
      {children}
    </div>
  );
}
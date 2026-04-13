import React, { useMemo, useState } from "react";
import "./LineChart.css";

function normalizePercent(value) {
  const num = Number(value);
  if (Number.isNaN(num) || num < 0) return 0;
  if (num > 100) return 100;
  return num;
}

export default function LineChart({
  title,
  subtitle,
  success,
  failure,
  successCount,
  failureCount,
  totalMatches,
  defaultView,
  onViewChange,
}) {
  const [activeView, setActiveView] = useState(defaultView);

  const successValue = normalizePercent(success);

  const failureValue = useMemo(() => {
    if (failure !== undefined && failure !== null) {
      return normalizePercent(failure);
    }
    return normalizePercent(100 - successValue);
  }, [failure, successValue]);

  const handleViewChange = (view) => {
    setActiveView(view);
    if (typeof onViewChange === "function") {
      onViewChange(view);
    }
  };

  return (
    <div className="line-chart-card">
      <div className="line-chart-card__header">
        <div>
          <h3 className="line-chart-card__title">{title}</h3>
          <p className="line-chart-card__subtitle">{subtitle}</p>
        </div>

        {/* <div className="line-chart-card__toggle">
          <button
            type="button"
            className={`line-chart-card__toggle-btn ${
              activeView === "week" ? "active" : ""
            }`}
            onClick={() => handleViewChange("week")}
          >
            Week
          </button>

          <button
            type="button"
            className={`line-chart-card__toggle-btn ${
              activeView === "month" ? "active" : ""
            }`}
            onClick={() => handleViewChange("month")}
          >
            Month
          </button>
        </div> */}
      </div>

      <div className="line-chart-card__metrics">
        <div className="line-chart-card__metric-row">
          <div className="line-chart-card__metric-head">
            <div className="line-chart-card__label-wrap">
              <span className="line-chart-card__dot line-chart-card__dot--success" />
              <span className="line-chart-card__label">Success</span>
            </div>
            <span className="line-chart-card__percent line-chart-card__percent--success">
              {successValue}%
            </span>
          </div>

          <div className="line-chart-card__progress">
            <div
              className="line-chart-card__progress-fill line-chart-card__progress-fill--success"
              style={{ width: `${successValue}%` }}
            />
          </div>
        </div>

        <div className="line-chart-card__metric-row">
          <div className="line-chart-card__metric-head">
            <div className="line-chart-card__label-wrap">
              <span className="line-chart-card__dot line-chart-card__dot--failure" />
              <span className="line-chart-card__label">Failure</span>
            </div>
            <span className="line-chart-card__percent line-chart-card__percent--failure">
              {failureValue}%
            </span>
          </div>

          <div className="line-chart-card__progress">
            <div
              className="line-chart-card__progress-fill line-chart-card__progress-fill--failure"
              style={{ width: `${failureValue}%` }}
            />
          </div>
        </div>
      </div>

      <div className="line-chart-card__footer">
        <div className="line-chart-card__footer-item">
          <div className="line-chart-card__footer-label">SUCCESS COUNT</div>
          <div className="line-chart-card__score-row">
            <span className="line-chart-card__score_success">{successCount}</span>
            {/* <span className="line-chart-card__badge">{failureCount}</span> */}
          </div>
        </div>

        <div className="line-chart-card__divider" />
        <div className="line-chart-card__footer-item">
          <div className="line-chart-card__footer-label">FAILURE COUNT</div>
          <div className="line-chart-card__score-row">
            <span className="line-chart-card__score_failure">{failureCount}</span>
            {/* <span className="line-chart-card__badge">{failureCount}</span> */}
          </div>
        </div>
        <div className="line-chart-card__divider" />

        <div className="line-chart-card__footer-item">
          <div className="line-chart-card__footer-label">TOTAL COUNT</div>
          <div className="line-chart-card__score_total">
            {totalMatches}
          </div>
        </div>
      </div>
    </div>
  );
}
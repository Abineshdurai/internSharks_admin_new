import React, { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const SuccessRateChart = ({ data = [], apiname }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const formatDate = (dateString, type = "short") => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (type === "short") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map((item) => ({
      ...item,
      rate: parseFloat(item.successRate) || 0,
      displayDate: formatDate(item.date),
      fullDate: formatDate(item.date, "full"),
    }));
  }, [data]);

  const width = 1000;
  const height = 250;
  const paddingX = 40;
  const paddingY = 40;

  const points = useMemo(() => {
    if (chartData.length === 0) return [];
    const xStep = (width - paddingX * 2) / (chartData.length - 1);
    const yScale = (height - paddingY * 2) / 100;

    return chartData.map((d, i) => ({
      x: paddingX + i * xStep,
      y: height - paddingY - d.rate * yScale,
      rate: d.rate,
    }));
  }, [chartData, width, height]);

  const pathData = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, p, i) => {
      return acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`);
    }, "");
  }, [points]);

  const areaData = useMemo(() => {
    if (points.length === 0) return "";
    const first = points[0];
    const last = points[points.length - 1];
    const bottom = height - paddingY;
    return `${pathData} L ${last.x} ${bottom} L ${first.x} ${bottom} Z`;
  }, [pathData, points, height]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-title-group">
          <h3 className="chart-title">Success Rate Trends</h3>
          {/* <p className="chart-subtitle">
            Average percentage over the last 30 days
          </p> */}
        </div>
        <div className="chart-controls">
          {/* <div className="compare-dropdown">
            <span className="compare-label">COMPARE AI MODELS:</span>
            <div className="dropdown-box">
              <span>ResDP</span>
              <FiChevronDown />
            </div>
          </div> */}
          <div className="chart-legend">
            <span className="legend-dot"></span>
            <span className="legend-text">{apiname}</span>
          </div>
        </div>
      </div>

      <div className="chart-visual">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines (simplified) */}
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />

          {/* Area under the line */}
          <path d={areaData} fill="url(#areaGradient)" />

          {/* The main trend line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <g
              key={i}
              className="chart-point-group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#10b981"
                className="chart-point"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="10"
                fill="#10b981"
                fillOpacity={hoveredIndex === i ? "0.3" : "0"}
                className="chart-point-hover"
              />

              {/* Tooltip */}
              {hoveredIndex === i && (
                <foreignObject
                  x={p.x - 65}
                  y={p.y - 110}
                  width="130"
                  height="100"
                  className="chart-tooltip-wrapper"
                >
                  <div className="chart-tooltip">
                    <div className="tooltip-header">
                      <span className="tooltip-rate">{p.rate}%</span>
                      <span className="tooltip-date">
                        {chartData[i].displayDate}
                      </span>
                    </div>
                    <div className="tooltip-body">
                      <div className="tooltip-row">
                        <span>Total:</span>
                        <span>{chartData[i].total}</span>
                      </div>
                      <div className="tooltip-row success">
                        <span>Success:</span>
                        <span>{chartData[i].success}</span>
                      </div>
                      <div className="tooltip-row failure">
                        <span>Failed:</span>
                        <span>{chartData[i].total - chartData[i].success}</span>
                      </div>
                    </div>
                  </div>
                </foreignObject>
              )}
            </g>
          ))}
        </svg>

        <div className="chart-xaxis">
          {chartData.length > 0 && (
            <>
              <span>{chartData[0].displayDate}</span>
              {chartData.length > 2 && (
                <span>
                  {chartData[Math.floor(chartData.length / 2)].displayDate}
                </span>
              )}
              <span>{chartData[chartData.length - 1].displayDate}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessRateChart;

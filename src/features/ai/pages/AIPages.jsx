import { useDispatch, useSelector } from "react-redux";
import HStack from "../../../components/common/HStack";
import { Button } from "react-bootstrap";
import { FiDownload, FiEye } from "react-icons/fi";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import DataTable from "../../../components/common/table/DataTable";
import { useGetAiResultsQuery } from "../../../services/api/endPoints/aiResult.endpoints";
import { useMemo, useEffect, useState } from "react";
import { setCurrentPage, setSearchText, setApiname } from "../slice/aiSlice";
import "./AIPages.css";
import SuccessRateChart from "../components/SuccessRateChart";
import { useOutletContext } from "react-router-dom";
import { createPortal } from "react-dom";

export default function AIPages() {
  const dispatch = useDispatch();
  const { searchText, currentPage, pageSize, apiname } = useSelector(
    (state) => state.ai,
  );

  const [headerNode, setHeaderNode] = useState(null);

  useEffect(() => {
    setHeaderNode(document.getElementById("admin-header-actions"));
  }, []);

  const { data, isLoading, isError, error } = useGetAiResultsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchText,
    apiname: apiname,
  });
  const aiSuccessRates = useMemo(() => {
    const rawAiSuccessRate = data?.data || [];
    return rawAiSuccessRate.map((aiSuccessRate) => ({
      id: aiSuccessRate._id,
      apiName: aiSuccessRate.apiname,
      successCount: data?.successCount,
      failedCount: data?.failureCount,
      successRate: data?.successRate,
      totalRequests: data?.totalRequests,
      success: aiSuccessRate.status,
      reason: aiSuccessRate.reason,
      createdAt: aiSuccessRate.createdAt
        ? new Date(aiSuccessRate.createdAt).toLocaleString()
        : "N/A",
      // totalSuccess: aiSuccessRate.totalsuccess,
      // totalFailed: aiSuccessRate.totalfailed,
      raw: aiSuccessRate,
    }));
  }, [data]);

  const pagination = {
    current: data?.currentPage || 1,
    pageSize: data?.limit || 10,
    total:
      data?.totalCount ||
      (data?.totalPages ? data.totalPages * (data?.limit || 10) : 0),
  };

  const STATUS_STYLES = {
    // PENDING: "status-pending",
    FAILED: "status-failed",
    SUCCESS: "status-success",
  };

  const columns = [
    { key: "apiName", title: "API Name", width: "1.5fr", align: "center" },
    {
      key: "success",
      title: "Status",
      width: "1fr",
      align: "center",
      render: (_, row) => {
        let status = String(row.success).toUpperCase();
        // Handle boolean-like values
        if (status === "TRUE") status = "SUCCESS";
        if (status === "FALSE") status = "FAILED";

        const className = `status-badge ${STATUS_STYLES[status] || ""}`;
        return <span className={className}>{status || "UNKNOWN"}</span>;
      },
    },
    { key: "reason", title: "Reason", width: "2.5fr", align: "center" },
    { key: "createdAt", title: "Created At", width: "1.5fr", align: "center" },
  ];

  const handleView = (record) => {
    console.log(record);
  };
  return (
    <div className="page-container">
      {headerNode &&
        createPortal(
          <div className="header-actions-container" style={{ position: "relative", display: "inline-block" }}>
            <select
              className="form-select custom-header-select"
              value={apiname || ""}
              onChange={(e) => dispatch(setApiname(e.target.value))}
              style={{
                padding: "6px 32px 6px 12px",
                borderRadius: "6px",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
                appearance: "none",
                WebkitAppearance: "none",
                cursor: "pointer"
              }}
            >
              <option value="">All</option>
              <option value="analyze-resume">Analyze Resume</option>
              <option value="extract-resume">Extract Resume</option>
              <option value="generate-banner">Generate Banner</option>
              <option value="verify-kyc">Verify KYC</option>
              <option value="enhance-resume">Enhance Resume</option>
              <option value="generate-syllabus">Generate Syllabus</option>
              <option value="watermark-remove">Watermark Remove</option>
              <option value="mcq-score">MCQ Score</option>
            </select>
            <div style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--color-text-secondary)", display: "flex" }}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>,
          headerNode,
        )}
      <div className="stats-row pb-3">
        <div className="metric-card metric-card--neutral">
          <div className="metric-card__top">
            <span className="metric-card__title">Total API Logs</span>
            <div className="metric-card__icon metric-card__icon--neutral">
              📊
            </div>
          </div>

          <div className="metric-card__value">{data?.totalRequests}</div>

          {/* <div className="metric-card__footer"> */}
          {/* <span className="metric-card__trend metric-card__trend--info">
              —0%
            </span> */}
          {/* <span className="metric-card__subtext">from last 24h</span> */}
          {/* </div> */}
        </div>

        <div className="metric-card metric-card--success">
          <div className="metric-card__top">
            <span className="metric-card__title">Success Count</span>
            <div className="metric-card__icon metric-card__icon--success">
              ✓
            </div>
          </div>

          <div className="metric-card__value metric-card__value--success">
            {data?.successCount}
          </div>

          <div className="metric-card__footer">
            <span className="metric-card__trend metric-card__trend--success">
              ↗ {data?.successRate}%
            </span>
            <span className="metric-card__subtext">Total Success Rate</span>
          </div>
        </div>

        <div className="metric-card metric-card--error">
          <div className="metric-card__top">
            <span className="metric-card__title">Failed Count</span>
            <div className="metric-card__icon metric-card__icon--error">!</div>
          </div>

          <div className="metric-card__value metric-card__value--error">
            {data?.failureCount}
          </div>

          <div className="metric-card__footer">
            <span className="metric-card__trend metric-card__trend--error">
              ↘ {data?.failureRate}%
            </span>
            <span className="metric-card__subtext">Total Failure Rate</span>
          </div>
        </div>
      </div>

      <SuccessRateChart data={data?.graphData || []} apiname={apiname} />

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          {/* <p>Loading Recruiter Payment...</p> */}
        </div>
      )}
      {isError && (
        <div className="error-container">
          {error?.data?.message || "Failed to fetch AI results"}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <DataTable
            columns={columns}
            data={aiSuccessRates}
            rowKey="id"
            currentPage={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total || 0}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
            // onPageSizeChange={(size) => dispatch(setPageSize(size))}
          />
        </>
      )}
    </div>
  );
}

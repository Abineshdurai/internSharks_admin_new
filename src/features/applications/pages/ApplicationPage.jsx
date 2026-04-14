import { Button } from "react-bootstrap";
import HStack from "../../../components/common/HStack";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { FiDownload, FiEye, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import DataTable from "../../../components/common/table/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { useGetApplicationsQuery } from "../../../services/api/endPoints/application.endpoints";
import { setCurrentPage, setStatus, setSearchText } from "../slice/applicationSlice";

export default function ApplicationPage() {
  const dispatch = useDispatch();
  const { currentPage, pageSize, status, searchText } = useSelector(
    (state) => state.application,
  );
  const [headerNode, setHeaderNode] = useState(null);
  useEffect(() => {
    setHeaderNode(document.getElementById("admin-header-actions"));
  });

  const { data, isLoading, isError, error } = useGetApplicationsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchText,
    status: status,
  });

 const applications = useMemo(() => {
  const rawApplications = data?.data?.applications ?? [];

  return rawApplications.map((application) => {
    const job = application?.job ?? {};
    const student = application?.student ?? {};

    return {
      id: application?._id ?? "N/A",
      jobRole: job.jobrole ?? "N/A",
      name: student.studname ?? "N/A",
      email: student.studemail ?? "N/A",
      phone: student.studmobileno ?? "N/A",
      company: job.companyname ?? "N/A",
      currentDay: application?.currentDay ?? "N/A",
      status: application?.status ?? "N/A",
      raw: application,
    };
  });
}, [data]);



  const pagination = {
    current: data?.currentPage ?? data?.data?.pagination?.current ?? 1,
    pageSize: data?.limit ?? data?.data?.pagination?.pageSize ?? 10,
    total: data?.totalCount ?? data?.totalRecords ?? data?.data?.pagination?.total ?? data?.data?.totalCount ?? 0,
  };

  const STATUS_STYLES = {
    PENDING: "status-pending",
    SELECTED: "status-success",
    REJECTED: "status-failed",
    FAILED: "status-failed",
    SUCCESS: "status-success",
  };

  const columns = [
    { key: "jobRole", title: "Job Role", width: "1.5fr", align: "center" },
    { key: "name", title: "Name", width: "1.5fr", align: "center" },
    { key: "email", title: "Email", width: "1.5fr", align: "center" },
    { key: "phone", title: "Phone", width: "1.5fr", align: "center" },
    { key: "company", title: "Company", width: "1.5fr", align: "center" },
    {
      key: "currentDay",
      title: "Current Day",
      width: "1.5fr",
      align: "center",
    },
    {
      key: "status",
      title: "Status",
      width: "1.5fr",
      align: "center",
      render: (_, row) => {
        let status = String(row.status || "").toUpperCase();
        // Handle boolean-like values
        if (status === "TRUE") status = "SUCCESS";
        if (status === "FALSE") status = "FAILED";

        const className = `status-badge ${STATUS_STYLES[status] || ""}`;
        return <span className={className}>{status || "UNKNOWN"}</span>;
      },
    },
    {
      key: "actions",
      title: "Actions",
      width: "1.5fr",
      align: "center",
      render: (_, row) => {
        const currentStatus = String(row.status || "").toUpperCase();

        if (currentStatus === "SELECTED" || currentStatus === "REJECTED") {
          return <div className="student-actions pl-6">-</div>;
        }

        if (currentStatus === "APPLIED" || currentStatus === "PENDING") {
          return (
            <div className="student-actions pl-6">
              <button
                className="action-btn"
                title="Accept"
                type="button"
                style={{ color: "green", fontSize: "1.2rem", padding: "4px" }}
              >
                <FiCheck />
              </button>
              <button
                className="action-btn delete-btn"
                title="Reject"
                type="button"
                style={{ color: "red", fontSize: "1.2rem", padding: "4px" }}
              >
                <FiX />
              </button>
            </div>
          );
        }

        return (
          <div className="student-actions pl-6">
            <button
              className="action-btn view-btn"
              title="View"
              type="button"
            >
              <FiEye />
            </button>
            <button
              className="action-btn delete-btn"
              title="Delete"
              type="button"
            >
              <FiTrash2 />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="page-container">
      {headerNode &&
        createPortal(
          <div
            className="header-actions-container"
            style={{ position: "relative", display: "inline-block" }}
          >
            <select
              className="form-select custom-header-select"
              value={status || ""}
              onChange={(e) => dispatch(setStatus(e.target.value))}
              style={{
                padding: "6px 32px 6px 12px",
                borderRadius: "6px",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
                appearance: "none",
                WebkitAppearance: "none",
                cursor: "pointer",
              }}
            >
              <option value="">All</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="generate-banner">Generate Banner</option>
              {/* <option value="verify-kyc">Verify KYC</option>
                              <option value="enhance-resume">Enhance Resume</option>
                              <option value="generate-syllabus">Generate Syllabus</option>
                              <option value="watermark-remove">Watermark Remove</option>
                              <option value="mcq-score">MCQ Score</option> */}
            </select>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--color-text-secondary)",
                display: "flex",
              }}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>,
          headerNode,
        )}
      <div className="students-header">
        <h2>Applications</h2>
        <HStack gap={10}>
          <SearchBar
            value={searchText}
            onChange={(value) => dispatch(setSearchText(value))}
            placeholder="Search application..."
          />
          <Button className="btn export-btn">
            <FiDownload className="btn-icon" />
            Export CSV
          </Button>
        </HStack>
      </div>

      {isLoading && <div className="students-state">Loading students...</div>}
      {isError && (
        <div className="students-state error">
          {error?.data?.message || "Failed to fetch students"}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <DataTable
            columns={columns}
            data={applications}
            rowKey="key"
            currentPage={currentPage}
            pageSize={pageSize}
            total={pagination.total}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </div>
  );
}

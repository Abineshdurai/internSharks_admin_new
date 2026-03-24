import { Button } from "react-bootstrap";
import HStack from "../../../components/common/HStack";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import "../../../style/Button.css"
import { useDispatch, useSelector } from "react-redux";
import { useGetStudentsPaymentsQuery } from "../../../services/api/endPoints/student.payment.endpoints";
import { useMemo } from "react";
import DataTable from "../../../components/common/table/DataTable";
import { setCurrentPage, setPageSize, setSearchText } from "../slices/StudentPaymentSlice";
import downloadIcon from "../../../assets/icons/downloadIcon.svg";
import "./StudentPaymentPage.css";

export default function StudentPaymentPage() {
    const dispatch = useDispatch();
    const { searchText, currentPage, pageSize } = useSelector(
        (state) => state.studentPayment ?? {
            searchText: "",
            currentPage: 1,
            pageSize: 10,
        }
    );

    const { data, isLoading, isError, error } = useGetStudentsPaymentsQuery({
            page: currentPage,
            limit: pageSize,
            search: searchText,
        });

        const studentsPayments = useMemo(() => {
          const rawStudentsPayment = data?.payment ?? [];
        //   console.log("students payment query data:", data);
        //   console.log("students payment list:", data?.data?.studentsPayment);

          return rawStudentsPayment.map((studentsPayment) => ({
            key: studentsPayment?._id ?? "",
            orderId: studentsPayment?.orderId ?? "-",
            studentName: studentsPayment?.studentId?.studname ?? "-",
            studentEmail: studentsPayment?.studentId?.studemail ?? "-",
            studentMobile: studentsPayment?.studentId?.studmobileno ?? "-",
            creditId: studentsPayment?.creditId ?? "-",
            creditBalance:
              studentsPayment?.studentId?.studentCreditId?.balance ?? "-",
            amount:
              studentsPayment?.amount != null
                ? `${studentsPayment.amount} ${studentsPayment?.currency ?? ""}`.trim()
                : "-",
            status: studentsPayment?.status ?? "-",
            date: studentsPayment?.createdAt
              ? new Date(studentsPayment.createdAt).toLocaleString()
              : "-",
          }));
        }, [data]);

        const pagination = {
          current: data?.currentPage ?? 1,
          pageSize: data?.limit ?? 10,
          total: data?.totalRecords ?? 0,
        };
        const STATUS_STYLES = {
            PENDING: "status-pending",
            FAILED: "status-failed",
            SUCCESS: "status-success",
        };

        const columns = [
          { key: "orderId", title: "Order ID", width: "1fr" },
          { key: "studentName", title: "Student Name", width: "1fr" },
          //   { key: "studentEmail", title: "Email", width: "1.4fr" },
          //   { key: "studentMobile", title: "Mobile", width: "1fr" },
          { key: "creditBalance", title: "Credit Balance", width: "1fr" },
          { key: "amount", title: "Amount", width: "1fr" },
          {
            key: "status",
            title: "Status",
            width: "1fr",
            render: (_, row) => {
              const status = row.status?.toUpperCase();

              const className = `status-badge ${STATUS_STYLES[status] || ""}`;

              return <span className={className}>{status}</span>;
            },
          },
          { key: "date", title: "Created At", width: "1.2fr" },
          {
            key: "actions",
            title: "Invoice",
            width: "0.8fr",
            render: (_, row) => (
              <div className="student-actions">
                {/* <Button className="btn export-btn">
                  <FiDownload className="btn-icon" />
                </Button> */}
                <button className="btn delete-btn">
                  <img src={downloadIcon} alt="Download" className="btn-icon" />
                </button>
              </div>
            ),
          },
        ];

    return (
        <div className="page-container">
            <div className="students-header">
                <h2>
                    Students Payment
                </h2>
                <HStack gap={10} >
                    <SearchBar
                        value={searchText}
                        onChange={(value) => dispatch(setSearchText(value))}
                        placeholder="Search student..."
                    />
                    <Button className="btn export-btn">
                        <FiDownload className="btn-icon" />
                        Export CSV
                    </Button>
                </HStack>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : isError ? (
                <div className="error-container">
                    <p>Error fetching students: {error?.message}</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={studentsPayments}
                    rowKey="key"
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={pagination.total}
                    onPageChange={(page) => dispatch(setCurrentPage(page))}
                    // onPageSizeChange={(pageSize) => dispatch(setPageSize(pageSize))}
                />
            )}
        </div >
    )
};
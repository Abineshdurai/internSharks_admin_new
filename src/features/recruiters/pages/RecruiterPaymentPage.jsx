import { useDispatch, useSelector } from "react-redux"
import { useGetRecruiterPaymentsQuery } from "../../../services/api/endPoints/recruiter.payment.endpoints";
import { useMemo } from "react";
import { render } from "@testing-library/react";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import HStack from "../../../components/common/HStack";
import { Button } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import { setCurrentPage, setSearchText } from "../slices/recruiterPaymentSlice";
import DataTable from "../../../components/common/table/DataTable";
import downloadIcon from "../../../assets/icons/downloadIcon.svg";

export default function RecruiterPaymentPage() {
    const dispatch = useDispatch();
    const { searchText, currentPage, pageSize } = useSelector(
        (state) => state.recruiterPayment ?? {
            searchText: "",
            currentPage: 1,
            pageSize: 10,
        }
    );
    const { data, isLoading, isError, error } = useGetRecruiterPaymentsQuery({
        page: currentPage,
        limit: pageSize,
        search: searchText,
    });

    const recruiterPayments = useMemo(() => {
        const rawStudentsPayment = data?.data?.payment || data?.payment || [];
        return rawStudentsPayment.map((payment) => ({
            id: payment?._id ?? "--",
            orderId: payment?.orderId ?? "--",
            name: payment?.recruiterId?.recname ?? "--",
            email: payment?.recruiterId?.recemail ?? "--",
            mobile: payment?.recruiterId?.recmobileno ?? "--",
            amount: payment?.amount ?? "--",
            paymentStatus: payment?.status ?? "--",
            creditBalance: payment?.recruiterId?.recruiterCreditId?.balance ?? "--",
            paymentId: payment?.paymentId ?? "--",
            paymentDate: payment?.paidAt ? new Date(payment?.paidAt).toLocaleString() : "--",
            // status: "Active",
            // raw: payment,
        }));
    }, [data]);

    const pagination = {
        current: data?.currentPage ?? 1,
        pageSize: data?.limit ?? 10,
        total: data?.totalRecords ?? data?.pagination?.total ?? data?.total ?? 0,
    }
    const STATUS_STYLES = {
        PENDING: "status-pending",
        FAILED: "status-failed",
        SUCCESS: "status-success",
    }

    const columns = [
        { key: "orderId", title: "Order ID", width: "1.5fr" },
        { key: "name", title: "Name", width: "1fr" },
        // { key: "email", title: "Email", width: "1.5fr" },
        // { key: "mobile", title: "Mobile", width: "1.5fr" },
        { key: "amount", title: "Amount", width: "1.3fr" },
        { key: "paymentStatus", title: "Payment Status", width: "1.2fr",
            render: (_, row) => {
                const status = row.paymentStatus?.toUpperCase();
                const className = `status-badge ${STATUS_STYLES[status] || ""}`;
                return <span className={className}>{status}</span>;
            }
         },
        { key: "creditBalance", title: "Credit Balance", width: "1fr" },
        { key: "paymentId", title: "Payment ID", width: "1.5fr" },
        { key: "paymentDate", title: "Payment Date", width: "1.5fr" },
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
        <div>
            <div className="page-container">
      <div className="students-header">
        <h2>Recruiters Payment</h2>
        <HStack gap={10}>
          <SearchBar
            value={searchText}
            onChange={(value) => dispatch(setSearchText(value))}
            placeholder="Search recruiter.."
          />
          <Button className="btn export-btn">
            <FiDownload className="btn-icon" />
            Export CSV
          </Button>
        </HStack>
      </div>

      {isLoading && <div className="loading-container">
        <div className="spinner"></div>
        {/* <p>Loading Recruiter Payment...</p> */}
        </div>}
      {isError && (
        <div className="error-container">
          {error?.data?.message || "Failed to fetch Recruiter Payment"}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <DataTable
            columns={columns}
            data={recruiterPayments}
            rowKey="key"
            currentPage={currentPage}
            pageSize={pageSize}
            total={pagination.total || 0}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
            // onPageSizeChange={(size) => dispatch(setPageSize(size))}
          />
        </>
      )}
    </div>
        </div>
    )
}
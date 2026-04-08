import { useDispatch, useSelector } from "react-redux";
import HStack from "../../../components/common/HStack";
import { Button } from "react-bootstrap";
import { FiDownload, FiEye } from "react-icons/fi";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import DataTable from "../../../components/common/table/DataTable";
import { useGetAiResultsQuery } from "../../../services/api/endPoints/aiResult.endpoints";
import { useMemo } from "react";
import { setCurrentPage, setSearchText } from "../slice/aiSlice";

export default function AIPages() {

    const dispatch = useDispatch();
    const { searchText, currentPage, pageSize, apiname} = useSelector((state) => state.ai);

    const { data, isLoading, isError, error } = useGetAiResultsQuery({
        page: currentPage,
        limit: pageSize,
        search: searchText,
        filter: apiname,
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
        total: data?.totalCount || (data?.totalPages ? data.totalPages * (data?.limit || 10) : 0),
    }

    const STATUS_STYLES = {
            // PENDING: "status-pending",
            FAILED: "status-failed",
            SUCCESS: "status-success",
        };

    const columns = [
        { key: "apiName", title: "API Name", width: "1.5fr", align: "center"},
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
            }
        },
        { key: "reason", title: "Reason", width: "2.5fr", align: "center"},
        { key: "createdAt", title: "Created At", width: "1.5fr", align: "center"},
    ];

    const handleView = (record) => {
        console.log(record);
    }
    return (
        <div className="page-container">
            <div className="students-header">
                <h2>AI Pages</h2>
                <HStack gap={10}>
                    <SearchBar
                        value={searchText}
                        onChange={(value) => dispatch(setSearchText(value))}
                        placeholder="Search API Name..."
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
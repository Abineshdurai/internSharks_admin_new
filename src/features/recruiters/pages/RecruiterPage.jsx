import { useMemo, useState } from "react";
import {
  useGetRecruiterByIdMutation,
  useGetRecruitersQuery,
} from "../../../services/api/endPoints/recruiter.endpoints";
import DataTable from "../../../components/common/table/DataTable";
import { useNavigate } from "react-router-dom";
import HStack from "../../../components/common/HStack";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPageSize,
  setSearchText,
} from "../slices/recruiterSlice";
import { FiDownload, FiEye } from "react-icons/fi";
import RRecruiterDetailsPopup from "../components/RRecruiterDetailsPopup";

export default function RecruiterPage() {
  const dispatch = useDispatch();
  const [getRecruiterById] = useGetRecruiterByIdMutation();
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const { searchText, currentPage, pageSize } = useSelector(
    (state) => state.recruiters,
  );

  const { data, isLoading, isError, error } = useGetRecruitersQuery({
    page: currentPage,
    limit: pageSize,
    search: searchText,
  });

  const recruiters = useMemo(() => {
    const rawRecruiters = data?.recruiters || data?.data?.recruiters || [];

    return rawRecruiters.map((recruiter) => ({
      key: recruiter._id,
      // id: recruiter._id.slice(-6).toUpperCase(),
      name: recruiter.recname,
      email: recruiter.recemail,
      mobile: recruiter.recmobileno,
      company: recruiter.reccompanyname,
      companySize: recruiter.reccompanysize,
      location: recruiter.reccompanyaddress,
      // degree: recruiter.college?.[0]
      //     ? `${recruiter.college[0].degree || "Not Mention"} - ${recruiter.college[0].end_year || "Not Mention"}`
      //     : recruiter.studentdegree || "Not Mention",
      status: "Active",
      raw: recruiter,
    }));
  }, [data]);

  const pagination = {
    current: data?.pagination?.currentPage || 1,
    pageSize: data?.pagination?.pageSize || 10,
    total: data?.pagination?.total || 0,
  };

  const columns = [
    { key: "name", title: "Name", width: "1fr" },
    { key: "mobile", title: "Mobile", width: "1fr" },
    { key: "email", title: "Email", width: "1.5fr" },
    { key: "company", title: "Company", width: "1.5fr" },
    { key: "location", title: "Location", width: "1.5fr" },
    { key: "status", title: "Status", width: "1fr" },
    {
      key: "actions",
      title: "Actions",
      width: "1fr",
      render: (_, row) => (
        <div className="student-actions">
          <button
            className="action-btn view-btn"
            onClick={() => handleView(row)}
            title="View"
            type="button"
          >
            <FiEye />
          </button>
        </div>
      ),
    },
  ];

  const handleView = async (recruiter) => {
    try {
      setLoadingProfile(true);
      const res = await getRecruiterById(recruiter.key).unwrap();
      setSelectedRecruiter(res);
      setOpenPopUp(true);
      console.log("View recruiter:", res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProfile(false);
    }
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="page-container">
      <div className="students-header">
        <h2>All Recruiters</h2>
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

      {isLoading && <div className="students-state">Loading Recruiter...</div>}
      {isError && (
        <div className="students-state error">
          {error?.data?.message || "Failed to fetch recruiters"}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <DataTable
            columns={columns}
            data={recruiters}
            rowKey="key"
            currentPage={currentPage}
            pageSize={pageSize}
            total={pagination.total || 0}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
            onPageSizeChange={(size) => dispatch(setPageSize(size))}
          />
          {openPopUp && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-start overflow-y-auto py-10 px-4">
              <div className="w-full max-w-7xl mt-10">
                <RRecruiterDetailsPopup
                  recruiter={selectedRecruiter}
                  onClose={() => {
                    setOpenPopUp(false);
                    setSelectedRecruiter(null);
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

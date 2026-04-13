import { useDispatch, useSelector } from "react-redux";
import { useGetInternshipsQuery } from "../../../services/api/endPoints/internship.endpoints";
import HStack from "../../../components/common/HStack";
import { Button } from "react-bootstrap";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { setCurrentPage, setSearchText } from "../slices/internshipSlice";
import DataTable from "../../../components/common/table/DataTable";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { FiDownload, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

export default function InternshipPage() {
  const dispatch = useDispatch();
  const { searchText, currentPage, pageSize } = useSelector(
    (state) => state.internships,
  );

  const { data, isLoading, isError, error } = useGetInternshipsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchText,
  });

  const internships = useMemo(() => {
    const rawInternships = data?.data?.jobs ?? [];
    return rawInternships.map((internship) => ({
      id: internship?._id ?? "",
      internshipTitle: internship?.roletype ?? "",
      companyName: internship?.companyname ?? "",
      location: internship?.companystate + "," + internship?.companycity ?? "",
      internshipDuration : internship?.internshipduration ?? "Not Mention",
      stipend : internship?.internshipstipend ?? "",
    //   status: internship?.status ?? "",
      postedAt: internship?.createdAt
        ? new Date(internship.createdAt).toLocaleString()
        : "",
    }));
  }, [data]);

  const pagination = {
    current: data?.data?.pagination?.current ?? 1,
    pageSize: data?.data?.pagination?.pageSize ?? 1,
    total: data?.data?.pagination?.total ?? 0,
    // itemsPerPage: data?.data?.pagination?.itemsPerPage ?? 10,
  }

  const columns = [
    {
      key: "internshipTitle",
      title: "Internship Title",
      width: "1.5fr",
      align: "center",
    },
    {
      key: "companyName",
      title: "Company Name",
      width: "1.5fr",
      align: "center",
    },
    { key: "location", title: "Location", width: "1.5fr", align: "center" },
    {
      key: "internshipDuration",
      title: "Internship Duration",
      width: "1.5fr",
      align: "center",
    },
    { key: "stipend", title: "Stipend", width: "1fr", align: "center" },
    { key: "postedAt", title: "Posted At", width: "1.5fr", align: "center" },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      render: (_, row) => (
        // <HStack gap={8} justify="center">
        //   <Button
        //     variant="outline"
        //     size="sm"
        //     onClick={() => handleView(row.id)}
        //     className="action-btn"
        //     style={{color: "grey"}}
        //     hover={{color: "white"}}
        //   >
        //     <Eye size={16} />
        //   </Button>
        //   <Button
        //     variant="outline"
        //     size="sm"
        //     onClick={() => handleEdit(row.id)}
        //     className="action-btn"
        //     style={{color: "blue"}}
        //     hover={{color: "white"}}
        //   >
        //     <Pencil size={16} />
        //   </Button>
        //   <Button
        //     variant="outline"
        //     size="sm"
        //     onClick={() => handleDelete(row.id)}
        //     className="action-btn"
        //     style={{color: "red"}}
        //     hover={{color: "white"}}
        //   >
        //     <Trash2 size={16} />
        //   </Button>
        // </HStack>
        <div className="student-actions pl-6">
          <button
            className="action-btn view-btn"
            onClick={() => handleView(row)}
            // onClick={ <StudentDetailsPopup/>}
            title="View"
            type="button"
          >
            <FiEye />
          </button>

          {/* <button
                              className="action-btn edit-btn"
                              onClick={() => handleEdit(row)}
                              title="Edit"
                              type="button"
                          >
                              <FiEdit />
                          </button> */}

          <button
            className="action-btn delete-btn"
            onClick={() => handleDelete(row)}
            title="Delete"
            type="button"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  const handleView = (id) => {
    console.log("View internship:", id);
  }

  const handleEdit = (id) => {
    console.log("Edit internship:", id);
  }

  const handleDelete = (id) => {
    console.log("Delete internship:", id);
  }

  return (

        <div className="page-container">
            <div className="students-header">
                <h2>Internships</h2>
                <HStack gap={10}>
                    <SearchBar
                        value={searchText}
                        onChange={(value) => dispatch(setSearchText(value))}
                        placeholder="Search internship..."
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
                        data={internships}
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

  );
}

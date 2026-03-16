import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiTrash2, FiSearch, FiDownload } from "react-icons/fi";
import DataTable from "../../../components/common/table/DataTable";
import {
    setSearchText,
    setCurrentPage,
    setSelectedStudent,
} from "../studentSlice";
import {
    useDeleteStudentMutation,
    useGetStudentByIdMutation,
    useGetStudentsQuery,
} from "../../../services/api/endPoints/student.endpoints";
import "./StudentsPage.css";
import HStack from "../../../components/common/HStack";
import SearchBar from "../../../components/common/searchBar/SearchBar";
import { Button } from "react-bootstrap";
import "../../../style/Button.css"
import StudentDetailsPopup from "../components/StudentDetailsPopup";

export default function StudentsPage() {
    const dispatch = useDispatch();
    const [getStudentById] = useGetStudentByIdMutation();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openPopUp, setOpenPopUp] = useState(false);
    const { searchText, currentPage, pageSize } = useSelector(
        (state) => state.students
    );

    const { data, isLoading, isError, error } = useGetStudentsQuery({
        page: currentPage,
        limit: pageSize,
        search: searchText,
    });

    const [deleteStudent] = useDeleteStudentMutation();

    const students = useMemo(() => {
        const rawStudents = data?.data?.students || [];

        return rawStudents.map((student) => ({
            key: student._id,
            id: student._id.slice(-6).toUpperCase(),
            name: student.studname,
            email: student.studemail,
            phone: student.studmobileno,
            college: student.studentcollegename,
            // degree: student.studentdegree,
            degree: student.college?.[0]
                ? `${student.college[0].degree || "Not Mention"} - ${student.college[0].end_year || "Not Mention"}`
                : student.studentdegree || "Not Mention",
            // passedOut: student.college.end_year,
            // skills:
            //     typeof student.studprogramminglang === "string"
            //         ? student.studprogramminglang.split(",").map((s) => s.trim())
            //         : Array.isArray(student.studprogramminglang)
            //             ? student.studprogramminglang
            //             : [],
            status: "Active",
            raw: student,
        }));
    }, [data]);

    const pagination = data?.data?.pagination || {
        current: 1,
        pageSize: 10,
        total: 0,
    };

    const handleView = async (student) => {
        // dispatch(setSelectedStudent(student.key));
        // console.log("View student:", student.key);
        try{
            const res = await getStudentById(student.key).unwrap();
            setSelectedStudent(res);
            setOpenPopUp(true);
            console.log("View student:", res);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (student) => {
        const ok = window.confirm(`Delete ${student.name}?`);
        if (!ok) return;

        try {
            await deleteStudent(student.raw._id).unwrap();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const columns = [
        // { key: "id", title: "ID", width: "0.8fr" },
        { key: "name", title: "Student Name", width: "1.4fr" },
        { key: "email", title: "Email", width: "1.8fr" },
        { key: "phone", title: "Phone", width: "1.2fr" },
        { key: "college", title: "College", width: "1.5fr" },
        // {
        //     key: "skills",
        //     title: "Skills",
        //     width: "2fr",
        //     render: (skills) => (
        //         <div className="skills-wrap">
        //             {skills?.length ? (
        //                 skills.map((skill, index) => (
        //                     <span
        //                         key={`${skill}-${index}`}
        //                         className={`skill-chip skill-chip-${(index % 5) + 1}`}
        //                     >
        //                         {skill}
        //                     </span>
        //                 ))
        //             ) : (
        //                 <span>-</span>
        //             )}
        //         </div>
        //     ),
        // },
        { key: "degree", title: "Degree", width: "2fr" },
        {
            key: "actions",
            title: "Actions",
            width: "1fr",
            render: (_, row) => (
                <div className="student-actions">
                    <button
                        className="action-btn view-btn"
                        onClick={() => handleView(row)}
                        // onClick={ <StudentDetailsPopup/>}
                        title="View"
                        type="button"
                    >
                        <FiEye />
                    </button>

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

    return (
        <div className="page-container">
            <div className="students-header">
                <h2>
                    All Students
                </h2>
                <HStack gap={10} >

                    <SearchBar
                        value={searchText}
                        onChange={(value) => dispatch(setSearchText(value))}
                        placeholder="Search student.."
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
                        data={students}
                        rowKey="key"
                        currentPage={currentPage}
                        pageSize={pageSize}
                        total={pagination.total}
                        onPageChange={(page) => dispatch(setCurrentPage(page))}
                    />

                    <StudentDetailsPopup 
                    open={openPopUp}
                    student={selectedStudent}
                    onClose={() => setOpenPopUp(false)}
                    />
                </>
            )}
        </div>
    );
} 
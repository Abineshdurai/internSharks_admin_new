import { useEffect } from "react";
import CommonModal from "../../../components/common/modal/commonModal/CommonModal";
import InfoCard from "../../../components/common/modal/infoCard/InfoCard";
import "../../../components/common/modal/infoCard/InfoGrid.css";
import { useGetStudentByIdMutation } from "../../../services/api/endPoints/student.endpoints";

export default function StudentDetailsPopup({ open, student, onClose }) {
  
  // useEffect(() => {
  //   if(open && studentId) {
  //     grtStudentById
  //   }
  // });
  if (!student) return null;

  const college = student.education?.college?.[0] || student.college?.[0];
  const skills = Array.isArray(student.studprogramminglang)
    ? student.studprogramminglang
    : [];

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="Student Details"
      subtitle="Full student profile"
    >
      <div className="modal-grid">
        <InfoCard title="Personal Details">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{student.studname || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{student.studemail || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{student.studmobileno || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Verified</span>
              <span className="info-value">{student.isVerified ? "Yes" : "No"}</span>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Education">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Degree</span>
              <span className="info-value">{college?.degree || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Department</span>
              <span className="info-value">{college?.department || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Start Year</span>
              <span className="info-value">{college?.start_year || "-"}</span>
            </div>

            <div className="info-item">
              <span className="info-label">End Year</span>
              <span className="info-value">{college?.end_year || "-"}</span>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Skills" full>
          <div className="info-value">
            {skills.length ? skills.join(", ") : "No skills available"}
          </div>
        </InfoCard>
      </div>
    </CommonModal>
  );
}
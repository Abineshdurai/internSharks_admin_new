export const NormalizeStudentProfile = (student) => {
    if (!student) {
        return null;
    }

    const college = student?.education?.college?.[0] || student?.college?.[0] | {};
    const higherSecondary = student?.education?.school?.higher_secondary || student?.higher_secondary?.[0] || {};
    const secondary = student?.education?.school?.secondary || student?.secondary?.[0] || {};
    const skills = Array.isArray(student?.studprogramminglang)
        ? student.studprogramminglang.filter(Boolean)
        : typeof student?.studprogramminglang === "string"
            ? student.studprogramminglang.split(",").map((s) => s.trim()).filter(Boolean)
            : [];

    const profileCompletion = (() => {
        const fields = [
            student?.studprofile,
            student?.studname,
            student?.studemail,
            student?.studmobileno,
            college?.degree || student?.studentdegree,
            skills.length > 0,
            Array.isArray(student?.projects) && student.projects.length > 0,
            Array.isArray(student?.internships) && student.internships.length > 0,
            student?.linkedIn,
            student?.studentresume,
        ];

        const completed = fields.filter(Boolean).length;
        return Math.round((completed / fields.length) * 100);
    })();

    return {
        id: student?._id || "N/A",
        name: student?.studname || "Unnamed Student",
        email: student?.studemail || "N/A",
        phone: student?.studmobileno ? `+91 ${student.studmobileno}` : "N/A",
        profileImage: student?.studprofile || "",
        banner: student?.student_banner || "",
        verified: !!student?.isVerified,

        degree: student?.studentdegree || college?.degree || "N/A",
        fieldOfStudy: student?.studentfieldofstudy || college?.department || "",
        collegeName: student?.studentcollegename || "N/A",
        location: student?.studcollegelocation || "Tamil Nadu, India",

        linkedin: student?.linkedIn || "",
        resume: student?.studentresume || null,

        skills,
        interests: Array.isArray(student?.areas_of_interest) ? student.areas_of_interest : [],
        hobbies: Array.isArray(student?.hobbies) ? student.hobbies : [],
        languagesKnown: Array.isArray(student?.languages_known) ? student.languages_known : [],

        projects: Array.isArray(student?.projects) ? student.projects : [],
        internships: Array.isArray(student?.internships) ? student.internships : [],
        experience: Array.isArray(student?.experience) ? student.experience : [],
        certificates: Array.isArray(student?.studentcertificate) ? student.studentcertificate : [],

        aadhar: Array.isArray(student?.studentAdhar) ? student.studentAdhar : [],
        studentIdDocs: Array.isArray(student?.studentId) ? student.studentId : [],

        education: {
            college: Array.isArray(student?.education?.college)
                ? student.education.college
                : Array.isArray(student?.college)
                    ? student.college
                    : [],
            higherSecondary,
            secondary,
        },

        credits: {
            balance: student?.studentCreditId?.balance ?? 0,
            used: student?.studentCreditId?.totalUsed ?? 0,
        },

        stats: {
            profileCompletion,
            totalApplications: student?.applicationstatus?.total ?? 0,
            assessmentScore: student?.applicationstatus?.assessmentScore ?? 0,
        },
    };
}
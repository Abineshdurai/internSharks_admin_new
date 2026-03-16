import { ReactComponent as DashboardIcon } from "../assets/icons/dashboardIcon.svg"
import { ReactComponent as StudentsIcon } from "../assets/icons/studentsIcon.svg"
import { ReactComponent as RecruiterIcon } from "../assets/icons/recruiterIcon.svg"
import { ReactComponent as InternshipIcon } from "../assets/icons/internshipIcon.svg"
import { ReactComponent as ApplicationsIcon } from "../assets/icons/applicationsIcon.svg"
import { ReactComponent as AiSuccessRateIcon } from "../assets/icons/aiSuccessRateIcon.svg"



export const adminMenus = [
    { to: "/dashboard", label: "Dashboard", title: "Welcome Back", Icon: DashboardIcon },
    {
        label: "Students", title: "Students Management", Icon: StudentsIcon, children: [
            {
                to: "/students", label: "Students List",
            },
            {
                to: "/students/payment", label: "Payment",
            }
        ]
    },
    {
        label: "Recruiters", title: "Recruiters Management", Icon: RecruiterIcon, children: [
            {
                to: "/recruiters", label: "Recruiters List",
            },
            {
                to: "/recruiters/payment", label: "Payment",
            }
        ]
    },
    { to: "/internships", label: "Internships", title: "Internship Management", Icon: InternshipIcon },
    { to: "/applications", label: "Applications", title: "Applications Management", Icon: ApplicationsIcon },
    { to: "/aiSuccessRate", label: "AI-Success Rate", title: "AI-Success Rate Details", Icon: AiSuccessRateIcon },
];
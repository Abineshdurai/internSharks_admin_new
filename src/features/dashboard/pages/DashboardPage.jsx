import { useDispatch } from "react-redux";
import { useGetDashboardDataQuery } from "../../../services/api/endPoints/dashboard.endpoints";
import { useEffect, useMemo } from "react";
import { FiUsers } from "react-icons/fi";
import recruiterIcon from "../../../assets/icons/totalRecruitersIcon.svg";
import activeJobsIcon from "../../../assets/icons/activeJobsIcon.svg";
import totalApplicationsIcon from "../../../assets/icons/totalApplicationsIcon.svg";
import LineChart from "../../../components/lineChart/LineChart";
import DataTable from "../../../components/common/table/DataTable";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetDashboardDataQuery();
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  const dashboard = useMemo(() => {
    if (!data) return {};

    // Handle both cases: if data.data is an object with stats, or directly the stats object
    const stats = data?.data || data?.data || data;

    // If it happens to be an array, take the first element
    const source = Array.isArray(stats) ? stats[0] : stats;

    return {
      totalStudents: source?.stats?.totalStudents || 0,
      totalRecruiters: source?.stats?.totalRecruiters || 0,
      totalJobs: source?.stats?.totalJobs || 0,
      totalApplications: source?.stats?.totalApplications || 0,
      totalSuccessCount: source?.stats?.successcount || 0,
      totalFailedCount: source?.stats?.failurecount || 0,
      recentActivities: source?.recentActivities || [],
    };
  }, [data]);
  // console.log(dashboard?.recentActivities, "dashboard?.recentActivities");

  const totalSuccessCount = dashboard?.totalSuccessCount || 0;
  const totalFailedCount = dashboard?.totalFailedCount || 0;
  const totalAI = totalSuccessCount + totalFailedCount;
  const successPercentage =
    totalAI > 0 ? Math.round((totalSuccessCount / totalAI) * 100) : 0;
  const failurePercentage =
    totalAI > 0 ? Math.round((totalFailedCount / totalAI) * 100) : 0;

  const columns = [
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: "Date",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <div>
      <div
        className="stats-row"
        style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
      >
        <div className="metric-card metric-card--student">
          <div className="metric-card__top">
            <span className="metric-card__title">Total Students</span>
            <div className="metric-card__icon metric-card__icon--student">
              <FiUsers />
              {/* <img src="" alt="" /> */}
            </div>
          </div>

          <div className="metric-card__value">{dashboard?.totalStudents}</div>
        </div>

        <div className="metric-card metric-card--recruiter">
          <div className="metric-card__top">
            <span className="metric-card__title">Total Recruiters</span>
            <div className="metric-card__icon metric-card__icon--recruiter">
              <img src={recruiterIcon} alt="Total Recruiters" />
            </div>
          </div>

          <div className="metric-card__value">{dashboard?.totalRecruiters}</div>
        </div>

        <div className="metric-card metric-card--job">
          <div className="metric-card__top">
            <span className="metric-card__title">Total Jobs</span>
            <div className="metric-card__icon metric-card__icon--job">
              <img src={activeJobsIcon} alt="Total Recruiters" />
            </div>
          </div>

          <div className="metric-card__value">{dashboard?.totalJobs}</div>
        </div>

        <div className="metric-card metric-card--application">
          <div className="metric-card__top">
            <span className="metric-card__title">Total Applications</span>
            <div className="metric-card__icon metric-card__icon--application">
              <img src={totalApplicationsIcon} alt="Total Recruiters" />
            </div>
          </div>

          <div className="metric-card__value">
            {dashboard?.totalApplications}
          </div>
        </div>
      </div>

      {/* <PieChart success={dashboard?.totalApplications} failed={dashboard?.totalJobs} /> */}

      {/* <div className=""> */}
        <LineChart
          title="AI Success Rate"
          subtitle="Performance analysis for automated matching"
          success={successPercentage}
          failure={failurePercentage}
          successCount={totalSuccessCount}
          failureCount={totalFailedCount}
          totalMatches={totalAI}
          defaultView="month"
        />
        <div className="p-4">
          RECENT ACTIVITY
        </div>

        <DataTable
          columns={columns}
          data={dashboard?.recentActivities}
          rowKey="key"
          currentPage={1}
          pageSize={10}
          total={dashboard?.recentActivities?.length || 0}
          onPageChange={(page) => {}}
        />
      {/* </div> */}
    </div>
  );
}

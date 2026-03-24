import React, { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  Linkedin,
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  User,
} from "lucide-react";
import { NormalizeStudentProfile } from "../../../utils/NormalizeStudentProfile";

const SectionCard = ({ title, children, className = "" }) => (
  <div
    className={`rounded-3xl bg-slate-800/90 border-slate-700 shadow-xl ${className}`}
  >
    <div className="px-6 py-4 border-b border-slate-700">
      <h3 className="text-white text-lg font-semibold tracking-wide">
        {title}
      </h3>
    </div>
    <div className="px-4 pt-2 pb-1">{children}</div>
  </div>
);

const StatCard = ({ label, value, subtext, progress }) => (
  <div className="rounded-3xl bg-slate-800/90 border-slate-700 p-3 min-h-[160px] shadow-lg">
    <div className="text-xs uppercase tracking-[0.18em] text-slate-400 font-semibold mb-4">
      {label}
    </div>

    <div className="text-3xl font-bold text-white mb-2">{value}</div>

    {subtext ? (
      <p className="text-sm text-slate-400 mb-4">{subtext}</p>
    ) : (
      <div className="h-6" />
    )}

    {typeof progress === "number" && (
      <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-500"
          style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
        />
      </div>
    )}
  </div>
);

const InfoRow = ({ icon, label, value, href }) => {
  if (!value || value === "N/A") return null;

  return (
    <div className="mb-3 last:mb-0">
      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-1">
        {label}
      </div>
      <div className="flex items-center gap-2 text-slate-100 break-all">
        <span className="text-slate-400">{icon}</span>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            {value}
          </a>
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );
};

const BadgeList = ({ items = [], emptyText = "No data available" }) => {
  if (!items.length) {
    return <p className="text-slate-400 text-sm">{emptyText}</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="px-4 py-2 rounded-full border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const TimelineItem = ({ title, subtitle, timeline, description }) => (
  <div className="grid grid-cols-1 md:grid-cols-[1.4fr_180px] gap-4 py-4 border-b border-slate-700 last:border-b-0">
    <div>
      <h4 className="text-white font-semibold text-base">{title}</h4>
      {subtitle ? <p className="text-cyan-400 mt-1">{subtitle}</p> : null}
      {description ? (
        <p className="text-slate-400 text-sm mt-2 leading-6">{description}</p>
      ) : null}
    </div>
    <div className="text-slate-200 font-semibold md:text-right">
      {timeline || "N/A"}
    </div>
  </div>
);

const DocumentsPanel = ({ profile }) => {
  const documents = [
    profile.resume ? { label: "Resume", url: profile.resume } : null,
    ...profile.aadhar.map((url, i) => ({ label: `Aadhar ${i + 1}`, url })),
    ...profile.studentIdDocs.map((url, i) => ({
      label: `Student ID ${i + 1}`,
      url,
    })),
  ].filter(Boolean);

  if (!documents.length && !profile.certificates.length) {
    return <p className="text-slate-400 text-sm">No documents uploaded.</p>;
  }

  return (
    <div className="space-y-6">
      {documents.length > 0 && (
        <div>
          <h4 className="text-white font-semibold mb-3">Uploaded Documents</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {documents.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border-slate-700 bg-slate-900/60 px-4 py-3 hover:border-cyan-500/40 transition"
              >
                <span className="text-slate-200 flex items-center gap-2">
                  <FileText size={16} />
                  {doc.label}
                </span>
                <span className="text-cyan-400 text-sm">Open</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {profile.certificates.length > 0 && (
        <div>
          <h4 className="text-white font-semibold mb-3">
            Certificates / Achievements
          </h4>
          <div className="space-y-3">
            {profile.certificates.map((cert, idx) => (
              <div
                key={cert?._id || idx}
                className="rounded-2xl border-slate-700 bg-slate-900/60 px-4 py-4"
              >
                <p className="text-slate-100 font-medium">
                  {cert?.name || "Untitled certificate"}
                </p>
                <div className="text-sm text-slate-400 mt-1">
                  {cert?.issuer
                    ? `Issuer: ${cert.issuer}`
                    : "Issuer not specified"}
                  {cert?.date ? ` • Date: ${cert.date}` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StudentDetailsPopup = ({ student, onClose, onMessage }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const profile = useMemo(() => NormalizeStudentProfile(student), [student]);

  if (!profile) return null;

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "projects", label: "Projects" },
    { key: "education", label: "Education" },
    { key: "documents", label: "Documents" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-[40px] overflow-hidden shadow-2xl">
      <div
        className="relative px-6 lg:px- pt-4 pb-2 "
        style={{
          // background:
          //   profile.banner
          //     ? `linear-gradient(to right, rgba(10,15,25,.86), rgba(17,24,39,.92)), url(${profile.banner}) center/cover`
          //     : "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0f172a 100%)",
          background: "var(--color-popup)",
        }}
      >
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="relative shrink-0">
              <img
                src={
                  profile.profileImage ||
                  "https://via.placeholder.com/140x140?text=Profile"
                }
                alt={profile.name}
                className="w-32 h-32 rounded-3xl object-cover border-4 border-white/10 shadow-xl bg-slate-800"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/140x140?text=Profile";
                }}
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>

            <div className="pt-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-white">
                  {profile.name}
                </h1>
                {profile.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/15 border-cyan-400/20 text-cyan-300 text-sm font-medium">
                    <BadgeCheck size={14} />
                    Verified Intern
                  </span>
                )}
              </div>

              <p className="text-slate-300 text-xl mt-2">
                {profile.degree}
                {profile.fieldOfStudy ? ` - ${profile.fieldOfStudy}` : ""}
              </p>

              <div className="flex flex-wrap items-center gap-5 mt-4 text-slate-400 text-sm">
                <span>ID: {profile.id.slice(-8).toUpperCase()}</span>
                <span className="flex items-center gap-1">
                  <MapPin size={15} />
                  {profile.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onMessage?.(profile)}
              className="px-5 py-3 rounded-2xl border-slate-600 text-white hover:border-cyan-500 hover:bg-cyan-500/10 transition"
            >
              Message
            </button>

            {profile.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition inline-flex items-center gap-2"
              >
                <Download size={16} />
                Download CV
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-4 px-2 grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-3 bg-transparent">
        <div className="space-y-4">
          <SectionCard title="Personal Details">
            <InfoRow
              icon={<Mail size={16} />}
              label="Email Address"
              value={profile.email}
            />
            <InfoRow
              icon={<Phone size={16} />}
              label="Phone Number"
              value={profile.phone}
            />
            <InfoRow
              icon={<Linkedin size={16} />}
              label="LinkedIn"
              value={profile.linkedin}
              href={profile.linkedin}
            />
          </SectionCard>

          <div className="rounded-3xl bg-cyan-500 p-3 shadow-[0_0_40px_rgba(6,182,212,0.25)]">
            <div className="text-sm uppercase tracking-[0.18em] text-cyan-100 font-semibold mb-3">
              Credit Status
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-cyan-100 text-sm mb-1">
                  Available Balance
                </div>
                <div className="text-5xl font-bold text-white">
                  {profile.credits.balance}
                </div>
                <div className="text-cyan-50">Credits</div>
              </div>

              <div className="text-right">
                <div className="text-cyan-100 text-sm mb-1">Used</div>
                <div className="text-3xl font-bold text-white">
                  {profile.credits.used}
                </div>
              </div>
            </div>

            <div className="mt-5 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white"
                style={{
                  width: `${
                    profile.credits.balance + profile.credits.used > 0
                      ? (profile.credits.balance /
                          (profile.credits.balance + profile.credits.used)) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <SectionCard title="Skills">
            <BadgeList items={profile.skills} emptyText="No skills added." />
          </SectionCard>

          <SectionCard title="Areas of Interest">
            <BadgeList
              items={profile.interests}
              emptyText="No interests added."
            />
          </SectionCard>
        </div>

        <div className="space-y-6 min-w-0">
          <div className="rounded-3xl bg-slate-800/80 border-slate-700 p-2 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-2xl font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <StatCard
                  label="Profile Completion"
                  value={`${profile.stats.profileCompletion}%`}
                  subtext="Based on filled profile sections"
                  progress={profile.stats.profileCompletion}
                />
                <StatCard
                  label="Total Applications"
                  value={profile.stats.totalApplications}
                  subtext="Application stats not fully available from API"
                />
                <StatCard
                  label="Avg. Assessment Score"
                  value={
                    profile.stats.assessmentScore
                      ? `${profile.stats.assessmentScore}/100`
                      : "N/A"
                  }
                  subtext="Assessment score missing in current response"
                />
              </div>

              <SectionCard title="Internship">
                {profile.internships.length ? (
                  profile.internships.map((item, idx) => (
                    <TimelineItem
                      key={item?._id || idx}
                      title={item?.company || "Unknown Company"}
                      subtitle={item?.role || ""}
                      timeline={item?.duration || "N/A"}
                      description={item?.description || ""}
                    />
                  ))
                ) : (
                  <p className="text-slate-400">
                    No internship details available.
                  </p>
                )}
              </SectionCard>

              <SectionCard title="Experience">
                {profile.experience.length ? (
                  profile.experience.map((item, idx) => (
                    <TimelineItem
                      key={item?._id || idx}
                      title={item?.company || item?.title || "Experience"}
                      subtitle={item?.role || item?.designation || ""}
                      timeline={item?.duration || item?.year || "N/A"}
                      description={item?.description || ""}
                    />
                  ))
                ) : (
                  <p className="text-slate-400">No experience added.</p>
                )}
              </SectionCard>
            </>
          )}

          {activeTab === "projects" && (
            <SectionCard title="Projects">
              {profile.projects.length ? (
                <div className="space-y-4">
                  {profile.projects.map((project, idx) => (
                    <div
                      key={project?._id || idx}
                      className="rounded-2xl border-slate-700 bg-slate-900/60 p-5"
                    >
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {project?.title || "Untitled Project"}
                      </h4>
                      {Array.isArray(project?.description) ? (
                        <ul className="space-y-2 text-slate-300 text-sm leading-6">
                          {project.description.map((desc, i) => (
                            <li key={i}>• {desc}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-300 text-sm leading-6">
                          {project?.description || "No description available."}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">No projects added.</p>
              )}
            </SectionCard>
          )}

          {activeTab === "education" && (
            <div className="space-y-6">
              <SectionCard title="College Education">
                {profile.education.college.length ? (
                  profile.education.college.map((item, idx) => (
                    <TimelineItem
                      key={item?._id || idx}
                      title={item?.degree || "Degree not specified"}
                      subtitle={item?.department || ""}
                      timeline={`${item?.start_year || "N/A"} - ${item?.end_year || "N/A"}`}
                      description={profile.collegeName}
                    />
                  ))
                ) : (
                  <p className="text-slate-400">
                    No college education details.
                  </p>
                )}
              </SectionCard>

              <SectionCard title="Higher Secondary">
                <TimelineItem
                  title={
                    profile.education.higherSecondary?.board || "Not specified"
                  }
                  subtitle={
                    profile.education.higherSecondary?.institution || ""
                  }
                  timeline={
                    profile.education.higherSecondary?.year_of_passing || "N/A"
                  }
                  description={`Percentage: ${profile.education.higherSecondary?.percentage || "N/A"}`}
                />
              </SectionCard>

              <SectionCard title="Secondary">
                <TimelineItem
                  title={
                    profile.education.secondary?.institution ||
                    profile.education.secondary?.board ||
                    "Not specified"
                  }
                  subtitle={profile.education.secondary?.board || ""}
                  timeline={
                    profile.education.secondary?.year_of_passing || "N/A"
                  }
                  description={`Percentage: ${profile.education.secondary?.percentage || "N/A"}`}
                />
              </SectionCard>
            </div>
          )}

          {activeTab === "documents" && (
            <SectionCard title="Documents">
              <DocumentsPanel profile={profile} />
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPopup;

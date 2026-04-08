import React from "react";
import {
  Building2,
  Users,
  MapPin,
  Edit2,
  Clock,
  ArrowRight,
  FileText,
  ExternalLink,
  User,
  Mail,
  Phone,
  Building,
  X,
} from "lucide-react";

// --- Extracted Components for clean code structure (like StudentDetailsPopup) --- //

const HeaderCard = ({
  companyName,
  industry,
  companySize,
  location,
  companyLogo,
}) => (
  <div className="bg-[#151E2E] rounded-[2rem] p-3 border-slate-700/50 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg relative">
    <div className="flex gap-6 items-center">
      <div className="w-24 h-24 rounded-[1.5rem] bg-[#0A1A2F] border border-cyan-500/20 flex flex-col justify-center items-center relative overflow-hidden group shadow-inner">
        {/* <div className="absolute inset-0 bg-cyan-400/5 rounded-full blur-xl group-hover:bg-cyan-400/10 transition-colors z-0"></div> */}
        {companyLogo ? (
          <img
            src={companyLogo}
            alt={companyName}
            className="w-full h-full object-cover relative z-10"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500/80 flex items-center justify-center relative z-10">
            <div className="w-6 h-6 rounded-full bg-cyan-400 absolute"></div>
          </div>
        )}
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-[3px] border-[#151E2E] z-20"></div>
      </div>

      <div className="pt-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            {companyName}
          </h1>
          <span className="px-3 py-0.5 rounded-full bg-[#1E3A5F] text-cyan-400 text-xs font-semibold border border-cyan-800/50">
            Premium
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2 text-slate-400 font-medium">
          <Building size={16} /> {industry}
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-3 text-slate-400 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <Users size={16} /> {companySize} Employees
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={16} /> {location}
          </span>
        </div>
      </div>
    </div>
    <button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 py-3 rounded-full font-semibold outline-none flex items-center gap-2 transition-all mt-4 md:mt-0 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]">
      <Edit2 size={16} /> Edit Profile
    </button>
  </div>
);

const CreditStatCard = ({ title, value, subtext, icon, highlighted }) => (
  <div
    className={`bg-[#151E2E] rounded-2xl p-4 border-slate-700/50 shadow-md relative overflow-hidden ${
      highlighted ? "border-l-[3px] border-l-cyan-500" : ""
    }`}
  >
    <div className="text-slate-400 font-semibold tracking-wide">{title}</div>
    <div
      className={`text-3xl font-bold  tracking-tight ${highlighted ? "text-cyan-400" : "text-white"}`}
    >
      {value}
    </div>
    <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
      {icon} {subtext}
    </p>
  </div>
);

const CompanyOverviewCard = ({ companyName, address, companyDescription }) => (
  <div className="bg-[#151E2E] rounded-[2rem] p-4 border-slate-700/50 shadow-lg h-full max-h-[610px] overflow-y-scroll">
    <h2 className="text-2xl text-white font-bold mb-8">Company Overview</h2>

    <div className="flex gap-4 mb-4 items-start">
      <div className="mt-1 p-2 rounded-full bg-cyan-950/40 text-cyan-400 border-cyan-800/30">
        <MapPin size={22} />
      </div>
      <div>
        <div className="text-xs font-bold text-slate-500 tracking-[0.15em] uppercase mb-1">
          REGISTERED ADDRESS
        </div>
        <div className="text-slate-200 text-lg font-medium">{address}</div>
      </div>
    </div>

    <div className="flex gap-4 mb-4 items-start">
      <div className="mt-1 p-2 rounded-full bg-cyan-950/40 text-cyan-400 border-cyan-800/30">
        <FileText size={22} />
      </div>
      <div>
        <div className="text-xs font-bold text-slate-500 tracking-[0.15em] uppercase mb-1">
          DOCUMENTS
        </div>
        <a
          href="#doc"
          className="text-cyan-400 text-lg font-semibold hover:text-cyan-300 transition-colors flex items-center gap-1.5 decoration-2 underline-offset-4"
        >
          View Company Document <ExternalLink size={18} />
        </a>
      </div>
    </div>

    <div>
      <h3 className="text-white font-bold text-[1.1rem] mb-3">
        About {companyName.split(" ")[0]}
      </h3>
      <p className="text-slate-400 leading-8 text-[1rem]">
        {companyDescription}
      </p>
    </div>
  </div>
);

const ContactRow = ({ icon, label, value }) => (
  <div className="flex gap-4 items-center">
    <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 border-slate-700/50">
      {icon}
    </div>
    <div className="flex-1 overflow-hidden">
      <div className="text-[0.65rem] font-bold text-slate-500 tracking-[0.15em] uppercase mb-0.5">
        {label}
      </div>
      <div
        className="text-slate-200 text-[0.95rem] font-medium truncate"
        title={value}
      >
        {value}
      </div>
    </div>
  </div>
);

const HRProfileCard = ({
  hrName,
  designation,
  personalEmail,
  phoneNumber,
  companyEmail,
  profilePic,
}) => (
  <div className="bg-[#151E2E] rounded-[2rem] relative border-slate-700/50 shadow-xl overflow-hidden">
    <div className="h-[120px] bg-[#00AEEF] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0ibTIwIDBsMjAgMTEuNTQ3djIzLjA5NEwyMCA0NiAwIDM0LjY0MVYxMS41NDdaIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] bg-repeat"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#151E2E]/80"></div>
    </div>

    <div className="flex flex-col items-center px-8 pb-6 -mt-[52px]">
      <div className="w-[110px] h-[110px] rounded-[1.5rem] bg-slate-800 shadow-xl overflow-hidden mb-2 relative z-10">
        <img
          src={profilePic || "https://i.pravatar.cc/150?u=raj"}
          alt={hrName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://ui-avatars.com/api/?name=" +
              hrName +
              "&background=0D8ABC&color=fff";
          }}
        />
      </div>

      <h2 className="text-2xl font-bold text-white tracking-wide">{hrName}</h2>
      <div className="text-cyan-400 font-bold tracking-[0.1em] text-[0.8rem] mt-1.5 uppercase">
        {designation}
      </div>
      <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-3 font-medium bg-slate-800/50 px-3 py-1 rounded-full">
        <User size={14} /> Male{" "}
      </div>

      <div className="w-full mt-6 space-y-4">
        <ContactRow
          icon={<Mail size={18} />}
          label="Personal Email"
          value={personalEmail}
        />
        <ContactRow
          icon={<Phone size={18} />}
          label="Phone Numbers"
          value={phoneNumber}
        />
        <ContactRow
          icon={<Building2 size={18} className="text-cyan-400" />}
          label="Company Email"
          value={companyEmail}
        />
      </div>

      <button className="w-full mt-8 bg-[#1E293B] hover:bg-[#334155] border-slate-700 text-white rounded-2xl py-3.5 font-bold transition-all shadow-md active:scale-[0.98]">
        Contact Directly
      </button>
    </div>
  </div>
);

const AccountHealthCard = () => (
  <div className="bg-[#151E2E] rounded-[2rem] p-6 border-slate-700/50 shadow-lg relative overflow-hidden">
    <div className="text-[0.7rem] font-bold text-cyan-400 tracking-[0.15em] uppercase mb-4">
      Account Health
    </div>
    <div className="flex justify-between items-center mb-3">
      <span className="text-slate-400 font-medium">Profile Completion</span>
      <span className="text-white font-bold text-lg">85%</span>
    </div>
    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-cyan-400 rounded-full"
        style={{ width: "85%" }}
      ></div>
    </div>
  </div>
);

// --- Main Layout Component --- //

export default function RRecruiterDetailsPopup({ recruiter, onClose }) {
  if (!recruiter) return null;

  // Extract properties safely
  const companyName = recruiter?.reccompanyname || "Company Name";
  const industry =
    recruiter?.reccompanyindustrytype?.name || "Information Technology";
  const companySize = recruiter?.reccompanysize || "50";
  const location = recruiter?.reccompanyaddress || "Bengaluru, India";
  const companyAddressFull =
    recruiter?.reccompanyaddress || "Chennai - 600089, Tamil Nadu, India";
  const companyLogo =
    recruiter?.reccompanylogo || recruiter?.companyLogo || recruiter?.logo;

  const hrName = recruiter?.recname || "HR Manager";
  const designation = recruiter?.recdesignation || "HR MANAGER";
  const personalEmail = recruiter?.recemail || "email@example.com";
  const phoneNumber = recruiter?.recmobileno || "N/A";
  const companyEmail = recruiter?.companyEmail || personalEmail;
  const companyDescription =
    recruiter?.reccompanydescription ||
    `${companyName} is a leading global information technology, consulting and business process services company. We harness the power of cognitive computing, hyper-automation, robotics, cloud, analytics and emerging technologies to help our clients adapt to the digital world.`;
  const avaliableCredit = recruiter?.recruiterCreditId?.balance || 0;
  const totalUsed = recruiter?.recruiterCreditId?.totalUsed || 0;

  return (
    <div className="w-full max-w-[1000px] mx-auto text-slate-200 relative pb-8">
      {/* Close button top right - floating above layout */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onClose}
          className="p-2 bg-[#151E2E] hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors shadow-2xl lg:-mr-12"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Visual Header Block */}
        <HeaderCard
          companyName={companyName}
          industry={industry}
          companySize={companySize}
          location={location}
          companyLogo={companyLogo}
        />

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CreditStatCard
                title="Balance Credits"
                value={avaliableCredit}
                // subtext="Expires in 30 days"
                // icon={<Clock size={14} className="text-slate-400" />}
                highlighted={true}
              />
              <CreditStatCard
                title="Total Used"
                value={totalUsed}
                // subtext="No usage this month"
                // icon={<ArrowRight size={14} className="text-slate-400" />}
                highlighted={false}
              />
            </div>

            <CompanyOverviewCard
              companyName={companyName}
              address={companyAddressFull}
              companyDescription={companyDescription}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <HRProfileCard
              hrName={hrName}
              designation={designation}
              personalEmail={personalEmail}
              phoneNumber={phoneNumber}
              companyEmail={companyEmail}
              profilePic={recruiter?.profilePic}
            />

            <AccountHealthCard />
          </div>
        </div>
      </div>
    </div>
  );
}

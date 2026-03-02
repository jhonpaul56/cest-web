import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────

const INITIAL_PROJECTS = [
  {
    community:  "Community A",
    category:   "SUSTAINABLE ENTERPRISE AND LIVELIHOODS",
    budget:     250000,
    focal:      "Maria Santos",
    contact:    "09171234567",
    address:    "Barangay 1, Quezon City",
    date:       "2024-01-15",
    duration:   "6 months",
    households: 20,
    male:       40,
    female:     40,
    total:      80,
  },
  {
    community:  "Community B",
    category:   "HEALTH AND NUTRITION",
    budget:     300000,
    focal:      "Jose Reyes",
    contact:    "09281234567",
    address:    "Barangay 5, Manila",
    date:       "2024-03-10",
    duration:   "12 months",
    households: 30,
    male:       60,
    female:     60,
    total:      120,
  },
  {
    community:  "Community C",
    category:   "HUMAN RESOURCE DEVELOPMENT",
    budget:     150000,
    focal:      "Ana Cruz",
    contact:    "09391234567",
    address:    "Barangay 10, Makati",
    date:       "2024-06-01",
    duration:   "3 months",
    households: 15,
    male:       28,
    female:     32,
    total:      60,
  },
];

// ── Category Color Map ─────────────────────────────────────
const CAT_COLORS = {
  "SUSTAINABLE ENTERPRISE AND LIVELIHOODS":  { bg: "#e6f4ea", color: "#2d7a3e", accent: "#28a745" },
  "HEALTH AND NUTRITION":                    { bg: "#fde8ea", color: "#b02020", accent: "#dc3545" },
  "HUMAN RESOURCE DEVELOPMENT":              { bg: "#ede8ff", color: "#5036e9", accent: "#6f42c1" },
  "DRRM AND CCA":                            { bg: "#fff3e0", color: "#b45309", accent: "#fd7e14" },
  "BIO CIRCULAR GREEN ECONOMY TECHNOLOGIES": { bg: "#e0f7f4", color: "#0a7a6e", accent: "#20c997" },
  "DIGITAL GOVERNANCE TOOLS":               { bg: "#e0f2ff", color: "#1561ad", accent: "#17a2b8" },
};

// ─────────────────────────────────────────────────────────
// SETTINGS PANEL COMPONENT
// ─────────────────────────────────────────────────────────

function SettingsPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile,   setProfile]   = useState({
    fullname: "Admin User",
    username: "admin",
    email:    "admin@cest.gov.ph",
  });
  const [editing,  setEditing]  = useState(false);
  const [editForm, setEditForm] = useState({});
  const [alert,    setAlert]    = useState(null);
  const [theme,    setTheme]    = useState("blue");
  const [notifs,   setNotifs]   = useState({
    reminder: true,
    projects: true,
    system:   false,
  });

  function saveProfile() {
    if (!editForm.fullname || !editForm.username || !editForm.email) {
      setAlert({ type: "error", msg: "Please fill in all fields." });
      return;
    }
    setProfile(editForm);
    setEditing(false);
    setAlert({ type: "success", msg: "✓ Profile updated!" });
    setTimeout(() => setAlert(null), 3000);
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position:       "fixed",
        inset:          0,
        background:     "rgba(0,0,0,0.55)",
        zIndex:         3000,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        16,
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        style={{
          background:   "#fff",
          borderRadius: 20,
          width:        "100%",
          maxWidth:     480,
          boxShadow:    "0 24px 60px rgba(0,0,0,0.3)",
          overflow:     "hidden",
        }}
      >
        {/* Settings Header */}
        <div
          style={{
            background:     "linear-gradient(135deg,#1e5bb8,#4c84e0)",
            padding:        "18px 22px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            color:          "white",
          }}
        >
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>
            ⚙️ Settings
          </span>
          <button
            onClick={onClose}
            style={{
              background:   "rgba(255,255,255,0.2)",
              border:       "none",
              borderRadius: 8,
              width:        32,
              height:       32,
              color:        "white",
              cursor:       "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", borderBottom: "1px solid #eee", background: "#f8faff" }}>
          {["profile", "preferences", "notifications"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                flex:         1,
                padding:      "12px 8px",
                border:       "none",
                background:   activeTab === t ? "#fff" : "none",
                fontWeight:   activeTab === t ? 700 : 500,
                color:        activeTab === t ? "#1e5bb8" : "#6c757d",
                borderBottom: activeTab === t ? "2px solid #1e5bb8" : "2px solid transparent",
                cursor:        "pointer",
                fontSize:      ".82rem",
                textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: 22 }}>

          {/* ── Profile Tab ── */}
          {activeTab === "profile" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div
                  style={{
                    width:          70,
                    height:         70,
                    borderRadius:   "50%",
                    background:     "linear-gradient(135deg,#1e5bb8,#4c84e0)",
                    display:        "inline-flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "1.8rem",
                    color:          "white",
                    fontWeight:     700,
                  }}
                >
                  {profile.fullname?.charAt(0).toUpperCase() || "?"}
                </div>
                <div style={{ fontWeight: 700, color: "#1e3a6e", marginTop: 8 }}>{profile.fullname}</div>
                <div style={{ fontSize: ".82rem", color: "#6c757d" }}>{profile.email}</div>
              </div>

              {alert && (
                <div
                  style={{
                    padding:      "9px 13px",
                    borderRadius: 9,
                    fontSize:     ".83rem",
                    marginBottom: 12,
                    background:   alert.type === "success" ? "rgba(40,167,69,0.12)" : "rgba(220,53,69,0.1)",
                    border:       `1px solid ${alert.type === "success" ? "rgba(40,167,69,0.3)" : "rgba(220,53,69,0.28)"}`,
                    color:        alert.type === "success" ? "#1a6b2e" : "#b02020",
                  }}
                >
                  {alert.msg}
                </div>
              )}

              {!editing ? (
                <div>
                  {[
                    ["Full Name",     profile.fullname],
                    ["Username",      profile.username],
                    ["Email Address", profile.email],
                  ].map(([lbl, val]) => (
                    <div
                      key={lbl}
                      style={{
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "space-between",
                        padding:        "12px 14px",
                        borderRadius:   10,
                        background:     "#f4f7ff",
                        marginBottom:   10,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase", letterSpacing: ".5px" }}>{lbl}</div>
                        <div style={{ fontSize: ".93rem", fontWeight: 500, color: "#1e3a6e" }}>{val}</div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => { setEditForm({ ...profile }); setEditing(true); }}
                    style={{
                      padding:      "8px 18px",
                      border:       "none",
                      borderRadius: 9,
                      background:   "linear-gradient(135deg,#1e5bb8,#4c84e0)",
                      color:        "white",
                      fontSize:     ".83rem",
                      fontWeight:   600,
                      cursor:       "pointer",
                      marginTop:    14,
                    }}
                  >
                    ✏️ Edit Profile
                  </button>
                </div>
              ) : (
                <div>
                  {[
                    ["Full Name",     "fullname"],
                    ["Username",      "username"],
                    ["Email Address", "email"],
                  ].map(([lbl, key]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <label style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 5 }}>
                        {lbl}
                      </label>
                      <input
                        value={editForm[key] || ""}
                        onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                        style={{
                          width:        "100%",
                          padding:      "10px 12px",
                          border:       "1.5px solid #dde4f5",
                          borderRadius: 10,
                          fontSize:     ".9rem",
                          color:        "#1e3a6e",
                          background:   "#f8faff",
                          outline:      "none",
                          boxSizing:    "border-box",
                        }}
                      />
                    </div>
                  ))}
                  <button
                    onClick={saveProfile}
                    style={{ width: "100%", padding: 11, border: "none", borderRadius: 10, background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", marginBottom: 8 }}
                  >
                    ✅ Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    style={{ width: "100%", padding: 10, border: "1.5px solid #dde4f5", borderRadius: 10, background: "white", color: "#6c757d", fontWeight: 500, fontSize: ".9rem", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Preferences Tab ── */}
          {activeTab === "preferences" && (
            <div>
              <p style={{ color: "#6c757d", fontSize: ".85rem", marginBottom: 16 }}>
                Customize your dashboard experience.
              </p>
              {[
                ["Language",    "English (Philippines)"],
                ["Date Format", "MM/DD/YYYY"],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#f4f7ff", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase" }}>{lbl}</div>
                    <div style={{ fontSize: ".93rem", fontWeight: 500, color: "#1e3a6e" }}>{val}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "12px 14px", borderRadius: 10, background: "#f4f7ff" }}>
                <div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase", marginBottom: 6 }}>Theme</div>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  style={{ padding: "6px 10px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: ".85rem", color: "#1e3a6e", background: "#fff", cursor: "pointer" }}
                >
                  <option value="blue">Blue (Default)</option>
                  <option value="dark">Dark</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
            </div>
          )}

          {/* ── Notifications Tab ── */}
          {activeTab === "notifications" && (
            <div>
              <p style={{ color: "#6c757d", fontSize: ".85rem", marginBottom: 16 }}>
                Manage how you receive alerts.
              </p>
              {[
                { key: "reminder", label: "Reminder Alerts",     sub: "Notify when a reminder is due" },
                { key: "projects", label: "Project Updates",      sub: "Status changes on projects"    },
                { key: "system",   label: "System Announcements", sub: "News and updates from CEST"    },
              ].map(({ key, label, sub }) => (
                <div
                  key={key}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#f4f7ff", marginBottom: 10 }}
                >
                  <div>
                    <div style={{ fontSize: ".9rem", fontWeight: 500, color: "#1e3a6e" }}>{label}</div>
                    <div style={{ fontSize: ".76rem", color: "#6c757d" }}>{sub}</div>
                  </div>
                  <div
                    onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })}
                    style={{ width: 44, height: 24, borderRadius: 12, background: notifs[key] ? "#1e5bb8" : "#ccc", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}
                  >
                    <div
                      style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: notifs[key] ? 23 : 3, transition: "left .2s" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MINI BAR COMPONENT
// ─────────────────────────────────────────────────────────

function MiniBar({ value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Track */}
      <div
        style={{
          flex:         1,
          height:       8,
          background:   "#edf2ff",
          borderRadius: 4,
          overflow:     "hidden",
        }}
      >
        {/* Fill */}
        <div
          style={{
            width:        `${pct}%`,
            height:       "100%",
            background:   color,
            borderRadius: 4,
            transition:   "width .6s ease",
          }}
        />
      </div>

      {/* Percentage Label */}
      <span
        style={{
          fontSize:  ".7rem",
          color:     "#6c757d",
          minWidth:  32,
          textAlign: "right",
        }}
      >
        {Math.round(pct)}%
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// DONUT CHART COMPONENT
// ─────────────────────────────────────────────────────────

function DonutChart({ data }) {
  const R  = 60;
  const r  = 36;
  const cx = 80;
  const cy = 80;

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!total) {
    return (
      <div style={{ textAlign: "center", color: "#aaa", padding: 20 }}>
        No data
      </div>
    );
  }

  // Build slices with cumulative start angle
  let cum = 0;
  const slices = data.map((d) => {
    const pct   = d.value / total;
    const start = cum;
    cum += pct;
    return { ...d, pct, start };
  });

  // Build SVG donut arc path
  function arc(s) {
    const a1 = s.start * 2 * Math.PI - Math.PI / 2;
    const a2 = (s.start + s.pct) * 2 * Math.PI - Math.PI / 2;

    const x1o = cx + R * Math.cos(a1);
    const y1o = cy + R * Math.sin(a1);
    const x2o = cx + R * Math.cos(a2);
    const y2o = cy + R * Math.sin(a2);

    const x1i = cx + r * Math.cos(a2);
    const y1i = cy + r * Math.sin(a2);
    const x2i = cx + r * Math.cos(a1);
    const y2i = cy + r * Math.sin(a1);

    const large = s.pct > 0.5 ? 1 : 0;

    return `M ${x1o} ${y1o} A ${R} ${R} 0 ${large} 1 ${x2o} ${y2o} L ${x1i} ${y1i} A ${r} ${r} 0 ${large} 0 ${x2i} ${y2i} Z`;
  }

  return (
    <div
      style={{
        display:    "flex",
        alignItems: "center",
        gap:        16,
        flexWrap:   "wrap",
      }}
    >
      {/* SVG Donut */}
      <svg
        viewBox="0 0 160 160"
        width={140}
        height={140}
        style={{ flexShrink: 0 }}
      >
        {slices.map((s, i) => (
          <path
            key={i}
            d={arc(s)}
            fill={s.color}
            opacity="0.9"
          />
        ))}

        {/* Center Label */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#1e3a6e"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fontSize="9"
          fill="#6c757d"
        >
          projects
        </text>
      </svg>

      {/* Legend */}
      <div style={{ flex: 1, minWidth: 100 }}>
        {slices.map((s, i) => (
          <div
            key={i}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          6,
              marginBottom: 6,
            }}
          >
            {/* Color Swatch */}
            <div
              style={{
                width:        10,
                height:       10,
                borderRadius: 3,
                background:   s.color,
                flexShrink:   0,
              }}
            />

            {/* Label */}
            <span
              style={{
                fontSize:   ".7rem",
                color:      "#4a5568",
                lineHeight: 1.3,
              }}
            >
              {s.label.length > 28
                ? s.label.slice(0, 28) + "…"
                : s.label}
            </span>

            {/* Count */}
            <span
              style={{
                marginLeft: "auto",
                fontSize:   ".7rem",
                fontWeight: 700,
                color:      s.color,
                flexShrink: 0,
              }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN REPORTS COMPONENT
// ─────────────────────────────────────────────────────────

export default function CESTReports() {
  const navigate = useNavigate();
  const location = useLocation();

  // ── State ──────────────────────────────────────────────
  const [projects] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cestData")) || INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [bellOpen,      setBellOpen]      = useState(false);
  const [reminders,     setReminders]     = useState([
    { text: "Review Q1 Report", date: "2025-03-01" },
  ]);
  const [reminderInput, setReminderInput] = useState("");
  const [reminderDate,  setReminderDate]  = useState("");
  const [toast,         setToast]         = useState(null);
  const [hoveredRow,    setHoveredRow]    = useState(null);
  const [showSettings,  setShowSettings]  = useState(false);
  const printRef = useRef();

  // ── Navigation Links ───────────────────────────────────
  const navLinks = [
    { icon: "🏠", label: "Dashboard",  path: "/dashboard"  },
    { icon: "✏️", label: "Data Entry", path: "/data-entry" },
    { icon: "📋", label: "Projects",   path: "/projects"   },
    { icon: "📁", label: "Documents",  path: "/documents"  },
    { icon: "📊", label: "Reports",    path: "/reports"    },
  ];

  // ── Close Bell on Outside Click ────────────────────────
  useEffect(() => {
    function handler(e) {
      if (!e.target.closest(".bell-area")) {
        setBellOpen(false);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // ── Computed Stats ─────────────────────────────────────
  const totalBudget        = projects.reduce((s, p) => s + Number(p.budget     || 0), 0);
  const totalBeneficiaries = projects.reduce((s, p) => s + Number(p.total      || 0), 0);
  const totalHH            = projects.reduce((s, p) => s + Number(p.households || 0), 0);

  // ── Build Category Map ─────────────────────────────────
  const categoryMap = {};
  projects.forEach((p) => {
    const cat = p.category || "Uncategorized";
    if (!categoryMap[cat]) {
      categoryMap[cat] = {
        count:  0,
        budget: 0,
        male:   0,
        female: 0,
        total:  0,
      };
    }
    categoryMap[cat].count++;
    categoryMap[cat].budget += Number(p.budget || 0);
    categoryMap[cat].male   += Number(p.male   || 0);
    categoryMap[cat].female += Number(p.female || 0);
    categoryMap[cat].total  += Number(p.total  || 0);
  });

  const categoryRows = Object.entries(categoryMap).sort(
    (a, b) => b[1].budget - a[1].budget
  );

  const maxBudget = categoryRows.length
    ? Math.max(...categoryRows.map(([, v]) => v.budget))
    : 1;

  // ── Donut Chart Data ───────────────────────────────────
  const donutData = categoryRows.map(([label, v]) => ({
    label,
    value: v.count,
    color: (CAT_COLORS[label] || { accent: "#1e5bb8" }).accent,
  }));

  // ── Export CSV ─────────────────────────────────────────
  function exportCSV() {
    const header = "Category,Projects,Budget,Male,Female,Total Beneficiaries\n";
    const rows   = categoryRows
      .map(([cat, v]) =>
        `"${cat}",${v.count},"₱${v.budget.toLocaleString()}",${v.male},${v.female},${v.total}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = "CEST_Report.csv";
    a.click();
  }

  // ── Toast Helper ───────────────────────────────────────
  function showToastMsg(msg, color = "#1e5bb8") {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3500);
  }

  // ── Add Reminder ───────────────────────────────────────
  function addReminder() {
    if (!reminderInput || !reminderDate) return;
    setReminders([
      ...reminders,
      { text: reminderInput, date: reminderDate },
    ]);
    setReminderInput("");
    setReminderDate("");
  }

  // ── Summary Card Data ──────────────────────────────────
  const summaryCards = [
    {
      label: "Total Projects",
      val:   projects.length,
      icon:  "📋",
      bg:    "linear-gradient(135deg,#1e5bb8,#4c84e0)",
    },
    {
      label: "Total Budget",
      val:   "₱" + totalBudget.toLocaleString(),
      icon:  "💰",
      bg:    "linear-gradient(135deg,#28a745,#6bd38d)",
    },
    {
      label: "Categories Used",
      val:   Object.keys(categoryMap).length,
      icon:  "🏷️",
      bg:    "linear-gradient(135deg,#6f42c1,#a66cff)",
    },
    {
      label: "Total Beneficiaries",
      val:   totalBeneficiaries.toLocaleString(),
      icon:  "👥",
      bg:    "linear-gradient(135deg,#ff7a18,#ffb347)",
    },
  ];

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────

  return (
    <div
      style={{
        display:    "flex",
        minHeight:  "100vh",
        background: "#4c84e0",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        overflow:   "hidden",
      }}
    >
      {/* ── Toast Notification ── */}
      {toast && (
        <div
          style={{
            position:   "fixed",
            bottom:     28,
            left:       "50%",
            transform:  "translateX(-50%)",
            background: toast.color,
            color:      "white",
            padding:    "12px 24px",
            borderRadius: 12,
            fontWeight: 600,
            fontSize:   ".9rem",
            boxShadow:  "0 8px 24px rgba(0,0,0,0.25)",
            zIndex:     9999,
            display:    "flex",
            alignItems: "center",
            gap:        8,
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* ── Sidebar Overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position:       "fixed",
            inset:          0,
            background:     "rgba(0,0,0,0.5)",
            zIndex:         1050,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <nav
        style={{
          width:         250,
          background:    "#fff",
          color:         "#1e5bb8",
          position:      "fixed",
          top:           0,
          left:          0,
          height:        "100vh",
          zIndex:        1060,
          borderRight:   "1px solid #e9ecef",
          boxShadow:     "4px 0 20px rgba(0,0,0,0.08)",
          display:       "flex",
          flexDirection: "column",
          transition:    "transform .3s ease",
          overflowY:     "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding:      "20px 5px",
            borderBottom: "1px solid #f1f1f1",
            textAlign:    "center",
          }}
        >
          <img
            src="/images/logo.png"
            style={{
              width:        200,
              height:       100,
              objectFit:    "contain",
              marginBottom: 8,
            }}
          />
        </div>

        {/* Nav Links */}
        <ul
          style={{
            listStyle: "none",
            padding:   "16px 15px",
            margin:    0,
            flex:      1,
          }}
        >
          {navLinks.map(({ icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={label}>
                <a
                  onClick={() => navigate(path)}
                  style={{
                    color:          "#1e5bb8",
                    display:        "flex",
                    alignItems:     "center",
                    gap:            12,
                    padding:        "12px 16px",
                    borderRadius:   12,
                    marginBottom:   6,
                    fontWeight:     isActive ? 600 : 500,
                    background:     isActive
                      ? "linear-gradient(90deg,#cce0ff,#b3d1ff)"
                      : "none",
                    textDecoration: "none",
                    position:       "relative",
                    transition:     "all .3s ease",
                    cursor:         "pointer",
                  }}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div
                      style={{
                        position:     "absolute",
                        left:         0,
                        top:          8,
                        bottom:       8,
                        width:        4,
                        background:   "#5036e9",
                        borderRadius: 4,
                      }}
                    />
                  )}
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Logout Button */}
        <div style={{ padding: "0 12px 20px" }}>
          <a
            onClick={() => navigate("/")}
            style={{
              background:     "#f8f9fa",
              color:          "#dc3545",
              borderRadius:   12,
              fontWeight:     500,
              padding:        "10px 0",
              textDecoration: "none",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              gap:            6,
              cursor:         "pointer",
            }}
          >
            🚪 Logout
          </a>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main
        ref={printRef}
        style={{
          background:    "#0c52c4",
          minHeight:     "100vh",
          paddingBottom: 40,
          marginLeft:    250,
          flex:          1,
          overflowX:     "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding:        "24px 32px 16px",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-start",
            flexWrap:       "wrap",
            gap:            12,
          }}
        >
          <h2
            style={{
              color:      "#fff",
              fontWeight: 700,
              margin:     0,
              fontFamily: "Syne,sans-serif",
              fontSize:   "1.8rem",
            }}
          >
            Reports
          </h2>

          <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
            {/* Bell / Reminders */}
            <div className="bell-area" style={{ position: "relative" }}>
              <button
                onClick={() => setBellOpen(!bellOpen)}
                style={{
                  width:        42,
                  height:       42,
                  borderRadius: 12,
                  border:       "none",
                  background:   "rgba(255,255,255,0.15)",
                  color:        "white",
                  fontSize:     "1.2rem",
                  cursor:       "pointer",
                  position:     "relative",
                }}
              >
                🔔
                {reminders.length > 0 && (
                  <span
                    style={{
                      position:       "absolute",
                      top:            -4,
                      right:          -4,
                      background:     "#dc3545",
                      color:          "white",
                      fontSize:       ".65rem",
                      borderRadius:   "50%",
                      width:          18,
                      height:         18,
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      fontWeight:     700,
                    }}
                  >
                    {reminders.length}
                  </span>
                )}
              </button>

              {/* Reminders Dropdown */}
              {bellOpen && (
                <div
                  style={{
                    position:       "absolute",
                    top:            50,
                    right:          0,
                    width:          300,
                    background:     "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(12px)",
                    borderRadius:   14,
                    boxShadow:      "0 15px 35px rgba(0,0,0,0.25)",
                    zIndex:         999,
                    overflow:       "hidden",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      padding:    "10px 14px",
                      background: "linear-gradient(135deg,#1e5bb8,#4c84e0)",
                      color:      "white",
                    }}
                  >
                    Reminders
                  </div>

                  <ul
                    style={{
                      listStyle: "none",
                      padding:   "8px 8px 4px",
                      margin:    0,
                    }}
                  >
                    {reminders.length === 0 ? (
                      <li
                        style={{
                          padding:  "8px 14px",
                          color:    "#999",
                          fontSize: ".85rem",
                        }}
                      >
                        No reminders
                      </li>
                    ) : (
                      reminders.map((r, i) => (
                        <li
                          key={i}
                          style={{
                            display:        "flex",
                            justifyContent: "space-between",
                            alignItems:     "center",
                            padding:        "8px 14px",
                            borderBottom:   "1px solid #f0f4ff",
                          }}
                        >
                          <span style={{ fontSize: ".83rem", color: "#1e3a6e" }}>
                            {r.text}{" "}
                            <small style={{ color: "#999" }}>- {r.date}</small>
                          </span>
                          <button
                            onClick={() =>
                              setReminders(
                                reminders.filter((_, j) => j !== i)
                              )
                            }
                            style={{
                              background:   "#dc3545",
                              border:       "none",
                              borderRadius: 6,
                              color:        "white",
                              cursor:       "pointer",
                              padding:      "2px 7px",
                              fontSize:     ".75rem",
                            }}
                          >
                            ×
                          </button>
                        </li>
                      ))
                    )}
                  </ul>

                  {/* Add Reminder Form */}
                  <div
                    style={{
                      display:  "flex",
                      gap:      6,
                      padding:  8,
                      flexWrap: "wrap",
                    }}
                  >
                    <input
                      value={reminderInput}
                      onChange={(e) => setReminderInput(e.target.value)}
                      placeholder="Reminder..."
                      style={{
                        flex:         1,
                        padding:      "6px 10px",
                        borderRadius: 8,
                        border:       "1.5px solid #dde4f5",
                        fontSize:     ".83rem",
                        minWidth:     0,
                      }}
                    />
                    <input
                      type="date"
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                      style={{
                        flex:         1,
                        padding:      "6px 8px",
                        borderRadius: 8,
                        border:       "1.5px solid #dde4f5",
                        fontSize:     ".83rem",
                        minWidth:     0,
                      }}
                    />
                    <button
                      onClick={addReminder}
                      style={{
                        padding:      "6px 12px",
                        borderRadius: 8,
                        border:       "none",
                        background:   "#1e5bb8",
                        color:        "white",
                        fontWeight:   600,
                        cursor:       "pointer",
                        fontSize:     ".83rem",
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(true)}
              style={{
                width:        42,
                height:       42,
                borderRadius: 12,
                border:       "none",
                background:   "rgba(255,255,255,0.15)",
                color:        "#ffd86b",
                fontSize:     "1.2rem",
                cursor:       "pointer",
              }}
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* ── Page Body ── */}
        <div style={{ padding: "0 32px" }}>

          {/* Summary Cards */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap:                 16,
              marginBottom:        28,
            }}
          >
            {summaryCards.map(({ label, val, icon, bg }) => (
              <div
                key={label}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "")
                }
                style={{
                  borderRadius:   18,
                  background:     bg,
                  color:          "white",
                  padding:        "18px 20px",
                  boxShadow:      "0 6px 18px rgba(0,0,0,0.18)",
                  display:        "flex",
                  justifyContent: "space-between",
                  alignItems:     "center",
                  transition:     "transform .2s",
                  cursor:         "default",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize:     ".78rem",
                      opacity:      0.85,
                      margin:       "0 0 5px",
                    }}
                  >
                    {label}
                  </p>
                  <h3
                    style={{
                      margin:     0,
                      fontWeight: 700,
                      fontSize:   typeof val === "string" && val.length > 10
                        ? "1.05rem"
                        : "1.7rem",
                    }}
                  >
                    {val}
                  </h3>
                </div>
                <span style={{ fontSize: "2rem", opacity: 0.85 }}>{icon}</span>
              </div>
            ))}
          </div>

          {/* Charts + Table Row */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap:                 20,
              marginBottom:        24,
            }}
          >
            {/* Donut Chart Panel */}
            <div
              style={{
                background:   "#fff",
                borderRadius: 16,
                padding:      22,
                boxShadow:    "0 4px 18px rgba(0,0,0,0.12)",
              }}
            >
              <h6
                style={{
                  fontWeight:   700,
                  color:        "#1e3a6e",
                  marginBottom: 16,
                  fontSize:     ".93rem",
                }}
              >
                📊 Distribution by Category
              </h6>
              <DonutChart data={donutData} />
            </div>

            {/* Category Table Panel */}
            <div
              style={{
                background:   "#fff",
                borderRadius: 16,
                padding:      22,
                boxShadow:    "0 4px 18px rgba(0,0,0,0.12)",
                overflow:     "hidden",
              }}
            >
              <h6
                style={{
                  fontWeight:   700,
                  color:        "#1e3a6e",
                  marginBottom: 16,
                  fontSize:     ".93rem",
                }}
              >
                📋 Projects Per Category
              </h6>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width:          "100%",
                    borderCollapse: "collapse",
                    fontSize:       ".82rem",
                  }}
                >
                  {/* Table Head */}
                  <thead>
                    <tr style={{ background: "#1f1f20", color: "white" }}>
                      {[
                        "Category",
                        "Projects",
                        "Budget",
                        "Male",
                        "Female",
                        "Total",
                        "Share",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding:    "9px 12px",
                            textAlign:  h === "Category" ? "left" : "center",
                            fontWeight: 600,
                            fontSize:   ".75rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {categoryRows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          style={{
                            textAlign: "center",
                            padding:   "24px",
                            color:     "#aaa",
                          }}
                        >
                          No data available.
                        </td>
                      </tr>
                    ) : (
                      categoryRows.map(([cat, v], i) => {
                        const cs =
                          CAT_COLORS[cat] ||
                          { bg: "#e8f0ff", color: "#1e5bb8", accent: "#1e5bb8" };

                        return (
                          <tr
                            key={i}
                            onMouseEnter={() => setHoveredRow(i)}
                            onMouseLeave={() => setHoveredRow(null)}
                            style={{
                              borderBottom: "1px solid #f0f4ff",
                              background:   hoveredRow === i
                                ? "rgba(30,91,184,0.04)"
                                : i % 2 === 0 ? "#fff" : "#fafbff",
                              transition:   "background .12s",
                            }}
                          >
                            {/* Category Badge */}
                            <td style={{ padding: "10px 12px" }}>
                              <span
                                style={{
                                  display:      "inline-block",
                                  padding:      "3px 10px",
                                  borderRadius: 8,
                                  background:   cs.bg,
                                  color:        cs.color,
                                  fontSize:     ".68rem",
                                  fontWeight:   700,
                                }}
                              >
                                {cat.length > 32
                                  ? cat.slice(0, 32) + "…"
                                  : cat}
                              </span>
                            </td>

                            {/* Project Count */}
                            <td
                              style={{
                                padding:    "10px 12px",
                                textAlign:  "center",
                                fontWeight: 700,
                                color:      "#1e5bb8",
                              }}
                            >
                              {v.count}
                            </td>

                            {/* Budget */}
                            <td
                              style={{
                                padding:    "10px 12px",
                                textAlign:  "center",
                                fontWeight: 700,
                                color:      "#28a745",
                                whiteSpace: "nowrap",
                              }}
                            >
                              ₱{v.budget.toLocaleString()}
                            </td>

                            {/* Male */}
                            <td
                              style={{
                                padding:   "10px 12px",
                                textAlign: "center",
                                color:     "#4a5568",
                              }}
                            >
                              {v.male}
                            </td>

                            {/* Female */}
                            <td
                              style={{
                                padding:   "10px 12px",
                                textAlign: "center",
                                color:     "#4a5568",
                              }}
                            >
                              {v.female}
                            </td>

                            {/* Total */}
                            <td
                              style={{
                                padding:    "10px 12px",
                                textAlign:  "center",
                                fontWeight: 600,
                                color:      "#6f42c1",
                              }}
                            >
                              {v.total}
                            </td>

                            {/* Mini Bar */}
                            <td style={{ padding: "10px 16px", minWidth: 100 }}>
                              <MiniBar
                                value={v.budget}
                                max={maxBudget}
                                color={cs.accent}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>

                  {/* Table Footer — Totals Row */}
                  {categoryRows.length > 0 && (
                    <tfoot>
                      <tr
                        style={{
                          background: "#f0f5ff",
                          borderTop:  "2px solid #d0e3ff",
                        }}
                      >
                        <td
                          style={{
                            padding:    "10px 12px",
                            fontWeight: 700,
                            color:      "#1e3a6e",
                            fontSize:   ".8rem",
                          }}
                        >
                          TOTALS
                        </td>
                        <td
                          style={{
                            padding:    "10px 12px",
                            textAlign:  "center",
                            fontWeight: 700,
                            color:      "#1e5bb8",
                          }}
                        >
                          {projects.length}
                        </td>
                        <td
                          style={{
                            padding:    "10px 12px",
                            textAlign:  "center",
                            fontWeight: 700,
                            color:      "#28a745",
                            whiteSpace: "nowrap",
                          }}
                        >
                          ₱{totalBudget.toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding:    "10px 12px",
                            textAlign:  "center",
                            fontWeight: 700,
                            color:      "#4a5568",
                          }}
                        >
                          {projects.reduce(
                            (s, p) => s + Number(p.male || 0), 0
                          )}
                        </td>
                        <td
                          style={{
                            padding:    "10px 12px",
                            textAlign:  "center",
                            fontWeight: 700,
                            color:      "#4a5568",
                          }}
                        >
                          {projects.reduce(
                            (s, p) => s + Number(p.female || 0), 0
                          )}
                        </td>
                        <td
                          style={{
                            padding:    "10px 12px",
                            textAlign:  "center",
                            fontWeight: 700,
                            color:      "#6f42c1",
                          }}
                        >
                          {totalBeneficiaries}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>

          {/* Beneficiary Overview */}
          <div
            style={{
              background:   "#fff",
              borderRadius: 16,
              padding:      22,
              boxShadow:    "0 4px 18px rgba(0,0,0,0.12)",
              marginBottom: 24,
            }}
          >
            <h6
              style={{
                fontWeight:   700,
                color:        "#1e3a6e",
                marginBottom: 16,
                fontSize:     ".93rem",
              }}
            >
              👥 Beneficiary Overview
            </h6>

            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap:                 14,
              }}
            >
              {[
                {
                  label: "Total Male",
                  val:   projects.reduce((s, p) => s + Number(p.male   || 0), 0),
                  bg:    "linear-gradient(135deg,#1e5bb8,#4c84e0)",
                  icon:  "👨",
                },
                {
                  label: "Total Female",
                  val:   projects.reduce((s, p) => s + Number(p.female || 0), 0),
                  bg:    "linear-gradient(135deg,#c94ea0,#f589cf)",
                  icon:  "👩",
                },
                {
                  label: "Total Beneficiaries",
                  val:   totalBeneficiaries,
                  bg:    "linear-gradient(135deg,#6f42c1,#a66cff)",
                  icon:  "👥",
                },
              ].map(({ label, val, bg, icon }) => (
                <div
                  key={label}
                  style={{
                    borderRadius: 14,
                    background:   bg,
                    color:        "white",
                    padding:      "20px 22px",
                    textAlign:    "center",
                    boxShadow:    "0 4px 14px rgba(0,0,0,0.15)",
                  }}
                >
                  <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>
                    {icon}
                  </div>
                  <div
                    style={{
                      fontSize:     ".78rem",
                      opacity:      0.85,
                      marginBottom: 4,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: "1.9rem", fontWeight: 700 }}>
                    {val.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Households Stat Banner */}
          <div
            style={{
              background:     "rgba(255,255,255,0.12)",
              borderRadius:   16,
              padding:        "16px 22px",
              marginBottom:   24,
              display:        "flex",
              alignItems:     "center",
              gap:            16,
              backdropFilter: "blur(10px)",
            }}
          >
            <span style={{ fontSize: "2rem" }}>🏠</span>
            <div>
              <div
                style={{
                  color:        "rgba(255,255,255,0.8)",
                  fontSize:     ".82rem",
                  marginBottom: 2,
                }}
              >
                Total Households Reached
              </div>
              <div
                style={{
                  color:      "white",
                  fontWeight: 700,
                  fontSize:   "1.6rem",
                }}
              >
                {totalHH.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div
            style={{
              display:      "flex",
              gap:          12,
              flexWrap:     "wrap",
              marginBottom: 32,
            }}
          >
            {/* Export CSV Button */}
            <button
              onClick={exportCSV}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(40,167,69,0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(40,167,69,0.4)";
              }}
              style={{
                flex:           1,
                minWidth:       160,
                padding:        "13px 20px",
                borderRadius:   12,
                border:         "none",
                background:     "linear-gradient(135deg,#28a745,#6bd38d)",
                color:          "white",
                fontWeight:     700,
                fontSize:       ".92rem",
                cursor:         "pointer",
                boxShadow:      "0 4px 14px rgba(40,167,69,0.4)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            8,
                transition:     "transform .2s, box-shadow .2s",
              }}
            >
              📥 Export CSV / Excel
            </button>

            {/* Print / PDF Button */}
            <button
              onClick={() => window.print()}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(220,53,69,0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(220,53,69,0.4)";
              }}
              style={{
                flex:           1,
                minWidth:       160,
                padding:        "13px 20px",
                borderRadius:   12,
                border:         "none",
                background:     "linear-gradient(135deg,#dc3545,#ff6b7a)",
                color:          "white",
                fontWeight:     700,
                fontSize:       ".92rem",
                cursor:         "pointer",
                boxShadow:      "0 4px 14px rgba(220,53,69,0.4)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            8,
                transition:     "transform .2s, box-shadow .2s",
              }}
            >
              🖨️ Print / PDF
            </button>
          </div>
        </div>
      </main>

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────

const INITIAL_DATA = [
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

// ── Table Column Config ────────────────────────────────────
const COLUMNS = [
  { key: "#",          label: "#",            wrap: false },
  { key: "community",  label: "Community",    wrap: true  },
  { key: "focal",      label: "Focal Person", wrap: true  },
  { key: "contact",    label: "Contact",      wrap: false },
  { key: "address",    label: "Address",      wrap: true  },
  { key: "date",       label: "Date",         wrap: false },
  { key: "category",   label: "Category",     wrap: true  },
  { key: "duration",   label: "Duration",     wrap: false },
  { key: "budget",     label: "Budget (₱)",   wrap: false },
  { key: "households", label: "HH",           wrap: false },
  { key: "male",       label: "Male",         wrap: false },
  { key: "female",     label: "Female",       wrap: false },
  { key: "total",      label: "Total",        wrap: false },
];

// ─────────────────────────────────────────────────────────
// SETTINGS PANEL COMPONENT
// ─────────────────────────────────────────────────────────

function SettingsPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    fullname: "Admin User",
    username: "admin",
    email:    "admin@cest.gov.ph",
  });
  const [editing,  setEditing]  = useState(false);
  const [editForm, setEditForm] = useState({});
  const [alert,    setAlert]    = useState(null);
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
        zIndex:         2000,
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
          <span
            style={{
              fontFamily: "Syne,sans-serif",
              fontWeight: 700,
              fontSize:   "1.1rem",
            }}
          >
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
        <div
          style={{
            display:      "flex",
            borderBottom: "1px solid #eee",
            background:   "#f8faff",
          }}
        >
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
                borderBottom: activeTab === t
                  ? "2px solid #1e5bb8"
                  : "2px solid transparent",
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
              {/* Avatar */}
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
                <div style={{ fontWeight: 700, color: "#1e3a6e", marginTop: 8 }}>
                  {profile.fullname}
                </div>
                <div style={{ fontSize: ".82rem", color: "#6c757d" }}>
                  {profile.email}
                </div>
              </div>

              {/* Alert */}
              {alert && (
                <div
                  style={{
                    padding:      "9px 13px",
                    borderRadius: 9,
                    fontSize:     ".83rem",
                    marginBottom: 12,
                    background:   alert.type === "success"
                      ? "rgba(40,167,69,0.12)"
                      : "rgba(220,53,69,0.1)",
                    border: `1px solid ${
                      alert.type === "success"
                        ? "rgba(40,167,69,0.3)"
                        : "rgba(220,53,69,0.28)"
                    }`,
                    color: alert.type === "success" ? "#1a6b2e" : "#b02020",
                  }}
                >
                  {alert.msg}
                </div>
              )}

              {/* View Mode */}
              {!editing ? (
                <div>
                  {[
                    ["Full Name",      profile.fullname],
                    ["Username",       profile.username],
                    ["Email Address",  profile.email],
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
                        <div
                          style={{
                            fontSize:      ".75rem",
                            color:         "#6c757d",
                            textTransform: "uppercase",
                            letterSpacing: ".5px",
                          }}
                        >
                          {lbl}
                        </div>
                        <div
                          style={{
                            fontSize:   ".93rem",
                            fontWeight: 500,
                            color:      "#1e3a6e",
                          }}
                        >
                          {val}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setEditForm({ ...profile });
                      setEditing(true);
                    }}
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
                // Edit Mode
                <div>
                  {[
                    ["Full Name",     "fullname"],
                    ["Username",      "username"],
                    ["Email Address", "email"],
                  ].map(([lbl, key]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <label
                        style={{
                          display:       "block",
                          fontSize:      ".75rem",
                          fontWeight:    600,
                          color:         "#6c757d",
                          textTransform: "uppercase",
                          letterSpacing: ".4px",
                          marginBottom:  5,
                        }}
                      >
                        {lbl}
                      </label>
                      <input
                        value={editForm[key] || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, [key]: e.target.value })
                        }
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
                    style={{
                      width:        "100%",
                      padding:      11,
                      border:       "none",
                      borderRadius: 10,
                      background:   "linear-gradient(135deg,#1e5bb8,#4c84e0)",
                      color:        "white",
                      fontWeight:   700,
                      fontSize:     ".95rem",
                      cursor:       "pointer",
                      marginBottom: 8,
                    }}
                  >
                    ✅ Save Changes
                  </button>

                  <button
                    onClick={() => setEditing(false)}
                    style={{
                      width:        "100%",
                      padding:      10,
                      border:       "1.5px solid #dde4f5",
                      borderRadius: 10,
                      background:   "white",
                      color:        "#6c757d",
                      fontWeight:   500,
                      fontSize:     ".9rem",
                      cursor:       "pointer",
                    }}
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
                    <div
                      style={{
                        fontSize:      ".75rem",
                        color:         "#6c757d",
                        textTransform: "uppercase",
                      }}
                    >
                      {lbl}
                    </div>
                    <div
                      style={{
                        fontSize:   ".93rem",
                        fontWeight: 500,
                        color:      "#1e3a6e",
                      }}
                    >
                      {val}
                    </div>
                  </div>
                </div>
              ))}

              <div
                style={{
                  padding:      "12px 14px",
                  borderRadius: 10,
                  background:   "#f4f7ff",
                }}
              >
                <div
                  style={{
                    fontSize:      ".75rem",
                    color:         "#6c757d",
                    textTransform: "uppercase",
                    marginBottom:  6,
                  }}
                >
                  Theme
                </div>
                <select
                  style={{
                    padding:      "6px 10px",
                    borderRadius: 8,
                    border:       "1.5px solid #dde4f5",
                    fontSize:     ".85rem",
                    color:        "#1e3a6e",
                    background:   "#fff",
                    cursor:       "pointer",
                  }}
                >
                  <option>Blue (Default)</option>
                  <option>Dark</option>
                  <option>Teal</option>
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
                {
                  key:   "reminder",
                  label: "Reminder Alerts",
                  sub:   "Notify when a reminder is due",
                },
                {
                  key:   "projects",
                  label: "Project Updates",
                  sub:   "Status changes on projects",
                },
                {
                  key:   "system",
                  label: "System Announcements",
                  sub:   "News and updates from CEST",
                },
              ].map(({ key, label, sub }) => (
                <div
                  key={key}
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
                    <div
                      style={{
                        fontSize:   ".9rem",
                        fontWeight: 500,
                        color:      "#1e3a6e",
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontSize: ".76rem", color: "#6c757d" }}>
                      {sub}
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <div
                    onClick={() =>
                      setNotifs({ ...notifs, [key]: !notifs[key] })
                    }
                    style={{
                      width:      44,
                      height:     24,
                      borderRadius: 12,
                      background: notifs[key] ? "#1e5bb8" : "#ccc",
                      cursor:     "pointer",
                      position:   "relative",
                      transition: "background .2s",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width:        18,
                        height:       18,
                        borderRadius: "50%",
                        background:   "#fff",
                        position:     "absolute",
                        top:          3,
                        left:         notifs[key] ? 23 : 3,
                        transition:   "left .2s",
                      }}
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
// MAIN DOCUMENTS COMPONENT
// ─────────────────────────────────────────────────────────

export default function CESTDocuments() {
  const navigate = useNavigate();
  const location = useLocation();

  // ── State ──────────────────────────────────────────────
  const [data] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cestData")) || INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });
  const [search,        setSearch]        = useState("");
  const [sortCol,       setSortCol]       = useState(null);
  const [sortAsc,       setSortAsc]       = useState(true);
  const [showSettings,  setShowSettings]  = useState(false);
  const [sidebarOpen,   setSidebarOpen]   = useState(false);
  const [bellOpen,      setBellOpen]      = useState(false);
  const [reminders,     setReminders]     = useState([
    { text: "Review Q1 Report", date: "2025-03-01" },
  ]);
  const [reminderInput, setReminderInput] = useState("");
  const [reminderDate,  setReminderDate]  = useState("");
  const [hoveredRow,    setHoveredRow]    = useState(null);
  const [hoveredCol,    setHoveredCol]    = useState(null);
  const tableRef = useRef();

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

  // ── Filter Data ────────────────────────────────────────
  const filtered = data.filter((e) => {
    const q = search.toLowerCase();
    return (
      !q ||
      (e.community || "").toLowerCase().includes(q) ||
      (e.focal     || "").toLowerCase().includes(q) ||
      (e.category  || "").toLowerCase().includes(q) ||
      (e.address   || "").toLowerCase().includes(q)
    );
  });

  // ── Sort Data ──────────────────────────────────────────
  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0;
    const av  = a[sortCol] ?? "";
    const bv  = b[sortCol] ?? "";
    const cmp = typeof av === "number"
      ? av - bv
      : String(av).localeCompare(String(bv));
    return sortAsc ? cmp : -cmp;
  });

  // ── Toggle Sort Column ─────────────────────────────────
  function toggleSort(key) {
    if (key === "#") return;
    if (sortCol === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(key);
      setSortAsc(true);
    }
  }

  // ── Cell Value Formatter ───────────────────────────────
  function cellValue(row, key, i) {
    switch (key) {
      case "#":          return i + 1;
      case "budget":     return "₱" + Number(row.budget || 0).toLocaleString();
      case "households": return row.households || "—";
      case "male":       return row.male   ?? 0;
      case "female":     return row.female ?? 0;
      case "total":      return row.total  ?? 0;
      default:           return row[key]   || "—";
    }
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

  // ── Export CSV ─────────────────────────────────────────
  function exportCSV() {
    const headers = COLUMNS.map((c) => c.label).join(",");
    const rows = sorted.map((row, i) =>
      COLUMNS.map((c) => {
        const v = cellValue(row, c.key, i);
        return `"${String(v).replace(/"/g, '""')}"`;
      }).join(",")
    );
    const blob = new Blob(
      [[headers, ...rows].join("\n")],
      { type: "text/csv" }
    );
    const a = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = "cest_documents.csv";
    a.click();
  }

  // ── Dynamic Style Helpers ──────────────────────────────
  const thStyle = (key) => ({
    padding:    "10px 12px",
    textAlign:  "left",
    fontWeight: 700,
    fontSize:   ".78rem",
    whiteSpace: "nowrap",
    background: hoveredCol === key && key !== "#"
      ? "#1547a0"
      : "transparent",
    cursor:     key !== "#" ? "pointer" : "default",
    userSelect: "none",
    transition: "background .15s",
  });

  const tdStyle = (wrap, rowIdx, colKey) => ({
    padding:     "9px 12px",
    fontSize:    ".8rem",
    color:       "#1e3a6e",
    borderBottom:"1px solid #edf2ff",
    whiteSpace:  wrap ? "normal" : "nowrap",
    minWidth:    wrap ? 120 : undefined,
    textAlign:   colKey === "#" ? "center" : "left",
    background:  hoveredRow === rowIdx
      ? "rgba(30,91,184,0.06)"
      : rowIdx % 2 === 0 ? "#fff" : "#fafbff",
    transition:  "background .12s",
  });

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
          width:        250,
          background:   "#fff",
          color:        "#1e5bb8",
          position:     "fixed",
          top:          0,
          left:         0,
          height:       "100vh",
          zIndex:       1060,
          borderRight:  "1px solid #e9ecef",
          boxShadow:    "4px 0 20px rgba(0,0,0,0.08)",
          display:      "flex",
          flexDirection:"column",
          transition:   "transform .3s ease",
          overflowY:    "auto",
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
              width:       200,
              height:      100,
              objectFit:   "contain",
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
        style={{
          background:  "#0c52c4",
          minHeight:   "100vh",
          paddingBottom: 40,
          marginLeft:  250,
          flex:        1,
          overflowX:   "hidden",
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
            Documents
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
                      display:   "flex",
                      gap:       6,
                      padding:   8,
                      flexWrap:  "wrap",
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

          {/* Toolbar */}
          <div
            style={{
              display:     "flex",
              gap:         12,
              marginBottom:16,
              flexWrap:    "wrap",
              alignItems:  "center",
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: "relative",
                flex:     1,
                minWidth: 220,
              }}
            >
              <span
                style={{
                  position:      "absolute",
                  left:          12,
                  top:           "50%",
                  transform:     "translateY(-50%)",
                  color:         "#aab",
                  fontSize:      "1rem",
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by community, focal person, or category..."
                style={{
                  width:        "100%",
                  padding:      "10px 14px 10px 36px",
                  borderRadius: 10,
                  border:       "none",
                  fontSize:     ".88rem",
                  outline:      "none",
                  boxSizing:    "border-box",
                  boxShadow:    "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
            </div>

            {/* Export CSV Button */}
            <button
              onClick={exportCSV}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
              style={{
                padding:        "10px 18px",
                borderRadius:   10,
                border:         "none",
                background:     "rgba(255,255,255,0.15)",
                color:          "white",
                fontWeight:     600,
                fontSize:       ".85rem",
                cursor:         "pointer",
                backdropFilter: "blur(10px)",
                display:        "flex",
                alignItems:     "center",
                gap:            6,
                whiteSpace:     "nowrap",
                transition:     "background .2s",
              }}
            >
              ⬇️ Export CSV
            </button>
          </div>

          {/* Record Count */}
          <div
            style={{
              color:        "rgba(255,255,255,0.75)",
              fontSize:     ".8rem",
              marginBottom: 10,
            }}
          >
            Showing{" "}
            <strong style={{ color: "white" }}>{sorted.length}</strong> of{" "}
            <strong style={{ color: "white" }}>{data.length}</strong>{" "}
            record{data.length !== 1 ? "s" : ""}
            {search && (
              <span>
                {" "}for "<em>{search}</em>"
              </span>
            )}
          </div>

          {/* ── Data Table ── */}
          <div
            style={{
              borderRadius: 16,
              overflow:     "hidden",
              boxShadow:    "0 4px 20px rgba(0,0,0,0.18)",
              marginBottom: 32,
            }}
          >
            <div
              ref={tableRef}
              style={{
                width:                  "100%",
                overflowX:              "auto",
                WebkitOverflowScrolling:"touch",
              }}
            >
              <table
                style={{
                  width:           "100%",
                  borderCollapse:  "collapse",
                  background:      "#fff",
                  tableLayout:     "auto",
                  minWidth:        900,
                }}
              >
                {/* Table Head */}
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(135deg,#1e5bb8,#2a6bd4)",
                      color:      "#fff",
                    }}
                  >
                    {COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        style={thStyle(col.key)}
                        onClick={() => toggleSort(col.key)}
                        onMouseEnter={() => setHoveredCol(col.key)}
                        onMouseLeave={() => setHoveredCol(null)}
                      >
                        <span
                          style={{
                            display:    "inline-flex",
                            alignItems: "center",
                            gap:        4,
                          }}
                        >
                          {col.label}
                          {col.key !== "#" && (
                            <span
                              style={{
                                opacity:  sortCol === col.key ? 1 : 0.35,
                                fontSize: ".65rem",
                              }}
                            >
                              {sortCol === col.key
                                ? sortAsc ? "▲" : "▼"
                                : "⇅"}
                            </span>
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {sorted.length === 0 ? (
                    <tr>
                      <td
                        colSpan={COLUMNS.length}
                        style={{
                          textAlign: "center",
                          padding:   "32px 16px",
                          color:     "#aaa",
                          fontSize:  ".9rem",
                        }}
                      >
                        <div style={{ fontSize: "2rem", marginBottom: 8 }}>📭</div>
                        No records found{search ? ` for "${search}"` : ""}.
                      </td>
                    </tr>
                  ) : (
                    sorted.map((row, i) => (
                      <tr
                        key={i}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        {COLUMNS.map((col) => (
                          <td
                            key={col.key}
                            style={tdStyle(col.wrap, i, col.key)}
                          >
                            {/* Cell Content by Column Type */}
                            {col.key === "budget" ? (
                              <span
                                style={{
                                  fontWeight: 700,
                                  color:      "#1e5bb8",
                                }}
                              >
                                {cellValue(row, col.key, i)}
                              </span>
                            ) : col.key === "category" ? (
                              <span
                                style={{
                                  display:      "inline-block",
                                  padding:      "2px 8px",
                                  borderRadius: 8,
                                  background:   "#e8f0ff",
                                  color:        "#1e5bb8",
                                  fontSize:     ".72rem",
                                  fontWeight:   600,
                                }}
                              >
                                {cellValue(row, col.key, i)}
                              </span>
                            ) : col.key === "#" ? (
                              <span
                                style={{
                                  fontWeight: 700,
                                  color:      "#999",
                                  fontSize:   ".75rem",
                                }}
                              >
                                {cellValue(row, col.key, i)}
                              </span>
                            ) : (
                              cellValue(row, col.key, i)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>

                {/* Table Footer — Totals Row */}
                {sorted.length > 0 && (
                  <tfoot>
                    <tr
                      style={{
                        background:  "#f0f5ff",
                        borderTop:   "2px solid #d0e3ff",
                      }}
                    >
                      {COLUMNS.map((col) => {
                        const numCols = [
                          "budget",
                          "households",
                          "male",
                          "female",
                          "total",
                        ];

                        if (col.key === "community") {
                          return (
                            <td
                              key={col.key}
                              style={{
                                padding:    "10px 12px",
                                fontSize:   ".78rem",
                                fontWeight: 700,
                                color:      "#1e3a6e",
                              }}
                            >
                              TOTALS
                            </td>
                          );
                        }

                        if (numCols.includes(col.key)) {
                          const sum = sorted.reduce(
                            (s, r) => s + Number(r[col.key] || 0),
                            0
                          );
                          return (
                            <td
                              key={col.key}
                              style={{
                                padding:    "10px 12px",
                                fontSize:   ".8rem",
                                fontWeight: 700,
                                color:      "#1e5bb8",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {col.key === "budget"
                                ? "₱" + sum.toLocaleString()
                                : sum}
                            </td>
                          );
                        }

                        return (
                          <td
                            key={col.key}
                            style={{ padding: "10px 12px" }}
                          />
                        );
                      })}
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* ── Settings Modal ── */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
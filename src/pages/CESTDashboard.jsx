import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ← ADDED

const INITIAL_PROJECTS = [
  { community: "Community A", category: "SUSTAINABLE ENTERPRISE AND LIVELIHOODS", budget: 250000, focal: "Maria Santos", contact: "09171234567", address: "Barangay 1, Quezon City", date: "2024-01-15", duration: "6 months", households: 20, male: 40, female: 40, total: 80 },
  { community: "Community B", category: "HEALTH AND NUTRITION", budget: 300000, focal: "Jose Reyes", contact: "09281234567", address: "Barangay 5, Manila", date: "2024-03-10", duration: "12 months", households: 30, male: 60, female: 60, total: 120 },
  { community: "Community C", category: "HUMAN RESOURCE DEVELOPMENT", budget: 150000, focal: "Ana Cruz", contact: "09391234567", address: "Barangay 10, Makati", date: "2024-06-01", duration: "3 months", households: 15, male: 28, female: 32, total: 60 },
];

const CATEGORIES = [
  "SUSTAINABLE ENTERPRISE AND LIVELIHOODS",
  "HEALTH AND NUTRITION",
  "HUMAN RESOURCE DEVELOPMENT",
  "DRRM AND CCA",
  "BIO CIRCULAR GREEN ECONOMY TECHNOLOGIES",
  "DIGITAL GOVERNANCE TOOLS",
];

function getProjectStatus(p) {
  if (!p.endDate) return "Active";
  return new Date().toISOString().split("T")[0] >= p.endDate ? "Completed" : "Active";
}

function fmt(n) {
  return "₱" + Number(n || 0).toLocaleString();
}

// ── Bar Chart (SVG) ──────────────────────────────────────────────────────────
function BarChart({ projects }) {
  const max = Math.max(...projects.map((p) => p.budget), 1);
  const W = 480, H = 160, pad = 40, gap = 8;
  const barW = projects.length ? Math.max(8, (W - pad * 2 - gap * (projects.length - 1)) / projects.length) : 40;
  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} width="100%" style={{ overflow: "visible" }}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = pad + (1 - t) * H;
        return (
          <g key={t}>
            <line x1={pad} y1={y} x2={W - 10} y2={y} stroke="#e0e7ff" strokeWidth="1" />
            <text x={pad - 4} y={y + 4} fontSize="9" fill="#888" textAnchor="end">
              {t === 0 ? "0" : `₱${((max * t) / 1000).toFixed(0)}k`}
            </text>
          </g>
        );
      })}
      {projects.map((p, i) => {
        const bh = ((p.budget / max) * H) || 0;
        const x = pad + i * (barW + gap);
        const y = pad + H - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="4" fill="url(#barGrad)" opacity="0.9" />
            <text x={x + barW / 2} y={H + pad + 14} fontSize="8" fill="#888" textAnchor="middle">
              {p.community.replace("Community ", "C")}
            </text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4c84e0" />
          <stop offset="100%" stopColor="#1e5bb8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Pie Chart (SVG) ──────────────────────────────────────────────────────────
function PieChart({ projects }) {
  const cats = {};
  projects.forEach((p) => { cats[p.category] = (cats[p.category] || 0) + 1; });
  const entries = Object.entries(cats);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  if (!total) return <div style={{ color: "#aaa", textAlign: "center", paddingTop: 40 }}>No data</div>;
  let cum = 0;
  const slices = entries.map(([label, val]) => {
    const pct = val / total;
    const start = cum;
    cum += pct;
    return { label, val, pct, start };
  });
  const R = 70, cx = 90, cy = 80;
  function arc(s) {
    const a1 = s.start * 2 * Math.PI - Math.PI / 2;
    const a2 = (s.start + s.pct) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
    const x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
    const large = s.pct > 0.5 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`;
  }
  const colors = ["#1e5bb8", "#28a745", "#6f42c1", "#fd7e14", "#dc3545", "#20c997"];
  return (
    <svg viewBox="0 0 220 175" width="100%">
      {slices.map((s, i) => (
        <path key={i} d={arc(s)} fill={colors[i % colors.length]} opacity="0.88" />
      ))}
      {slices.map((s, i) => {
        const mid = (s.start + s.pct / 2) * 2 * Math.PI - Math.PI / 2;
        const lx = cx + (R + 18) * Math.cos(mid);
        const ly = cy + (R + 18) * Math.sin(mid);
        return (
          <text key={i} x={lx} y={ly} fontSize="7.5" fill="#444" textAnchor="middle">
            {s.val}
          </text>
        );
      })}
      {slices.map((s, i) => (
        <g key={i} transform={`translate(178, ${12 + i * 16})`}>
          <rect width="10" height="10" rx="3" fill={colors[i % colors.length]} opacity="0.88" />
          <text x="13" y="9" fontSize="7" fill="#444">
            {s.label.length > 22 ? s.label.slice(0, 22) + "…" : s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ project: p, onClose }) {
  if (!p) return null;
  const s = getProjectStatus(p);
  const male = Number(p.male || 0);
  const female = Number(p.female || 0);
  const total = Number(p.total || male + female || 0);
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(4px)" }}>
      <div style={{ background: "#fff", borderRadius: 22, width: "100%", maxWidth: 560, boxShadow: "0 28px 70px rgba(0,0,0,0.35)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem" }}>📁 Project Details</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, color: "white", cursor: "pointer", fontSize: "1rem" }}>✕</button>
        </div>
        <div style={{ padding: 22, overflowY: "auto" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: ".8rem", fontWeight: 600, marginBottom: 18, background: s === "Completed" ? "#d4f5e2" : "#e0f0ff", color: s === "Completed" ? "#1a6b3c" : "#1e5bb8" }}>
            {s === "Completed" ? "✅" : "🔵"} {s}
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Community / Project Name", value: p.community, full: true },
              { label: "Category", value: p.category, full: true },
              { label: "Focal Person", value: p.focal },
              { label: "Contact", value: p.contact },
              { label: "Address", value: p.address, full: true },
              { label: "Date Monitored", value: p.date },
              { label: "Duration", value: p.duration },
              { label: "Budget", value: fmt(p.budget) },
              { label: "Households", value: p.households || "—" },
            ].map(({ label, value, full }) => (
              <div key={label} style={{ background: "#f4f7ff", borderRadius: 12, padding: "12px 14px", gridColumn: full ? "1/-1" : undefined }}>
                <div style={{ fontSize: ".7rem", fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: ".93rem", fontWeight: 500, color: "#1e3a6e" }}>{value || "—"}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: ".7rem", fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>Beneficiaries Breakdown</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[
                { label: "Male", val: male, bg: "linear-gradient(135deg,#1e5bb8,#4c84e0)" },
                { label: "Female", val: female, bg: "linear-gradient(135deg,#c94ea0,#f589cf)" },
                { label: "Total", val: total, bg: "linear-gradient(135deg,#6f42c1,#a66cff)" },
              ].map(({ label, val, bg }) => (
                <div key={label} style={{ background: bg, borderRadius: 12, padding: 12, textAlign: "center", color: "#fff" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: ".7rem", opacity: 0.85, marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Settings Panel ───────────────────────────────────────────────────────────
function SettingsPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ fullname: "Admin User", username: "admin", email: "admin@cest.gov.ph" });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [alert, setAlert] = useState(null);
  const [theme, setTheme] = useState("blue");
  const [notifs, setNotifs] = useState({ reminder: true, projects: true, system: false });

  function saveProfile() {
    if (!editForm.fullname || !editForm.username || !editForm.email) { setAlert({ type: "error", msg: "Please fill in all fields." }); return; }
    setProfile(editForm);
    setEditing(false);
    setAlert({ type: "success", msg: "✓ Profile updated!" });
    setTimeout(() => setAlert(null), 3000);
  }

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(3px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white" }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>⚙️ Settings</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, color: "white", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid #eee", background: "#f8faff" }}>
          {["profile", "preferences", "notifications"].map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "12px 8px", border: "none", background: activeTab === t ? "#fff" : "none", fontWeight: activeTab === t ? 700 : 500, color: activeTab === t ? "#1e5bb8" : "#6c757d", borderBottom: activeTab === t ? "2px solid #1e5bb8" : "2px solid transparent", cursor: "pointer", fontSize: ".82rem", textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ padding: 22 }}>
          {activeTab === "profile" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", color: "white", fontWeight: 700 }}>
                  {profile.fullname?.charAt(0).toUpperCase() || "?"}
                </div>
                <div style={{ fontWeight: 700, color: "#1e3a6e", marginTop: 8 }}>{profile.fullname}</div>
                <div style={{ fontSize: ".82rem", color: "#6c757d" }}>{profile.email}</div>
              </div>
              {alert && <div style={{ padding: "9px 13px", borderRadius: 9, fontSize: ".83rem", marginBottom: 12, background: alert.type === "success" ? "rgba(40,167,69,0.12)" : "rgba(220,53,69,0.1)", border: `1px solid ${alert.type === "success" ? "rgba(40,167,69,0.3)" : "rgba(220,53,69,0.28)"}`, color: alert.type === "success" ? "#1a6b2e" : "#b02020" }}>{alert.msg}</div>}
              {!editing ? (
                <div>
                  {[["Full Name", profile.fullname], ["Username", profile.username], ["Email Address", profile.email]].map(([lbl, val]) => (
                    <div key={lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#f4f7ff", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase", letterSpacing: ".5px" }}>{lbl}</div>
                        <div style={{ fontSize: ".93rem", fontWeight: 500, color: "#1e3a6e" }}>{val}</div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => { setEditForm({ ...profile }); setEditing(true); }} style={{ padding: "8px 18px", border: "none", borderRadius: 9, background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white", fontSize: ".83rem", fontWeight: 600, cursor: "pointer", marginTop: 14 }}>✏️ Edit Profile</button>
                </div>
              ) : (
                <div>
                  {[["Full Name", "fullname"], ["Username", "username"], ["Email Address", "email"]].map(([lbl, key]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <label style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 5 }}>{lbl}</label>
                      <input value={editForm[key] || ""} onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #dde4f5", borderRadius: 10, fontSize: ".9rem", color: "#1e3a6e", background: "#f8faff", outline: "none" }} />
                    </div>
                  ))}
                  <button onClick={saveProfile} style={{ width: "100%", padding: 11, border: "none", borderRadius: 10, background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white", fontWeight: 700, fontSize: ".95rem", cursor: "pointer", marginBottom: 8 }}>✅ Save Changes</button>
                  <button onClick={() => setEditing(false)} style={{ width: "100%", padding: 10, border: "1.5px solid #dde4f5", borderRadius: 10, background: "white", color: "#6c757d", fontWeight: 500, fontSize: ".9rem", cursor: "pointer" }}>Cancel</button>
                </div>
              )}
            </div>
          )}
          {activeTab === "preferences" && (
            <div>
              <p style={{ color: "#6c757d", fontSize: ".85rem", marginBottom: 16 }}>Customize your dashboard experience.</p>
              {[["Language", "English (Philippines)"], ["Date Format", "MM/DD/YYYY"]].map(([lbl, val]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#f4f7ff", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase" }}>{lbl}</div>
                    <div style={{ fontSize: ".93rem", fontWeight: 500, color: "#1e3a6e" }}>{val}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "12px 14px", borderRadius: 10, background: "#f4f7ff" }}>
                <div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase", marginBottom: 6 }}>Theme</div>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ padding: "6px 10px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: ".85rem", color: "#1e3a6e", background: "#fff", cursor: "pointer" }}>
                  <option value="blue">Blue (Default)</option>
                  <option value="dark">Dark</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div>
              <p style={{ color: "#6c757d", fontSize: ".85rem", marginBottom: 16 }}>Manage how you receive alerts.</p>
              {[
                { key: "reminder", label: "Reminder Alerts", sub: "Notify when a reminder is due" },
                { key: "projects", label: "Project Updates", sub: "Status changes on projects" },
                { key: "system", label: "System Announcements", sub: "News and updates from CEST" },
              ].map(({ key, label, sub }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#f4f7ff", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: ".9rem", fontWeight: 500, color: "#1e3a6e" }}>{label}</div>
                    <div style={{ fontSize: ".76rem", color: "#6c757d" }}>{sub}</div>
                  </div>
                  <div onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })} style={{ width: 44, height: 24, borderRadius: 12, background: notifs[key] ? "#1e5bb8" : "#ccc", cursor: "pointer", position: "relative", transition: "background .2s" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: notifs[key] ? 23 : 3, transition: "left .2s" }} />
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

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function CESTDashboard() {
  const navigate = useNavigate();   // ← ADDED
  const location = useLocation();   // ← ADDED (to highlight active link)

  const [projects] = useState(INITIAL_PROJECTS);
  const [filtered, setFiltered] = useState(INITIAL_PROJECTS);
  const [tableLabel, setTableLabel] = useState("Project List");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showCharts, setShowCharts] = useState(true);
  const [searchDDOpen, setSearchDDOpen] = useState(false);
  const [catDDOpen, setCatDDOpen] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [reminders, setReminders] = useState([{ text: "Review Q1 Report", date: "2025-03-01", notified: false }]);
  const [reminderInput, setReminderInput] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [toast, setToast] = useState(null);
  const bellRef = useRef();

  // ── Nav Links with routes ──────────────────────────────────────────────────
  const navLinks = [
    { icon: "🏠", label: "Dashboard",  path: "/dashboard"  },
    { icon: "✏️", label: "Data Entry", path: "/data-entry" },
    { icon: "📋", label: "Projects",   path: "/projects"   },
    { icon: "📁", label: "Documents",  path: "/documents"  },
    { icon: "📊", label: "Reports",    path: "/reports"    },
  ];

  useEffect(() => {
    function handler(e) {
      if (!e.target.closest(".bell-area")) setBellOpen(false);
      if (!e.target.closest(".search-wrap") && !e.target.closest(".cat-wrap")) {
        setSearchDDOpen(false);
        setCatDDOpen(false);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  function onSearch(val) {
    setSearch(val);
    setCategory("");
    if (!val) { setFiltered(projects); setShowCharts(true); setTableLabel("Project List"); setSearchDDOpen(false); return; }
    const q = val.toLowerCase();
    const f = projects.filter((p) =>
      (p.community || "").toLowerCase().includes(q) ||
      (p.focal || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q) ||
      (p.address || "").toLowerCase().includes(q)
    );
    setFiltered(f);
    setShowCharts(false);
    setTableLabel(`Search: "${val}"`);
    setSearchDDOpen(true);
  }

  function onCategory(val) {
    setCategory(val);
    setSearch("");
    if (!val) { setFiltered(projects); setShowCharts(true); setTableLabel("Project List"); setCatDDOpen(false); return; }
    const f = projects.filter((p) => p.category === val);
    setFiltered(f);
    setShowCharts(false);
    setTableLabel(`Category: ${val}`);
    setCatDDOpen(true);
  }

  function selectResult(p) {
    setSearchDDOpen(false);
    setCatDDOpen(false);
    setSearch(p.community);
    setFiltered([p]);
    setShowCharts(false);
    setTableLabel(`Showing: ${p.community}`);
  }

  function addReminder() {
    if (!reminderInput || !reminderDate) return;
    setReminders([...reminders, { text: reminderInput, date: reminderDate, notified: false }]);
    setReminderInput("");
    setReminderDate("");
  }

  const totalBudget = filtered.reduce((s, p) => s + Number(p.budget || 0), 0);
  const uniqueCom = new Set(filtered.map((p) => p.community)).size;
  const active = filtered.filter((p) => getProjectStatus(p) === "Active").length;
  const done = filtered.filter((p) => getProjectStatus(p) === "Completed").length;

  const statCards = [
    { label: "CEST Projects", val: filtered.length, icon: "📊", bg: "linear-gradient(135deg,#1e5bb8,#4c84e0)" },
    { label: "Communities", val: uniqueCom, icon: "👥", bg: "linear-gradient(135deg,#28a745,#6bd38d)" },
    { label: "Total Amount Assisted", val: "₱" + totalBudget.toLocaleString(), icon: "💰", bg: "linear-gradient(135deg,#6f42c1,#a66cff)" },
    { label: "Project Status", val: `${active} Active / ${done} Done`, icon: "📈", bg: "linear-gradient(135deg,#ff7a18,#ffb347)" },
  ];

  const ddFiltered = search ? projects.filter((p) =>
    (p.community || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.focal || "").toLowerCase().includes(search.toLowerCase())
  ) : [];

  const catFiltered = category ? projects.filter((p) => p.category === category) : [];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#4c84e0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", overflow: "hidden" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#1e5bb8", color: "white", padding: "12px 18px", borderRadius: 8, boxShadow: "0 4px 15px rgba(0,0,0,0.35)", zIndex: 9999, fontWeight: 500 }}>{toast}</div>
      )}

      {/* Sidebar Overlay */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1050, backdropFilter: "blur(2px)" }} />}

      {/* Sidebar */}
      <nav style={{ width: 250, background: "#fff", color: "#1e5bb8", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 1060, borderRight: "1px solid #e9ecef", boxShadow: "4px 0 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", transition: "transform .3s ease", overflowY: "auto" }}>
        <div style={{ padding: "20px 5px", borderBottom: "1px solid #f1f1f1", textAlign: "center" }}>
      <img
      src="/images/logo.png"
    style={{ width: 200, height: 100, objectFit: "contain", marginBottom: 8 }}/>
</div>

        {/* ── Nav Links ── */}
        <ul style={{ listStyle: "none", padding: "16px 15px", margin: 0, flex: 1 }}>
          {navLinks.map(({ icon, label, path }) => {
            const isActive = location.pathname === path; // highlights current page
            return (
              <li key={label}>
                <a
                  onClick={() => navigate(path)}  // ← navigates on click
                  style={{
                    color: "#1e5bb8",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 12,
                    marginBottom: 6,
                    transition: "all .3s ease",
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? "linear-gradient(90deg,#cce0ff,#b3d1ff)" : "none",
                    textDecoration: "none",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  {isActive && <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 4, background: "#5036e9", borderRadius: 4 }} />}
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Logout ── */}
        <div style={{ padding: "0 12px 20px" }}>
          <a
            onClick={() => navigate("/")}  // ← goes back to login
            style={{ background: "#f8f9fa", color: "#dc3545", borderRadius: 12, fontWeight: 500, padding: "10px 0", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}
          >
            🚪 Logout
          </a>
        </div>
      </nav>

      {/* Main */}
      <main style={{ background: "#0c52c4", minHeight: "100vh", paddingBottom: 40, marginLeft: 250, flex: 1, overflowX: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "24px 32px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ color: "#fff", fontWeight: 700, margin: 0, fontFamily: "Syne,sans-serif", fontSize: "1.8rem" }}>Dashboard</h2>
          <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
            {/* Bell */}
            <div className="bell-area" style={{ position: "relative" }}>
              <button onClick={() => setBellOpen(!bellOpen)} style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.15)", color: "white", fontSize: "1.2rem", backdropFilter: "blur(10px)", cursor: "pointer", transition: "all .25s ease", position: "relative" }}>
                🔔
                {reminders.length > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -4, background: "#dc3545", color: "white", fontSize: ".65rem", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{reminders.length}</span>
                )}
              </button>
              {bellOpen && (
                <div style={{ position: "absolute", top: 50, right: 0, width: 300, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderRadius: 14, boxShadow: "0 15px 35px rgba(0,0,0,0.25)", zIndex: 999, overflow: "hidden" }}>
                  <div style={{ fontWeight: 600, padding: "10px 14px", background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white" }}>Reminders</div>
                  <ul style={{ listStyle: "none", padding: "8px 8px 4px", margin: 0 }}>
                    {reminders.length === 0 ? (
                      <li style={{ padding: "8px 14px", color: "#999", fontSize: ".85rem" }}>No reminders</li>
                    ) : reminders.map((r, i) => (
                      <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: "1px solid #f0f4ff" }}>
                        <span style={{ fontSize: ".83rem", color: "#1e3a6e" }}>{r.text} <small style={{ color: "#999" }}>- {r.date}</small></span>
                        <button onClick={() => setReminders(reminders.filter((_, j) => j !== i))} style={{ background: "#dc3545", border: "none", borderRadius: 6, color: "white", cursor: "pointer", padding: "2px 7px", fontSize: ".75rem" }}>×</button>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 6, padding: 8 }}>
                    <input value={reminderInput} onChange={(e) => setReminderInput(e.target.value)} placeholder="Reminder..." style={{ flex: 1, padding: "6px 10px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: ".83rem", minWidth: 0 }} />
                    <input type="date" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} style={{ flex: 1, padding: "6px 8px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: ".83rem", minWidth: 0 }} />
                    <button onClick={addReminder} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#1e5bb8", color: "white", fontWeight: 600, cursor: "pointer", fontSize: ".83rem" }}>Add</button>
                  </div>
                </div>
              )}
            </div>
            {/* Settings */}
            <button onClick={() => setShowSettings(true)} style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.15)", color: "#ffd86b", fontSize: "1.2rem", backdropFilter: "blur(10px)", cursor: "pointer" }}>⚙️</button>
          </div>
        </div>

        <div style={{ padding: "0 32px" }}>
          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {statCards.map(({ label, val, icon, bg }) => (
              <div key={label} style={{ borderRadius: 18, background: bg, color: "white", padding: 16, boxShadow: "0 6px 18px rgba(0,0,0,0.18)", transition: "all .25s ease", cursor: "default" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: ".8rem", opacity: 0.85, margin: "0 0 5px" }}>{label}</p>
                    <h3 style={{ margin: 0, fontSize: typeof val === "string" ? "1rem" : "1.7rem", fontWeight: 700 }}>{val}</h3>
                  </div>
                  <span style={{ fontSize: "2.2rem", opacity: 0.85 }}>{icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div className="search-wrap" style={{ flex: 1, minWidth: 220, position: "relative" }}>
              <input
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                onFocus={() => search && setSearchDDOpen(true)}
                placeholder="Search by project, focal person, or address..."
                autoComplete="off"
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "none", fontSize: ".9rem", boxSizing: "border-box", outline: "none" }}
              />
              {searchDDOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", borderRadius: 14, boxShadow: "0 12px 36px rgba(0,0,0,0.22)", zIndex: 600, maxHeight: 380, overflowY: "auto" }}>
                  {ddFiltered.length === 0 ? (
                    <div style={{ padding: 16, textAlign: "center", color: "#999", fontSize: ".85rem" }}>Walang resulta para sa "{search}"</div>
                  ) : (
                    <>
                      <div style={{ padding: "8px 14px 6px", fontSize: ".72rem", fontWeight: 700, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".5px", background: "#f8faff" }}>🔍 {ddFiltered.length} result{ddFiltered.length > 1 ? "s" : ""} found</div>
                      {ddFiltered.map((p, i) => (
                        <div key={i} onClick={() => selectResult(p)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", cursor: "pointer", borderBottom: "1px solid #f0f4ff", transition: "background .15s" }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>📋</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: ".9rem", color: "#1e3a6e" }}>{p.community}</div>
                            <div style={{ fontSize: ".74rem", color: "#6c757d" }}>{p.focal} • {p.address}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: ".85rem", fontWeight: 700, color: "#1e5bb8" }}>{fmt(p.budget)}</div>
                            <span style={{ fontSize: ".68rem", padding: "2px 8px", borderRadius: 12, background: getProjectStatus(p) === "Completed" ? "#d4f5e2" : "#e0f0ff", color: getProjectStatus(p) === "Completed" ? "#1a6b3c" : "#1e5bb8", fontWeight: 600 }}>{getProjectStatus(p)}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="cat-wrap" style={{ minWidth: 220, position: "relative" }}>
              <select value={category} onChange={(e) => onCategory(e.target.value)} style={{ padding: "10px 14px", borderRadius: 10, border: "none", fontSize: ".9rem", background: "#fff", cursor: "pointer", width: "100%", outline: "none" }}>
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {catDDOpen && catFiltered.length > 0 && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", borderRadius: 14, boxShadow: "0 12px 36px rgba(0,0,0,0.22)", zIndex: 600, maxHeight: 380, overflowY: "auto" }}>
                  <div style={{ padding: "8px 14px 6px", fontSize: ".72rem", fontWeight: 700, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".5px", background: "#f8faff" }}>📂 {catFiltered.length} project{catFiltered.length > 1 ? "s" : ""} in this category</div>
                  {catFiltered.map((p, i) => (
                    <div key={i} onClick={() => selectResult(p)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", cursor: "pointer", borderBottom: "1px solid #f0f4ff" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#28a745,#6bd38d)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>📁</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: ".9rem", color: "#1e3a6e" }}>{p.community}</div>
                        <div style={{ fontSize: ".74rem", color: "#6c757d" }}>{p.focal} • {p.address}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: ".85rem", fontWeight: 700, color: "#28a745" }}>{fmt(p.budget)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Charts */}
          {showCharts && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#fff", borderRadius: 15, padding: 20, boxShadow: "0 6px 18px rgba(0,0,0,0.12)" }}>
                <h6 style={{ fontWeight: 600, marginBottom: 12, color: "#1e3a6e" }}>Income Growth by Community Sector (Bar)</h6>
                <BarChart projects={projects} />
              </div>
              <div style={{ background: "#fff", borderRadius: 15, padding: 20, boxShadow: "0 6px 18px rgba(0,0,0,0.12)" }}>
                <h6 style={{ fontWeight: 600, marginBottom: 12, color: "#1e3a6e" }}>Project Distribution (Pie)</h6>
                <PieChart projects={projects} />
              </div>
            </div>
          )}

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 15, padding: 20, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", marginBottom: 24 }}>
            <h6 style={{ fontWeight: 600, color: "#1e3a6e", marginBottom: 14 }}>{tableLabel}</h6>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".87rem" }}>
                <thead>
                  <tr style={{ background: "#1f1f20", color: "white" }}>
                    {["#", "Project Name", "Category", "Total Amount", "Action"].map((h) => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: "center", color: "#aaa", padding: 24 }}>Walang nahanap na proyekto.</td></tr>
                  ) : filtered.map((p, i) => {
                    const s = getProjectStatus(p);
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #f0f4ff", transition: "background .15s", cursor: "pointer" }}>
                        <td style={{ padding: "10px 14px" }}>{i + 1}</td>
                        <td style={{ padding: "10px 14px", fontWeight: 600, color: "#1e3a6e" }}>{p.community}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <small style={{ color: "#6c757d", display: "block" }}>{p.category}</small>
                          <span style={{ display: "inline-block", marginTop: 4, padding: "2px 10px", borderRadius: 12, fontSize: ".72rem", fontWeight: 700, background: s === "Completed" ? "#d4f5e2" : "#e0f0ff", color: s === "Completed" ? "#1a6b3c" : "#1e5bb8" }}>{s}</span>
                        </td>
                        <td style={{ padding: "10px 14px", fontWeight: 700, color: "#1e5bb8" }}>{fmt(p.budget)}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <button onClick={() => setViewProject(p)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white", fontWeight: 600, fontSize: ".82rem", cursor: "pointer" }}>View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {viewProject && <ViewModal project={viewProject} onClose={() => setViewProject(null)} />}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
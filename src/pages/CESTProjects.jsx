import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ← ADDED

const CATEGORIES = [
  "SUSTAINABLE ENTERPRISE AND LIVELIHOODS",
  "HEALTH AND NUTRITION",
  "HUMAN RESOURCE DEVELOPMENT",
  "DRRM AND CCA",
  "BIO CIRCULAR GREEN ECONOMY TECHNOLOGIES",
  "DIGITAL GOVERNANCE TOOLS",
];

const INITIAL_PROJECTS = [
  { community: "Community A", category: "SUSTAINABLE ENTERPRISE AND LIVELIHOODS", budget: 250000, focal: "Maria Santos", contact: "09171234567", address: "Barangay 1, Quezon City", date: "2024-01-15", duration: "6 months", households: 20, male: 40, female: 40, total: 80 },
  { community: "Community B", category: "HEALTH AND NUTRITION", budget: 300000, focal: "Jose Reyes", contact: "09281234567", address: "Barangay 5, Manila", date: "2024-03-10", duration: "12 months", households: 30, male: 60, female: 60, total: 120 },
  { community: "Community C", category: "HUMAN RESOURCE DEVELOPMENT", budget: 150000, focal: "Ana Cruz", contact: "09391234567", address: "Barangay 10, Makati", date: "2024-06-01", duration: "3 months", households: 15, male: 28, female: 32, total: 60 },
];

const EMPTY_FORM = {
  community: "", category: "", budget: "", date: "",
  focal: "", contact: "", address: "", duration: "",
  households: "", male: "", female: "", total: "",
};

// ── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ project, index, onClose, onSave }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...project });

  useEffect(() => { setForm({ ...EMPTY_FORM, ...project }); }, [project]);

  function set(key, val) {
    const updated = { ...form, [key]: val };
    if (key === "male" || key === "female") {
      updated.total = (parseInt(key === "male" ? val : form.male) || 0) +
                      (parseInt(key === "female" ? val : form.female) || 0);
    }
    setForm(updated);
  }

  function handleSave() {
    const male = parseInt(form.male) || 0;
    const female = parseInt(form.female) || 0;
    onSave(index, { ...form, male, female, total: male + female });
  }

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1.5px solid #dde4f5", borderRadius: 10, fontSize: ".9rem", color: "#1e3a6e", background: "#f8faff", outline: "none", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontSize: ".75rem", fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 5 };
  const fieldWrap = { marginBottom: 14 };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(3px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 520, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white", flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>✏️ Edit Project</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, color: "white", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: 22, overflowY: "auto", flex: 1 }}>
          <div style={fieldWrap}>
            <label style={labelStyle}>Community</label>
            <input value={form.community} onChange={(e) => set("community", e.target.value)} style={inputStyle} placeholder="Enter community name" />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} style={inputStyle}>
              <option value="">-- Select Category --</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Budget (₱)</label>
              <input type="number" value={form.budget} onChange={(e) => set("budget", e.target.value)} style={inputStyle} placeholder="0.00" min="0" />
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Focal Person</label>
            <input value={form.focal} onChange={(e) => set("focal", e.target.value)} style={inputStyle} placeholder="Enter focal person name" />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Contact</label>
            <input value={form.contact} onChange={(e) => set("contact", e.target.value)} style={inputStyle} placeholder="Contact number" />
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Address</label>
            <input value={form.address} onChange={(e) => set("address", e.target.value)} style={inputStyle} placeholder="Enter address" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Duration</label>
              <input value={form.duration} onChange={(e) => set("duration", e.target.value)} style={inputStyle} placeholder="e.g. 3 months" />
            </div>
            <div>
              <label style={labelStyle}>Households (HH)</label>
              <input type="number" value={form.households} onChange={(e) => set("households", e.target.value)} style={inputStyle} placeholder="0" min="0" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Male</label>
              <input type="number" value={form.male} onChange={(e) => set("male", e.target.value)} style={inputStyle} placeholder="0" min="0" />
            </div>
            <div>
              <label style={labelStyle}>Female</label>
              <input type="number" value={form.female} onChange={(e) => set("female", e.target.value)} style={inputStyle} placeholder="0" min="0" />
            </div>
          </div>
          <div style={fieldWrap}>
            <label style={labelStyle}>Total Beneficiaries</label>
            <input readOnly value={form.total || 0} style={{ ...inputStyle, background: "#e9f0ff", color: "#1e5bb8", fontWeight: 600 }} />
          </div>
        </div>
        <div style={{ padding: "14px 22px", borderTop: "1px solid #eee", display: "flex", gap: 10, justifyContent: "flex-end", background: "#f8faff", flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "10px 20px", border: "1.5px solid #dde4f5", borderRadius: 10, background: "white", color: "#6c757d", fontWeight: 500, fontSize: ".9rem", cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: "10px 24px", border: "none", borderRadius: 10, background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white", fontWeight: 700, fontSize: ".9rem", cursor: "pointer", boxShadow: "0 4px 14px rgba(30,91,184,0.35)" }}>✅ Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteModal({ project, onConfirm, onClose }) {
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(3px)" }}>
      <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 380, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#dc3545,#ff6b7a)", padding: "18px 22px", color: "white" }}>
          <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>🗑️ Delete Project</span>
        </div>
        <div style={{ padding: 24 }}>
          <p style={{ color: "#1e3a6e", margin: 0, marginBottom: 6, fontSize: ".95rem" }}>Are you sure you want to delete:</p>
          <p style={{ fontWeight: 700, color: "#dc3545", fontSize: "1rem", margin: 0, marginBottom: 20 }}>"{project?.community}"</p>
          <p style={{ fontSize: ".83rem", color: "#6c757d", margin: 0 }}>This action cannot be undone.</p>
        </div>
        <div style={{ padding: "14px 22px", borderTop: "1px solid #eee", display: "flex", gap: 10, justifyContent: "flex-end", background: "#f8faff" }}>
          <button onClick={onClose} style={{ padding: "10px 20px", border: "1.5px solid #dde4f5", borderRadius: 10, background: "white", color: "#6c757d", fontWeight: 500, cursor: "pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: "10px 24px", border: "none", borderRadius: 10, background: "linear-gradient(135deg,#dc3545,#ff6b7a)", color: "white", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(220,53,69,0.35)" }}>🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Projects Page ────────────────────────────────────────────────────────
export default function CESTProjects() {
  const navigate = useNavigate();   // ← ADDED
  const location = useLocation();   // ← ADDED

  const [projects, setProjects] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cestData")) || INITIAL_PROJECTS; }
    catch { return INITIAL_PROJECTS; }
  });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [reminders, setReminders] = useState([{ text: "Review Q1 Report", date: "2025-03-01" }]);
  const [reminderInput, setReminderInput] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [toast, setToast] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

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
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    localStorage.setItem("cestData", JSON.stringify(projects));
  }, [projects]);

  function showToast(msg, color = "#1e5bb8") {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  }

  function saveEdit(index, updated) {
    const next = [...projects];
    next[index] = updated;
    setProjects(next);
    setEditTarget(null);
    showToast("✅ Project updated successfully!");
  }

  function confirmDelete() {
    const next = [...projects];
    next.splice(deleteTarget.index, 1);
    setProjects(next);
    setDeleteTarget(null);
    showToast("🗑️ Project deleted.", "#dc3545");
  }

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return (
      (!q || (p.community || "").toLowerCase().includes(q) || (p.focal || "").toLowerCase().includes(q)) &&
      (!categoryFilter || p.category === categoryFilter)
    );
  });

  function addReminder() {
    if (!reminderInput || !reminderDate) return;
    setReminders([...reminders, { text: reminderInput, date: reminderDate }]);
    setReminderInput(""); setReminderDate("");
  }

  const CAT_BADGE_COLORS = {
    "SUSTAINABLE ENTERPRISE AND LIVELIHOODS": { bg: "#e6f4ea", color: "#2d7a3e" },
    "HEALTH AND NUTRITION":                   { bg: "#fde8ea", color: "#b02020" },
    "HUMAN RESOURCE DEVELOPMENT":             { bg: "#ede8ff", color: "#5036e9" },
    "DRRM AND CCA":                           { bg: "#fff3e0", color: "#b45309" },
    "BIO CIRCULAR GREEN ECONOMY TECHNOLOGIES":{ bg: "#e0f7f4", color: "#0a7a6e" },
    "DIGITAL GOVERNANCE TOOLS":               { bg: "#e0f2ff", color: "#1561ad" },
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#4c84e0", fontFamily: "'DM Sans','Segoe UI',sans-serif", overflow: "hidden" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: toast.color, color: "white", padding: "12px 24px", borderRadius: 12, fontWeight: 600, fontSize: ".9rem", boxShadow: "0 8px 24px rgba(0,0,0,0.25)", zIndex: 9999 }}>
          {toast.msg}
        </div>
      )}

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1050, backdropFilter: "blur(2px)" }} />
      )}

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
            const isActive = location.pathname === path;
            return (
              <li key={label}>
                <a
                  onClick={() => navigate(path)}
                  style={{ color: "#1e5bb8", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, marginBottom: 6, fontWeight: isActive ? 600 : 500, background: isActive ? "linear-gradient(90deg,#cce0ff,#b3d1ff)" : "none", textDecoration: "none", position: "relative", transition: "all .3s ease", cursor: "pointer" }}>
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
            onClick={() => navigate("/")}
            style={{ background: "#f8f9fa", color: "#dc3545", borderRadius: 12, fontWeight: 500, padding: "10px 0", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
            🚪 Logout
          </a>
        </div>
      </nav>

      {/* Main */}
      <main style={{ background: "#0c52c4", minHeight: "100vh", paddingBottom: 40, marginLeft: 250, flex: 1, overflowX: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "24px 32px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ color: "#fff", fontWeight: 700, margin: 0, fontFamily: "Syne,sans-serif", fontSize: "1.8rem" }}>Projects</h2>
          <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
            {/* Bell */}
            <div className="bell-area" style={{ position: "relative" }}>
              <button onClick={() => setBellOpen(!bellOpen)}
                style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.15)", color: "white", fontSize: "1.2rem", cursor: "pointer", position: "relative" }}>
                🔔
                {reminders.length > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -4, background: "#dc3545", color: "white", fontSize: ".65rem", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{reminders.length}</span>
                )}
              </button>
              {bellOpen && (
                <div style={{ position: "absolute", top: 50, right: 0, width: 300, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderRadius: 14, boxShadow: "0 15px 35px rgba(0,0,0,0.25)", zIndex: 999, overflow: "hidden" }}>
                  <div style={{ fontWeight: 600, padding: "10px 14px", background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white" }}>Reminders</div>
                  <ul style={{ listStyle: "none", padding: "8px 8px 4px", margin: 0 }}>
                    {reminders.length === 0
                      ? <li style={{ padding: "8px 14px", color: "#999", fontSize: ".85rem" }}>No reminders</li>
                      : reminders.map((r, i) => (
                        <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: "1px solid #f0f4ff" }}>
                          <span style={{ fontSize: ".83rem", color: "#1e3a6e" }}>{r.text} <small style={{ color: "#999" }}>- {r.date}</small></span>
                          <button onClick={() => setReminders(reminders.filter((_, j) => j !== i))}
                            style={{ background: "#dc3545", border: "none", borderRadius: 6, color: "white", cursor: "pointer", padding: "2px 7px", fontSize: ".75rem" }}>×</button>
                        </li>
                      ))}
                  </ul>
                  <div style={{ display: "flex", gap: 6, padding: 8, flexWrap: "wrap" }}>
                    <input value={reminderInput} onChange={(e) => setReminderInput(e.target.value)} placeholder="Reminder..." style={{ flex: 1, padding: "6px 10px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: ".83rem", minWidth: 0 }} />
                    <input type="date" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} style={{ flex: 1, padding: "6px 8px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: ".83rem", minWidth: 0 }} />
                    <button onClick={addReminder} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: "#1e5bb8", color: "white", fontWeight: 600, cursor: "pointer", fontSize: ".83rem" }}>Add</button>
                  </div>
                </div>
              )}
            </div>
            <button style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.15)", color: "#ffd86b", fontSize: "1.2rem", cursor: "pointer" }}>⚙️</button>
          </div>
        </div>

        <div style={{ padding: "0 32px" }}>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
            {[
              { label: "Total Projects", val: projects.length, icon: "📋", bg: "linear-gradient(135deg,#1e5bb8,#4c84e0)" },
              { label: "Showing", val: filtered.length, icon: "🔍", bg: "linear-gradient(135deg,#6f42c1,#a66cff)" },
              { label: "Total Budget", val: "₱" + projects.reduce((s, p) => s + Number(p.budget || 0), 0).toLocaleString(), icon: "💰", bg: "linear-gradient(135deg,#28a745,#6bd38d)" },
            ].map(({ label, val, icon, bg }) => (
              <div key={label} style={{ borderRadius: 16, background: bg, color: "white", padding: "16px 20px", boxShadow: "0 6px 18px rgba(0,0,0,0.18)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: ".78rem", opacity: 0.85, margin: "0 0 4px" }}>{label}</p>
                  <h3 style={{ margin: 0, fontSize: typeof val === "string" ? "1.1rem" : "1.8rem", fontWeight: 700 }}>{val}</h3>
                </div>
                <span style={{ fontSize: "2rem", opacity: 0.85 }}>{icon}</span>
              </div>
            ))}
          </div>

          {/* Search + Filter */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#aab", pointerEvents: "none" }}>🔍</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search project or focal person..."
                style={{ width: "100%", padding: "10px 14px 10px 36px", borderRadius: 10, border: "none", fontSize: ".9rem", outline: "none", boxSizing: "border-box", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: 10, border: "none", fontSize: ".88rem", background: "#fff", cursor: "pointer", minWidth: 200, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", color: "#1e3a6e", outline: "none" }}>
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.14)", marginBottom: 32 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f4ff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h6 style={{ margin: 0, fontWeight: 700, color: "#1e3a6e", fontSize: ".95rem" }}>Project List</h6>
              <span style={{ fontSize: ".78rem", color: "#6c757d" }}>{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".87rem" }}>
                <thead>
                  <tr style={{ background: "#1f1f20", color: "white" }}>
                    {["#", "Community", "Category", "Budget", "Focal Person", "Date", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontWeight: 600, fontSize: ".78rem", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "32px 16px", color: "#aaa" }}>
                        <div style={{ fontSize: "2rem", marginBottom: 8 }}>📭</div>
                        No projects found{search || categoryFilter ? " matching your filters" : ""}.
                      </td>
                    </tr>
                  ) : filtered.map((p, i) => {
                    const realIdx = projects.indexOf(p);
                    const catStyle = CAT_BADGE_COLORS[p.category] || { bg: "#e8f0ff", color: "#1e5bb8" };
                    return (
                      <tr key={i}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{ borderBottom: "1px solid #f0f4ff", background: hoveredRow === i ? "rgba(30,91,184,0.04)" : i % 2 === 0 ? "#fff" : "#fafbff", transition: "background .12s" }}>
                        <td style={{ padding: "11px 16px", fontWeight: 700, color: "#999", fontSize: ".75rem" }}>{i + 1}</td>
                        <td style={{ padding: "11px 16px", fontWeight: 700, color: "#1e3a6e", maxWidth: 180 }}>{p.community || "—"}</td>
                        <td style={{ padding: "11px 16px" }}>
                          <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 8, background: catStyle.bg, color: catStyle.color, fontSize: ".7rem", fontWeight: 700 }}>
                            {p.category || "—"}
                          </span>
                        </td>
                        <td style={{ padding: "11px 16px", fontWeight: 700, color: "#1e5bb8", whiteSpace: "nowrap" }}>₱{Number(p.budget || 0).toLocaleString()}</td>
                        <td style={{ padding: "11px 16px", color: "#4a5568", whiteSpace: "nowrap" }}>{p.focal || "—"}</td>
                        <td style={{ padding: "11px 16px", color: "#6c757d", whiteSpace: "nowrap" }}>{p.date || "—"}</td>
                        <td style={{ padding: "11px 16px" }}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => setEditTarget({ index: realIdx, project: p })}
                              style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "white", fontWeight: 600, fontSize: ".78rem", cursor: "pointer", whiteSpace: "nowrap" }}
                              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(245,158,11,0.4)"; }}
                              onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                              ✏️ Edit
                            </button>
                            <button onClick={() => setDeleteTarget({ index: realIdx, project: p })}
                              style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#dc3545,#ff6b7a)", color: "white", fontWeight: 600, fontSize: ".78rem", cursor: "pointer", whiteSpace: "nowrap" }}
                              onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(220,53,69,0.4)"; }}
                              onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                              🗑️ Del
                            </button>
                          </div>
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

      {editTarget && <EditModal project={editTarget.project} index={editTarget.index} onClose={() => setEditTarget(null)} onSave={saveEdit} />}
      {deleteTarget && <DeleteModal project={deleteTarget.project} onConfirm={confirmDelete} onClose={() => setDeleteTarget(null)} />}
    </div>
  );
}
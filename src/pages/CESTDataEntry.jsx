import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────

const CATEGORY_MAPPING = {
  "Sustainable Enterprise & Livelihoods":       "SUSTAINABLE ENTERPRISE AND LIVELIHOODS",
  "Health & Nutrition":                          "HEALTH AND NUTRITION",
  "Human Resource Development":                  "HUMAN RESOURCE DEVELOPMENT",
  "DRRM & CCA":                                  "DRRM AND CCA",
  "Bio-Circular-Green Economy Technologies":     "BIO CIRCULAR GREEN ECONOMY TECHNOLOGIES",
  "Digital Governance Tools":                    "DIGITAL GOVERNANCE TOOLS",
};

const COMPONENTS = [
  { id: "c1", value: "Sustainable Enterprise & Livelihoods" },
  { id: "c2", value: "Health & Nutrition" },
  { id: "c3", value: "Human Resource Development" },
  { id: "c4", value: "DRRM & CCA" },
  { id: "c5", value: "Bio-Circular-Green Economy Technologies" },
  { id: "c6", value: "Digital Governance Tools" },
];

// ─────────────────────────────────────────────────────────
// SETTINGS PANEL COMPONENT
// ─────────────────────────────────────────────────────────

function SettingsPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ fullname: "Admin User", username: "admin", email: "admin@cest.gov.ph" });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [alert, setAlert] = useState(null);
  const [notifs, setNotifs] = useState({ reminder: true, projects: true, system: false });

  function saveProfile() {
    if (!editForm.fullname || !editForm.username || !editForm.email) { setAlert({ type: "error", msg: "Please fill in all fields." }); return; }
    setProfile(editForm); setEditing(false);
    setAlert({ type: "success", msg: "✓ Profile updated!" });
    setTimeout(() => setAlert(null), 3000);
  }

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(3px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white" }}>
          <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>⚙️ Settings</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, color: "white", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid #eee", background: "#f8faff" }}>
          {["profile", "preferences", "notifications"].map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: "12px 8px", border: "none", background: activeTab === t ? "#fff" : "none", fontWeight: activeTab === t ? 700 : 500, color: activeTab === t ? "#1e5bb8" : "#6c757d", borderBottom: activeTab === t ? "2px solid #1e5bb8" : "2px solid transparent", cursor: "pointer", fontSize: ".82rem", textTransform: "capitalize" }}>{t}</button>
          ))}
        </div>
        <div style={{ padding: 22 }}>
          {activeTab === "profile" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", color: "white", fontWeight: 700 }}>{profile.fullname?.charAt(0).toUpperCase() || "?"}</div>
                <div style={{ fontWeight: 700, color: "#1e3a6e", marginTop: 8 }}>{profile.fullname}</div>
                <div style={{ fontSize: ".82rem", color: "#6c757d" }}>{profile.email}</div>
              </div>
              {alert && <div style={{ padding: "9px 13px", borderRadius: 9, fontSize: ".83rem", marginBottom: 12, background: alert.type === "success" ? "rgba(40,167,69,0.12)" : "rgba(220,53,69,0.1)", border: `1px solid ${alert.type === "success" ? "rgba(40,167,69,0.3)" : "rgba(220,53,69,0.28)"}`, color: alert.type === "success" ? "#1a6b2e" : "#b02020" }}>{alert.msg}</div>}
              {!editing ? (
                <div>
                  {[["Full Name", profile.fullname], ["Username", profile.username], ["Email Address", profile.email]].map(([lbl, val]) => (
                    <div key={lbl} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#f4f7ff", marginBottom: 10 }}>
                      <div><div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase", letterSpacing: ".5px" }}>{lbl}</div><div style={{ fontSize: ".93rem", fontWeight: 500, color: "#1e3a6e" }}>{val}</div></div>
                    </div>
                  ))}
                  <button onClick={() => { setEditForm({ ...profile }); setEditing(true); }} style={{ padding: "8px 18px", border: "none", borderRadius: 9, background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white", fontSize: ".83rem", fontWeight: 600, cursor: "pointer", marginTop: 14 }}>✏️ Edit Profile</button>
                </div>
              ) : (
                <div>
                  {[["Full Name", "fullname"], ["Username", "username"], ["Email Address", "email"]].map(([lbl, key]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <label style={{ display: "block", fontSize: ".75rem", fontWeight: 600, color: "#6c757d", textTransform: "uppercase", letterSpacing: ".4px", marginBottom: 5 }}>{lbl}</label>
                      <input value={editForm[key] || ""} onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #dde4f5", borderRadius: 10, fontSize: ".9rem", color: "#1e3a6e", background: "#f8faff", outline: "none", boxSizing: "border-box" }} />
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
                  <div><div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase" }}>{lbl}</div><div style={{ fontSize: ".93rem", fontWeight: 500, color: "#1e3a6e" }}>{val}</div></div>
                </div>
              ))}
              <div style={{ padding: "12px 14px", borderRadius: 10, background: "#f4f7ff" }}>
                <div style={{ fontSize: ".75rem", color: "#6c757d", textTransform: "uppercase", marginBottom: 6 }}>Theme</div>
                <select style={{ padding: "6px 10px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: ".85rem", color: "#1e3a6e", background: "#fff", cursor: "pointer" }}>
                  <option>Blue (Default)</option><option>Dark</option><option>Teal</option>
                </select>
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div>
              <p style={{ color: "#6c757d", fontSize: ".85rem", marginBottom: 16 }}>Manage how you receive alerts.</p>
              {[{ key: "reminder", label: "Reminder Alerts", sub: "Notify when a reminder is due" }, { key: "projects", label: "Project Updates", sub: "Status changes on projects" }, { key: "system", label: "System Announcements", sub: "News and updates from CEST" }].map(({ key, label, sub }) => (
                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 10, background: "#f4f7ff", marginBottom: 10 }}>
                  <div><div style={{ fontSize: ".9rem", fontWeight: 500, color: "#1e3a6e" }}>{label}</div><div style={{ fontSize: ".76rem", color: "#6c757d" }}>{sub}</div></div>
                  <div onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })} style={{ width: 44, height: 24, borderRadius: 12, background: notifs[key] ? "#1e5bb8" : "#ccc", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
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

// ─────────────────────────────────────────────────────────
// MAIN DATA ENTRY COMPONENT
// ─────────────────────────────────────────────────────────

export default function CESTDataEntry({ onSave }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ community: "", focal: "", contact: "", address: "", date: "", duration: "", budget: "", households: "", male: "", female: "", total: "" });
  const [checkedComponents, setCheckedComponents] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [reminderInput, setReminderInput] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [toast, setToast] = useState(null);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

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

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  function toggleComponent(val) {
    setCheckedComponents((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  }

  function validate() {
    const e = {};
    if (!form.community.trim()) e.community = "Required";
    if (!form.focal.trim())     e.focal     = "Required";
    if (!form.date)             e.date      = "Required";
    if (!form.budget)           e.budget    = "Required";
    return e;
  }

  function saveEntry() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const category = checkedComponents.length > 0 ? CATEGORY_MAPPING[checkedComponents[0]] || checkedComponents[0] : "-";

    const entry = {
      community:  form.community || "-",
      focal:      form.focal     || "-",
      contact:    form.contact   || "-",
      address:    form.address   || "-",
      date:       form.date      || "-",
      category,
      components: checkedComponents,
      duration:   form.duration  || "-",
      budget:     parseFloat(form.budget   || 0),
      households: parseInt(form.households || 0),
      male:       parseInt(form.male       || 0),
      female:     parseInt(form.female     || 0),
      total:      parseInt(form.total      || 0),
    };

    // ── Save to localStorage ──────────────────────────
    const existing = JSON.parse(localStorage.getItem("cestData") || "[]");
    localStorage.setItem("cestData", JSON.stringify([...existing, entry]));

    // ── Notify Dashboard on same tab ──────────────────
    window.dispatchEvent(new CustomEvent("cestDataUpdated", { detail: entry }));

    if (onSave) onSave(entry);

    // ── Show success & reset form ─────────────────────
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

    setForm({ community: "", focal: "", contact: "", address: "", date: "", duration: "", budget: "", households: "", male: "", female: "", total: "" });
    setCheckedComponents([]);
  }

  function addReminder() {
    if (!reminderInput || !reminderDate) return;
    setReminders([...reminders, { text: reminderInput, date: reminderDate }]);
    setReminderInput(""); setReminderDate("");
  }

  const inputStyle = (key) => ({
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: errors[key] ? "1.5px solid #dc3545" : "1.5px solid #dde4f5",
    fontSize: ".9rem", color: "#1e3a6e", background: "#f8faff",
    outline: "none", boxSizing: "border-box", transition: "border-color .2s",
  });

  const labelStyle = { display: "block", fontSize: ".82rem", fontWeight: 600, color: "#4a5568", marginBottom: 6 };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#4c84e0", fontFamily: "'DM Sans','Segoe UI',sans-serif", overflow: "hidden" }}>
      {toast && <div style={{ position: "fixed", top: 20, right: 20, background: "#1e5bb8", color: "white", padding: "12px 18px", borderRadius: 8, boxShadow: "0 4px 15px rgba(0,0,0,0.35)", zIndex: 9999, fontWeight: 500 }}>{toast}</div>}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1050, backdropFilter: "blur(2px)" }} />}

      {/* ── Sidebar ── */}
      <nav style={{ width: 250, background: "#fff", color: "#1e5bb8", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 1060, borderRight: "1px solid #e9ecef", boxShadow: "4px 0 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", transition: "transform .3s ease", overflowY: "auto" }}>
        <div style={{ padding: "20px 5px", borderBottom: "1px solid #f1f1f1", textAlign: "center" }}>
          <img src="/images/logo.png" style={{ width: 200, height: 100, objectFit: "contain", marginBottom: 8 }} />
        </div>
        <ul style={{ listStyle: "none", padding: "16px 15px", margin: 0, flex: 1 }}>
          {navLinks.map(({ icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={label}>
                <a onClick={() => navigate(path)} style={{ color: "#1e5bb8", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, marginBottom: 6, fontWeight: isActive ? 600 : 500, background: isActive ? "linear-gradient(90deg,#cce0ff,#b3d1ff)" : "none", textDecoration: "none", position: "relative", transition: "all .3s ease", cursor: "pointer" }}>
                  {isActive && <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 4, background: "#5036e9", borderRadius: 4 }} />}
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <div style={{ padding: "0 12px 20px" }}>
          <a onClick={() => navigate("/")} style={{ background: "#f8f9fa", color: "#dc3545", borderRadius: 12, fontWeight: 500, padding: "10px 0", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>🚪 Logout</a>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main style={{ background: "#0c52c4", minHeight: "100vh", paddingBottom: 40, marginLeft: 250, flex: 1, overflowX: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "24px 32px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ color: "#fff", fontWeight: 700, margin: 0, fontFamily: "Syne,sans-serif", fontSize: "1.8rem" }}>Input Data</h2>
          <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
            <div className="bell-area" style={{ position: "relative" }}>
              <button onClick={() => setBellOpen(!bellOpen)} style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.15)", color: "white", fontSize: "1.2rem", cursor: "pointer", position: "relative" }}>
                🔔
                {reminders.length > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: "#dc3545", color: "white", fontSize: ".65rem", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{reminders.length}</span>}
              </button>
              {bellOpen && (
                <div style={{ position: "absolute", top: 50, right: 0, width: 300, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderRadius: 14, boxShadow: "0 15px 35px rgba(0,0,0,0.25)", zIndex: 999, overflow: "hidden" }}>
                  <div style={{ fontWeight: 600, padding: "10px 14px", background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white" }}>Reminders</div>
                  <ul style={{ listStyle: "none", padding: "8px 8px 4px", margin: 0 }}>
                    {reminders.length === 0 ? <li style={{ padding: "8px 14px", color: "#999", fontSize: ".85rem" }}>No reminders</li> : reminders.map((r, i) => (
                      <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: "1px solid #f0f4ff" }}>
                        <span style={{ fontSize: ".83rem", color: "#1e3a6e" }}>{r.text} <small style={{ color: "#999" }}>- {r.date}</small></span>
                        <button onClick={() => setReminders(reminders.filter((_, j) => j !== i))} style={{ background: "#dc3545", border: "none", borderRadius: 6, color: "white", cursor: "pointer", padding: "2px 7px", fontSize: ".75rem" }}>×</button>
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
            <button onClick={() => setShowSettings(true)} style={{ width: 42, height: 42, borderRadius: 12, border: "none", background: "rgba(255,255,255,0.15)", color: "#ffd86b", fontSize: "1.2rem", cursor: "pointer" }}>⚙️</button>
          </div>
        </div>

        <div style={{ padding: "0 32px" }}>
          {saved && (
            <div style={{ background: "rgba(40,167,69,0.15)", border: "1px solid rgba(40,167,69,0.4)", borderRadius: 12, padding: "14px 20px", marginBottom: 20, color: "#1a6b2e", fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
              ✅ Entry saved successfully! Dashboard has been updated.
            </div>
          )}

          <div style={{ background: "#fff", borderRadius: 18, padding: 32, boxShadow: "0 6px 18px rgba(0,0,0,0.12)", marginBottom: 32 }}>
            <h5 style={{ fontWeight: 700, color: "#1e3a6e", marginBottom: 20, fontFamily: "Syne,sans-serif", fontSize: "1rem" }}>🏘️ LGU / Barangay / Community / Group / Association</h5>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>LGU / Barangay / Community / Group / Association {errors.community && <span style={{ color: "#dc3545", fontWeight: 400 }}>— {errors.community}</span>}</label>
              <input value={form.community} onChange={(e) => set("community", e.target.value)} style={inputStyle("community")} placeholder="Enter community name" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
              <div>
                <label style={labelStyle}>Name of Focal Person {errors.focal && <span style={{ color: "#dc3545", fontWeight: 400 }}>— {errors.focal}</span>}</label>
                <input value={form.focal} onChange={(e) => set("focal", e.target.value)} style={inputStyle("focal")} placeholder="Full name" />
              </div>
              <div>
                <label style={labelStyle}>Contact Number</label>
                <input value={form.contact} onChange={(e) => set("contact", e.target.value)} style={inputStyle("contact")} placeholder="09XXXXXXXXX" />
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Address</label>
              <input value={form.address} onChange={(e) => set("address", e.target.value)} style={inputStyle("address")} placeholder="Barangay, Municipality, Province" />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Date of Monitoring {errors.date && <span style={{ color: "#dc3545", fontWeight: 400 }}>— {errors.date}</span>}</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} style={inputStyle("date")} />
            </div>

            <hr style={{ borderColor: "#e9ecef", margin: "0 0 24px" }} />

            <h5 style={{ fontWeight: 700, color: "#1e3a6e", marginBottom: 6, fontFamily: "Syne,sans-serif", fontSize: "1rem" }}>
              📋 CEST Components Implemented <span style={{ fontSize: ".82rem", color: "#6c757d", fontWeight: 400 }}>(check all that applies)</span>
            </h5>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
              {COMPONENTS.map(({ id, value }) => {
                const checked = checkedComponents.includes(value);
                return (
                  <label key={id} onClick={() => toggleComponent(value)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, cursor: "pointer", background: checked ? "#e8f0ff" : "#f4f7ff", border: checked ? "1.5px solid #1e5bb8" : "1.5px solid transparent", transition: "all .18s", userSelect: "none" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${checked ? "#1e5bb8" : "#aab"}`, background: checked ? "#1e5bb8" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s" }}>
                      {checked && <span style={{ color: "white", fontSize: ".75rem", lineHeight: 1 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: ".82rem", fontWeight: checked ? 600 : 400, color: checked ? "#1e5bb8" : "#4a5568", lineHeight: 1.3 }}>{value}</span>
                  </label>
                );
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
              <div>
                <label style={labelStyle}>Project Duration</label>
                <input value={form.duration} onChange={(e) => set("duration", e.target.value)} style={inputStyle("duration")} placeholder="e.g. 6 months" />
              </div>
              <div>
                <label style={labelStyle}>Project Budget (₱) {errors.budget && <span style={{ color: "#dc3545", fontWeight: 400 }}>— {errors.budget}</span>}</label>
                <input type="number" value={form.budget} onChange={(e) => set("budget", e.target.value)} style={inputStyle("budget")} placeholder="Enter project budget" />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Number of Households</label>
              <input type="number" value={form.households} onChange={(e) => set("households", e.target.value)} style={inputStyle("households")} placeholder="0" />
            </div>

            <h6 style={{ fontWeight: 700, color: "#1e3a6e", marginBottom: 12, fontFamily: "Syne,sans-serif" }}>👥 Number of Beneficiaries</h6>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
              {[["Male", "male", "💙"], ["Female", "female", "💗"], ["Total", "total", "💜"]].map(([lbl, key, icon]) => (
                <div key={key} style={{ background: "#f4f7ff", borderRadius: 12, padding: 16, textAlign: "center" }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{icon}</div>
                  <label style={{ ...labelStyle, textAlign: "center", marginBottom: 8, justifyContent: "center" }}>{lbl}</label>
                  <input type="number" value={form[key]} onChange={(e) => set(key, e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1.5px solid #dde4f5", fontSize: "1rem", fontWeight: 700, color: "#1e3a6e", background: "#fff", textAlign: "center", outline: "none", boxSizing: "border-box" }} placeholder="0" />
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={saveEntry} style={{ padding: "14px 48px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#1e5bb8,#4c84e0)", color: "white", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 14px rgba(30,91,184,0.4)", transition: "all .2s ease", fontFamily: "Syne,sans-serif" }}>
                💾 Save Entry
              </button>
            </div>
          </div>
        </div>
      </main>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
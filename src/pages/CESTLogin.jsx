import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────
// SVG ICON COMPONENTS
// ─────────────────────────────────────────────────────────

const UserIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// ORB BACKGROUND COMPONENT
// ─────────────────────────────────────────────────────────

function Orb({ style }) {
  return (
    <div
      style={{
        position:     "fixed",
        borderRadius: "50%",
        filter:       "blur(80px)",
        opacity:      0.18,
        zIndex:       0,
        ...style,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────
// DEMO CREDENTIALS
// ─────────────────────────────────────────────────────────

const DEMO_USERS = [
  { username: "admin", password: "admin123" },
  { username: "staff", password: "staff123" },
];

// ─────────────────────────────────────────────────────────
// MAIN LOGIN COMPONENT
// ─────────────────────────────────────────────────────────

export default function CESTLogin() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────
  const [username,     setUsername]     = useState("");
  const [password,     setPassword]     = useState("");
  const [showPw,       setShowPw]       = useState(false);
  const [error,        setError]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // ── Submit Handler ─────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    // Simulate network delay
    await new Promise((res) => setTimeout(res, 900));

    const match = DEMO_USERS.find(
      (u) =>
        u.username === username.trim() &&
        u.password === password
    );

    setLoading(false);

    if (match) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password!");
      setPassword("");
    }
  }

  // ── Dynamic Style Helpers ──────────────────────────────
  const inputStyle = (field) => ({
    width:        "100%",
    background:   focusedField === field
      ? "rgba(37,99,255,0.18)"
      : "rgba(255,255,255,0.07)",
    border:       focusedField === field
      ? "1px solid #2563ff"
      : "1px solid rgba(255,255,255,0.13)",
    borderRadius: 11,
    padding:      "11px 14px 11px 38px",
    color:        "#e8eeff",
    fontFamily:   "'DM Sans', sans-serif",
    fontSize:     ".93rem",
    outline:      "none",
    transition:   "border-color .2s, background .2s, box-shadow .2s",
    boxShadow:    focusedField === field
      ? "0 0 0 3px rgba(37,99,255,0.15)"
      : "none",
    boxSizing:    "border-box",
  });

  const iconColor = (field) =>
    focusedField === field
      ? "#00d4ff"
      : "rgba(232,238,255,0.5)";

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────

  return (
    <div
      style={{
        fontFamily:          "'DM Sans', sans-serif",
        backgroundImage:     "url('/images/bg1.jpg')",
        backgroundSize:      "cover",
        backgroundPosition:  "center",
        backgroundRepeat:    "no-repeat",
        minHeight:           "100vh",
        display:             "flex",
        alignItems:          "center",
        justifyContent:      "center",
        overflow:            "hidden",
        padding:             24,
        position:            "relative",
      }}
    >
      {/* ── Background Mesh ── */}
      <div
        style={{
          position:   "fixed",
          inset:      0,
          zIndex:     0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(37,99,255,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(0,212,255,0.15) 0%, transparent 55%),
            radial-gradient(ellipse 50% 70% at 60% 30%, rgba(120,40,255,0.10) 0%, transparent 50%)
          `,
        }}
      />
      <div
        style={{
          position:   "fixed",
          inset:      0,
          zIndex:     0,
          background: "rgba(6,11,24,0.72)",
        }}
      />

      {/* ── Floating Orbs ── */}
      <Orb
        style={{
          width:      380,
          height:     380,
          background: "#2563ff",
          top:        -100,
          left:       -80,
          animation:  "drift 18s linear infinite",
        }}
      />
      <Orb
        style={{
          width:      280,
          height:     280,
          background: "#00d4ff",
          bottom:     -80,
          right:      -60,
          animation:  "drift 22s linear infinite reverse",
        }}
      />

      {/* ── Global Styles & Animations ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes drift {
          0%   { transform: translate(0,0) scale(1); }
          33%  { transform: translate(40px,30px) scale(1.05); }
          66%  { transform: translate(-20px,50px) scale(0.97); }
          100% { transform: translate(0,0) scale(1); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-6px); }
          40%,80% { transform: translateX(6px); }
        }

        .login-card-inner {
          animation: slideUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }

        .btn-login-hover:hover {
          transform:  translateY(-2px) !important;
          box-shadow: 0 12px 36px rgba(37,99,255,0.55) !important;
        }

        .btn-login-hover:active {
          transform: translateY(0) !important;
        }

        .input-pw {
          padding-right: 42px !important;
        }

        ::placeholder {
          color: rgba(232,238,255,0.28) !important;
        }
      `}</style>

      {/* ── Login Card ── */}
      <div
        className="login-card-inner"
        style={{
          position: "relative",
          zIndex:   10,
          width:    "100%",
          maxWidth: 420,
        }}
      >
        <div
          style={{
            background:           "rgba(255,255,255,0.06)",
            border:               "1px solid rgba(255,255,255,0.13)",
            borderRadius:         24,
            padding:              "2.4rem 2.2rem",
            backdropFilter:       "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:            "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            position:             "relative",
            overflow:             "hidden",
          }}
        >
          {/* Top Shimmer Line */}
          <div
            style={{
              position:     "absolute",
              top:          0,
              left:         "10%",
              right:        "10%",
              height:       2,
              background:   "linear-gradient(90deg, transparent, #2563ff, #00d4ff, transparent)",
              borderRadius: 100,
            }}
          />

          {/* Logo + Title */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          80,
                height:         80,
                borderRadius:   20,
              }}
            >
              <img
                src="/images/logo.png"
                alt="CEST Logo"
                style={{
                  width:        300,
                  height:       80,
                  objectFit:    "contain",
                  marginBottom: "1rem",
                }}
              />
            </div>

            <h1
              style={{
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    700,
                fontSize:      "1.55rem",
                letterSpacing: "-0.5px",
                color:         "#e8eeff",
                marginBottom:  "0.25rem",
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                fontSize: ".88rem",
                color:    "rgba(232,238,255,0.5)",
                margin:   0,
              }}
            >
              Sign in to your CEST account
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height:       1,
              background:   "rgba(255,255,255,0.13)",
              marginBottom: "1.6rem",
            }}
          />

          {/* Error Alert */}
          {error && (
            <div
              style={{
                borderRadius: 10,
                padding:      "10px 14px",
                fontSize:     ".84rem",
                marginBottom: "1rem",
                background:   "rgba(255,77,109,0.15)",
                border:       "1px solid rgba(255,77,109,0.35)",
                color:        "#ff8fa3",
                display:      "flex",
                alignItems:   "center",
                gap:          8,
                animation:    "shake .35s ease",
              }}
            >
              <span style={{ fontSize: "1rem" }}>⚠️</span> {error}
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Username Field */}
            <div style={{ marginBottom: "1.1rem" }}>
              <label
                style={{
                  display:       "block",
                  fontSize:      ".8rem",
                  fontWeight:    500,
                  color:         "rgba(232,238,255,0.5)",
                  letterSpacing: ".5px",
                  textTransform: "uppercase",
                  marginBottom:  ".45rem",
                }}
              >
                Username
              </label>
              <div style={{ position: "relative" }}>
                {/* Username Icon */}
                <div
                  style={{
                    position:      "absolute",
                    left:          13,
                    top:           "50%",
                    transform:     "translateY(-50%)",
                    color:         iconColor("username"),
                    pointerEvents: "none",
                    transition:    "color .2s",
                  }}
                >
                  <UserIcon />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  style={inputStyle("username")}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "1.1rem" }}>
              <label
                style={{
                  display:       "block",
                  fontSize:      ".8rem",
                  fontWeight:    500,
                  color:         "rgba(232,238,255,0.5)",
                  letterSpacing: ".5px",
                  textTransform: "uppercase",
                  marginBottom:  ".45rem",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                {/* Lock Icon */}
                <div
                  style={{
                    position:      "absolute",
                    left:          13,
                    top:           "50%",
                    transform:     "translateY(-50%)",
                    color:         iconColor("password"),
                    pointerEvents: "none",
                    transition:    "color .2s",
                  }}
                >
                  <LockIcon />
                </div>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="input-pw"
                  style={inputStyle("password")}
                />

                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "#00d4ff")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "rgba(232,238,255,0.5)")
                  }
                  style={{
                    position:   "absolute",
                    right:      13,
                    top:        "50%",
                    transform:  "translateY(-50%)",
                    background: "none",
                    border:     "none",
                    color:      "rgba(232,238,255,0.5)",
                    cursor:     "pointer",
                    padding:    0,
                    display:    "flex",
                    transition: "color .2s",
                  }}
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-login-hover"
              style={{
                width:          "100%",
                padding:        13,
                border:         "none",
                borderRadius:   12,
                background:     loading
                  ? "rgba(37,99,255,0.5)"
                  : "linear-gradient(135deg, #2563ff 0%, #0ea5ff 100%)",
                color:          "white",
                fontFamily:     "'Syne', sans-serif",
                fontWeight:     700,
                fontSize:       "1rem",
                letterSpacing:  ".2px",
                cursor:         loading ? "not-allowed" : "pointer",
                transition:     "transform .18s, box-shadow .18s, opacity .18s",
                boxShadow:      "0 6px 24px rgba(37,99,255,0.4)",
                marginTop:      ".4rem",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            10,
              }}
            >
              {loading ? (
                <>
                  {/* Spinner */}
                  <div
                    style={{
                      width:        18,
                      height:       18,
                      border:       "2.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation:    "spin .7s linear infinite",
                    }}
                  />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Credentials Hint */}
          <div
            style={{
              marginTop:    "1rem",
              padding:      "10px 14px",
              borderRadius: 10,
              background:   "rgba(0,212,255,0.08)",
              border:       "1px solid rgba(0,212,255,0.15)",
              fontSize:     ".78rem",
              color:        "rgba(232,238,255,0.55)",
              textAlign:    "center",
            }}
          >
            Demo:{" "}
            <code style={{ color: "#00d4ff" }}>admin</code>
            {" / "}
            <code style={{ color: "#00d4ff" }}>admin123</code>
          </div>

          {/* Footer Link */}
          <p
            style={{
              textAlign:    "center",
              marginTop:    "1.3rem",
              fontSize:     ".86rem",
              color:        "rgba(232,238,255,0.5)",
              marginBottom: 0,
            }}
          >
            No account yet?{" "}
            <a
              href="/signup"
              onMouseOver={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.target.style.textDecoration = "none")
              }
              style={{
                color:          "#00d4ff",
                textDecoration: "none",
                fontWeight:     500,
              }}
            >
              Create staff account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
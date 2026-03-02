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

const AtIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

const ShieldIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
// PASSWORD STRENGTH HELPERS
// ─────────────────────────────────────────────────────────

function scorePassword(val) {
  let score = 0;
  if (val.length >= 8)          score++;
  if (/[A-Z]/.test(val))        score++;
  if (/[0-9]/.test(val))        score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  return score;
}

const STRENGTH_COLORS = ["#ff4d6d", "#ff9944", "#f5c518", "#00e5a0"];
const STRENGTH_LABELS = ["Weak", "Fair", "Good", "Strong"];

// ─────────────────────────────────────────────────────────
// REUSABLE FIELD COMPONENT
// ─────────────────────────────────────────────────────────

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  icon,
  focused,
  suffix,
  hint,
}) {
  return (
    <div style={{ marginBottom: "1.1rem", flex: 1 }}>
      {/* Label */}
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
        {label}
      </label>

      {/* Input Wrapper */}
      <div style={{ position: "relative" }}>
        {/* Left Icon */}
        <div
          style={{
            position:      "absolute",
            left:          13,
            top:           "50%",
            transform:     "translateY(-50%)",
            color:         focused ? "#00d4ff" : "rgba(232,238,255,0.5)",
            pointerEvents: "none",
            transition:    "color .2s",
          }}
        >
          {icon}
        </div>

        {/* Input */}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={id}
          style={{
            width:        "100%",
            background:   focused
              ? "rgba(37,99,255,0.18)"
              : "rgba(255,255,255,0.07)",
            border:       focused
              ? "1px solid #2563ff"
              : "1px solid rgba(255,255,255,0.13)",
            borderRadius: 11,
            padding:      suffix
              ? "11px 42px 11px 38px"
              : "11px 14px 11px 38px",
            color:        "#e8eeff",
            fontFamily:   "'DM Sans', sans-serif",
            fontSize:     ".93rem",
            outline:      "none",
            transition:   "border-color .2s, background .2s, box-shadow .2s",
            boxShadow:    focused
              ? "0 0 0 3px rgba(37,99,255,0.15)"
              : "none",
            boxSizing:    "border-box",
          }}
        />

        {/* Right Suffix (e.g. toggle eye button) */}
        {suffix}
      </div>

      {/* Hint (e.g. strength bar or match hint) */}
      {hint}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// TOGGLE EYE BUTTON COMPONENT
// ─────────────────────────────────────────────────────────

function ToggleEye({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
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
      {show ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// STRENGTH BAR COMPONENT
// ─────────────────────────────────────────────────────────

function StrengthBar({ password }) {
  const score = password ? scorePassword(password) : 0;
  const color = password
    ? STRENGTH_COLORS[score - 1] || STRENGTH_COLORS[0]
    : null;
  const label = password
    ? STRENGTH_LABELS[score - 1] || ""
    : "";

  return (
    <div style={{ marginTop: 7 }}>
      {/* Segmented Bar */}
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex:         1,
              height:       3,
              borderRadius: 10,
              background:   password && i < score
                ? color
                : "rgba(255,255,255,0.13)",
              transition:   "background .3s",
            }}
          />
        ))}
      </div>

      {/* Strength Label */}
      {label && (
        <div
          style={{
            fontSize:   ".73rem",
            marginTop:  4,
            color,
            transition: "color .3s",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MATCH HINT COMPONENT
// ─────────────────────────────────────────────────────────

function MatchHint({ password, confirm }) {
  if (!confirm) {
    return <div style={{ minHeight: 14 }} />;
  }

  const match = password === confirm;

  return (
    <div
      style={{
        fontSize:   ".73rem",
        marginTop:  5,
        color:      match ? "#00e5a0" : "#ff4d6d",
        minHeight:  14,
        transition: "color .3s",
      }}
    >
      {match ? "✓ Passwords match" : "✗ Passwords do not match"}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN SIGNUP COMPONENT
// ─────────────────────────────────────────────────────────

export default function CESTSignup() {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email:    "",
    password: "",
    confirm:  "",
  });
  const [focused,     setFocused]     = useState(null);
  const [showPw,      setShowPw]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alert,       setAlert]       = useState(null);
  const [loading,     setLoading]     = useState(false);

  // ── Field Updater ──────────────────────────────────────
  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    setAlert(null);
  }

  // ── Validation ─────────────────────────────────────────
  function validate() {
    if (!form.fullname.trim()) {
      return "Full name is required.";
    }
    if (!form.username.trim()) {
      return "Username is required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (form.password.length < 8) {
      return "Password must be at least 8 characters!";
    }
    if (form.password !== form.confirm) {
      return "Passwords do not match!";
    }
    return null;
  }

  // ── Submit Handler ─────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    if (err) {
      setAlert({ type: "error", msg: err });
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);

    setAlert({
      type: "success",
      msg:  "Account created! Redirecting to login...",
    });

    // Redirect to login after 1.5s
    setTimeout(() => navigate("/"), 1500);
  }

  // ── Shared Input Props Builder ─────────────────────────
  const inputProps = (key, type = "text") => ({
    value:   form[key],
    onChange: (e) => set(key, e.target.value),
    onFocus:  () => setFocused(key),
    onBlur:   () => setFocused(null),
    focused:  focused === key,
    type,
  });

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────

  return (
    <div
      style={{
        fontFamily:         "'DM Sans', sans-serif",
        backgroundImage:    "url('/images/bg1.jpg')",
        backgroundSize:     "cover",
        backgroundPosition: "center",
        backgroundRepeat:   "no-repeat",
        minHeight:          "100vh",
        display:            "flex",
        alignItems:         "center",
        justifyContent:     "center",
        overflow:           "hidden",
        padding:            24,
        position:           "relative",
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
      {[
        {
          w:   380,
          h:   380,
          bg:  "#2563ff",
          top: -100,
          left: -80,
          dur: "18s",
          dir: "",
        },
        {
          w:      280,
          h:      280,
          bg:     "#00d4ff",
          bottom: -80,
          right:  -60,
          dur:    "22s",
          dir:    "reverse",
        },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            position:     "fixed",
            borderRadius: "50%",
            filter:       "blur(80px)",
            opacity:      0.18,
            zIndex:       0,
            width:        o.w,
            height:       o.h,
            background:   o.bg,
            top:          o.top,
            left:         o.left,
            bottom:       o.bottom,
            right:        o.right,
            animation:    `drift ${o.dur} linear infinite ${o.dir}`,
          }}
        />
      ))}

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

        .signup-card-wrap {
          animation: slideUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }

        .btn-signup-hover:hover {
          transform:  translateY(-2px) !important;
          box-shadow: 0 12px 36px rgba(37,99,255,0.55) !important;
        }

        .btn-signup-hover:active {
          transform: translateY(0) !important;
        }

        ::placeholder {
          color: rgba(232,238,255,0.28) !important;
        }
      `}</style>

      {/* ── Signup Card ── */}
      <div
        className="signup-card-wrap"
        style={{
          position: "relative",
          zIndex:   10,
          width:    "100%",
          maxWidth: 480,
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
            <img
              src="/images/logo2.png"
              alt="CEST Logo"
              style={{
                width:        80,
                height:       80,
                objectFit:    "contain",
                marginBottom: "1rem",
              }}
            />
            <h1
              style={{
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    700,
                fontSize:      "1.55rem",
                letterSpacing: "-0.5px",
                color:         "#e8eeff",
                marginBottom:  ".25rem",
              }}
            >
              Create your account
            </h1>
            <p
              style={{
                fontSize: ".88rem",
                color:    "rgba(232,238,255,0.5)",
                margin:   0,
              }}
            >
              Join CEST — fill in your details below
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

          {/* Alert Banner */}
          {alert && (
            <div
              style={{
                borderRadius: 10,
                padding:      "10px 14px",
                fontSize:     ".84rem",
                marginBottom: "1rem",
                display:      "flex",
                alignItems:   "center",
                gap:          8,
                background:   alert.type === "success"
                  ? "rgba(0,229,160,0.12)"
                  : "rgba(255,77,109,0.15)",
                border: `1px solid ${
                  alert.type === "success"
                    ? "rgba(0,229,160,0.3)"
                    : "rgba(255,77,109,0.35)"
                }`,
                color:     alert.type === "success" ? "#00e5a0" : "#ff8fa3",
                animation: alert.type === "error" ? "shake .35s ease" : "none",
              }}
            >
              <span style={{ fontSize: "1rem" }}>
                {alert.type === "success" ? "✅" : "⚠️"}
              </span>
              {alert.msg}
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Full Name + Username (side by side) */}
            <div style={{ display: "flex", gap: 14 }}>
              <Field
                label="Full Name"
                id="fullname"
                placeholder="Juan Dela Cruz"
                icon={<UserIcon />}
                {...inputProps("fullname")}
              />
              <Field
                label="Username"
                id="username"
                placeholder="juandc"
                icon={<AtIcon />}
                {...inputProps("username")}
              />
            </div>

            {/* Email */}
            <Field
              label="Email Address"
              id="email"
              type="email"
              placeholder="juan@example.com"
              icon={<MailIcon />}
              {...inputProps("email", "email")}
            />

            {/* Password + Strength Bar */}
            <Field
              label="Password"
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="Create a strong password"
              icon={<LockIcon />}
              {...inputProps("password", showPw ? "text" : "password")}
              suffix={
                <ToggleEye
                  show={showPw}
                  onToggle={() => setShowPw(!showPw)}
                />
              }
              hint={<StrengthBar password={form.password} />}
            />

            {/* Confirm Password + Match Hint */}
            <Field
              label="Confirm Password"
              id="confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              icon={<ShieldIcon />}
              {...inputProps("confirm", showConfirm ? "text" : "password")}
              suffix={
                <ToggleEye
                  show={showConfirm}
                  onToggle={() => setShowConfirm(!showConfirm)}
                />
              }
              hint={
                <MatchHint
                  password={form.password}
                  confirm={form.confirm}
                />
              }
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-signup-hover"
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
                transition:     "transform .18s, box-shadow .18s",
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
                      width:          18,
                      height:         18,
                      border:         "2.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      borderRadius:   "50%",
                      animation:      "spin .7s linear infinite",
                    }}
                  />
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer — Sign In Link */}
          <p
            style={{
              textAlign:    "center",
              marginTop:    "1.3rem",
              fontSize:     ".86rem",
              color:        "rgba(232,238,255,0.5)",
              marginBottom: 0,
            }}
          >
            Already have an account?{" "}
            <a
              onClick={() => navigate("/")}
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
                cursor:         "pointer",
              }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
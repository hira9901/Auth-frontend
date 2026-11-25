import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const fmt = (d) =>
  d ? new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

// Turn a raw user-agent string into something readable
const device = (ua = "") => {
  const os = /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Mac/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "Unknown OS";
  const br = /Edg/.test(ua) ? "Edge" : /Chrome/.test(ua) ? "Chrome" : /Firefox/.test(ua) ? "Firefox" : /Safari/.test(ua) ? "Safari" : "Browser";
  return `${br} on ${os}`;
};

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user.name, bio: user.bio || "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      await updateProfile(form);
      setMsg("Profile saved");
    } catch {
      setMsg("Couldn't save. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="dash">
      <header className="topbar">
        <div className="logo dark"><span className="logo-mark" />Harbor</div>
        <button className="btn-ghost" onClick={logout}>Log out</button>
      </header>

      <section className="hero">
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h1>Hello, {user.name.split(" ")[0]}</h1>
          <p>{user.email}</p>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><span>Total logins</span><strong>{user.loginCount}</strong></div>
        <div className="stat"><span>Last login</span><strong className="sm">{fmt(user.lastLogin)}</strong></div>
        <div className="stat"><span>Member since</span><strong className="sm">{fmt(user.createdAt)}</strong></div>
      </section>

      <section className="cols">
        <form className="panel" onSubmit={save}>
          <h3>Your profile</h3>
          <label>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <label>Bio</label>
          <textarea rows="3" maxLength="200" placeholder="Tell us a little about yourself" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <button className="btn" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>
          {msg && <p className="note">{msg}</p>}
        </form>

        <div className="panel">
          <h3>Recent sign-ins</h3>
          <ul className="history">
            {user.loginHistory.map((h, i) => (
              <li key={i}>
                <span className="dot" />
                <div>
                  <strong>{device(h.userAgent)}</strong>
                  <small>{fmt(h.at)} · IP {h.ip || "unknown"}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

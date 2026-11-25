// Shared split-screen layout for Login and Register
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth">
      <aside className="auth-brand">
        <div className="logo"><span className="logo-mark" />Harbor</div>
        <div className="brand-copy">
          <h1>Your account,<br />safely moored.</h1>
          <p>Passwords are hashed, sessions are signed, and every sign-in is recorded so you always know who came aboard.</p>
        </div>
        <div className="orb orb-a" /><div className="orb orb-b" /><div className="orb orb-c" />
      </aside>

      <main className="auth-form">
        <div className="form-box">
          <h2>{title}</h2>
          <p className="muted">{subtitle}</p>
          {children}
          <p className="switch">{footer}</p>
        </div>
      </main>
    </div>
  );
}

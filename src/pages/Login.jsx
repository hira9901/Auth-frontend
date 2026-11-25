import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Can't reach the server. Is the backend running?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to see your dashboard."
      footer={<>New here? <Link to="/register">Create an account</Link></>}
    >
      <form onSubmit={submit}>
        {error && <div className="alert">{error}</div>}
        <label>Email</label>
        <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={change} required />
        <label>Password</label>
        <PasswordInput name="password" placeholder="Your password" value={form.password} onChange={change} required />
        <button className="btn" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
      </form>
    </AuthLayout>
  );
}

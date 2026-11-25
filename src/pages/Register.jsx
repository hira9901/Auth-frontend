import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setBusy(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Can't reach the server. Is the backend running?");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than a minute."
      footer={<>Already registered? <Link to="/login">Log in</Link></>}
    >
      <form onSubmit={submit}>
        {error && <div className="alert">{error}</div>}
        <label>Full name</label>
        <input name="name" placeholder="Ayesha Khan" value={form.name} onChange={change} required />
        <label>Email</label>
        <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={change} required />
        <label>Password</label>
        <PasswordInput name="password" placeholder="At least 6 characters" value={form.password} onChange={change} required />
        <button className="btn" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>
      </form>
    </AuthLayout>
  );
}

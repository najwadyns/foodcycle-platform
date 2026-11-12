import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !email || !password) {
      setMessage("Semua data wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage("Register gagal: " + error.message);
      return;
    }

    setMessage("Register berhasil! Silakan login.");

    setName("");
    setEmail("");
    setPassword("");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Register</h1>
        <p>Buat akun baru untuk menggunakan FoodCycle.</p>

        <form onSubmit={handleRegister} className="auth-form">
          <label>Nama</label>
          <input
            type="text"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Mendaftar..." : "Register"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-link">
          Sudah punya akun? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
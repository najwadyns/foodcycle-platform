import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage("Login gagal: " + error.message);
    return;
  }

  navigate("/home");
};

  const handleGoogleLogin = async () => {
   const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/home`,
    },
  });

  if (error) {
    setMessage("Google Login gagal: " + error.message);
  }
};

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login</h1>
        <p>Masuk ke akun FoodCycle kamu.</p>

        <button

  onClick={handleGoogleLogin}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    background: "#fff",
    color: "#333",
    fontWeight: "600",
  }}
>
  🔵 Continue with Google
</button>

        <form onSubmit={handleLogin} className="auth-form">
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
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Masuk..." : "Login"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-link">
          Belum punya akun? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
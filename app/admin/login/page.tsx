"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "লগইন ব্যর্থ হয়েছে");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("সার্ভারের সাথে যোগাযোগ করতে পারছে না");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">🕌</div>
          <h1>অ্যাডমিন প্যানেল</h1>
          <p>জামিআ&apos;তুন নূর আস সিরাজিয়া আল ইসলামিয়া</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          {error && <div className="admin-error-msg">{error}</div>}

          <div className="admin-field">
            <label htmlFor="email">📧 ইমেইল</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              required
              autoComplete="email"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password">🔒 পাসওয়ার্ড</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? "⏳ লগইন হচ্ছে..." : "🔑 লগইন করুন"}
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/">← মূল পেজে ফিরে যান</a>
        </div>
      </div>
    </div>
  );
}

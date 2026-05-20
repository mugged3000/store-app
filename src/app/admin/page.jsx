
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary admin login
    if (
      email === "admin@nexora.com" &&
      password === "123456"
    ) {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111",
          padding: "32px",
          borderRadius: "14px",
          border: "1px solid #222",
        }}
      >
        <h1
          style={{
            color: "white",
            marginBottom: "24px",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Admin Login
        </h1>

        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              color: "#aaa",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            style={{
              width: "100%",
              height: "48px",
              padding: "0 14px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              color: "#aaa",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: "100%",
              height: "48px",
              padding: "0 14px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            height: "48px",
            border: "none",
            borderRadius: "8px",
            background: "#7f77dd",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}


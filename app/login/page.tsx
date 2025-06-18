"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/upload-video");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 animate-fade-in">
      <div className="card">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          <button type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
        <p className="text-gray-400 text-center text-sm">
          Don’t have an account?{" "}
          <button onClick={() => router.push("/register")} className="link">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

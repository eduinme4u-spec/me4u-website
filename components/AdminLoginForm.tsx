"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const supabase = createSupabaseBrowser();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" placeholder="admin@me4u.co.in" required />
      </label>
      <label>
        Password
        <input name="password" type="password" placeholder="Password" required />
      </label>
      <button className="primaryBtn" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error ? <p className="formMessage error">{error}</p> : null}
    </form>
  );
}

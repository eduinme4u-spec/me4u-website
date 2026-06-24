import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <main className="adminAuthPage">
      <section className="adminAuthCard">
        <Link className="backLink" href="/">Back to website</Link>
        <span className="eyebrow">Admin Login</span>
        <h1>ME4U lead management</h1>
        <p>
          Connect Supabase Auth to enable secure admin login. This page is ready
          for email/password authentication in the next setup step.
        </p>
        <form className="loginForm">
          <label>
            Email
            <input type="email" placeholder="admin@me4u.co.in" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>
          <button className="primaryBtn" type="button">Login setup pending</button>
        </form>
      </section>
    </main>
  );
}

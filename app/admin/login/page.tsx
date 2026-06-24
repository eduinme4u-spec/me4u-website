import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { createSupabaseServer } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="adminAuthPage">
      <section className="adminAuthCard">
        <Link className="backLink" href="/">Back to website</Link>
        <span className="eyebrow">Admin Login</span>
        <h1>ME4U lead management</h1>
        <p>
          Login with your admin email and password to view enquiries, lead
          status, and follow-up work.
        </p>
        <AdminLoginForm />
      </section>
    </main>
  );
}

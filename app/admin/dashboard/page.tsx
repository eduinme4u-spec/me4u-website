import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServer } from "@/lib/supabase/server";
import type { Lead } from "@/lib/leads";

async function getLeads(): Promise<Lead[]> {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return [];
    }

    return data as Lead[];
  } catch {
    return [];
  }
}

export default async function AdminDashboardPage() {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/admin/login");
  }

  const leads = await getLeads();

  return (
    <main className="dashboardPage">
      <header className="dashboardHeader">
        <div>
          <span className="eyebrow">Admin Dashboard</span>
          <h1>Lead follow-ups</h1>
        </div>
        <div className="dashboardActions">
          <Link className="secondaryBtn" href="/">View website</Link>
          <AdminLogoutButton />
        </div>
      </header>

      <section className="dashboardStats">
        <div><strong>{leads.length}</strong><span>Total leads</span></div>
        <div><strong>{leads.filter((lead) => lead.status === "new").length}</strong><span>New</span></div>
        <div><strong>{leads.filter((lead) => lead.status === "follow_up").length}</strong><span>Follow-up</span></div>
      </section>

      <section className="leadTableCard">
        <h2>Recent enquiries</h2>
        {leads.length === 0 ? (
          <p className="emptyState">
            No leads yet, or Supabase environment variables are not connected.
          </p>
        ) : (
          <div className="leadTable">
            <div className="leadTableHead">
              <span>Name</span>
              <span>Phone</span>
              <span>Course</span>
              <span>Status</span>
              <span>Follow-up</span>
            </div>
            {leads.map((lead) => (
              <div className="leadTableRow" key={lead.id}>
                <span>{lead.full_name}</span>
                <span>{lead.phone}</span>
                <span>{lead.course_interest}</span>
                <span>{lead.status.replace("_", " ")}</span>
                <span>{lead.follow_up_date || "Not set"}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

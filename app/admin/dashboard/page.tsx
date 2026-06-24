import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { LeadManager } from "@/components/LeadManager";
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
        <div className="leadSectionHeader">
          <div>
            <h2>Recent enquiries</h2>
            <p>Update lead status, schedule follow-ups, and save notes.</p>
          </div>
        </div>
        <LeadManager leads={leads} />
      </section>
    </main>
  );
}

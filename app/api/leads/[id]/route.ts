import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createSupabaseServer } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/leads";

const validStatuses: LeadStatus[] = [
  "new",
  "contacted",
  "demo_scheduled",
  "joined",
  "not_interested",
  "follow_up"
];

async function requireAdmin() {
  const supabase = createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

function textOrNull(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAdmin();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const status = String(body.status || "") as LeadStatus;

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid lead status." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  const updatePayload = {
    status,
    follow_up_date: textOrNull(body.follow_up_date),
    notes: textOrNull(body.notes),
    updated_at: new Date().toISOString()
  };

  const { error } = await supabase
    .from("leads")
    .update(updatePayload)
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const followUpNote = textOrNull(body.follow_up_note);
  if (followUpNote) {
    const { error: followUpError } = await supabase.from("lead_followups").insert({
      lead_id: params.id,
      note: followUpNote,
      next_follow_up_date: textOrNull(body.follow_up_date),
      created_by: user.id
    });

    if (followUpError) {
      return NextResponse.json({ error: followUpError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAdmin();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("leads").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

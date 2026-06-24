import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = asText(body.full_name);
    const phone = asText(body.phone);
    const courseInterest = asText(body.course_interest);
    const learningMode = asText(body.learning_mode) || "both";

    if (!fullName || !phone || !courseInterest) {
      return NextResponse.json(
        { error: "Name, phone, and course interest are required." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("leads").insert({
      full_name: fullName,
      phone,
      email: asText(body.email) || null,
      course_interest: courseInterest,
      learning_mode: learningMode,
      message: asText(body.message) || null,
      status: "new"
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}

"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button className="secondaryBtn" type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}

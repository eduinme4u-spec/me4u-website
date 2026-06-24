"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { leadStatuses, type Lead, type LeadStatus } from "@/lib/leads";

type SaveState = "idle" | "saving" | "saved" | "error";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function cleanPhone(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

function whatsappLink(phone: string) {
  const digits = cleanPhone(phone);
  const withCountry = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

export function LeadManager({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <p className="emptyState">
        No leads yet. New website enquiries will appear here automatically.
      </p>
    );
  }

  return (
    <div className="leadCards">
      {leads.map((lead) => (
        <LeadEditor key={lead.id} lead={lead} />
      ))}
    </div>
  );
}

function LeadEditor({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [followUpDate, setFollowUpDate] = useState(lead.follow_up_date || "");
  const [notes, setNotes] = useState(lead.notes || "");
  const [followUpNote, setFollowUpNote] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const telHref = useMemo(() => `tel:${lead.phone}`, [lead.phone]);
  const waHref = useMemo(() => whatsappLink(lead.phone), [lead.phone]);

  async function saveLead() {
    setSaveState("saving");
    const response = await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        follow_up_date: followUpDate,
        notes,
        follow_up_note: followUpNote
      })
    });

    if (!response.ok) {
      setSaveState("error");
      return;
    }

    setFollowUpNote("");
    setSaveState("saved");
    router.refresh();
  }

  async function deleteLead() {
    const confirmed = window.confirm(`Delete lead for ${lead.full_name}?`);
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/leads/${lead.id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <article className="leadCard">
      <div className="leadCardHeader">
        <div>
          <span className="leadStatus">{lead.status.replace("_", " ")}</span>
          <h3>{lead.full_name}</h3>
          <p>Created {formatDate(lead.created_at)}</p>
        </div>
        <div className="leadQuickActions">
          <a className="secondaryBtn" href={telHref}>Call</a>
          <a className="secondaryBtn" href={waHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="leadInfoGrid">
        <div>
          <span>Phone</span>
          <strong>{lead.phone}</strong>
        </div>
        <div>
          <span>Email</span>
          <strong>{lead.email || "Not provided"}</strong>
        </div>
        <div>
          <span>Course</span>
          <strong>{lead.course_interest}</strong>
        </div>
        <div>
          <span>Mode</span>
          <strong>{lead.learning_mode}</strong>
        </div>
      </div>

      {lead.message ? <p className="leadMessage">{lead.message}</p> : null}

      <div className="leadEditGrid">
        <label>
          Status
          <select value={status} onChange={(event) => setStatus(event.target.value as LeadStatus)}>
            {leadStatuses.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Follow-up date
          <input
            type="date"
            value={followUpDate}
            onChange={(event) => setFollowUpDate(event.target.value)}
          />
        </label>
        <label className="fullWidth">
          Internal notes
          <textarea
            rows={3}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Current lead notes"
          />
        </label>
        <label className="fullWidth">
          Add follow-up note
          <textarea
            rows={2}
            value={followUpNote}
            onChange={(event) => setFollowUpNote(event.target.value)}
            placeholder="Example: Called once, asked to contact again tomorrow"
          />
        </label>
      </div>

      <div className="leadCardActions">
        <button className="primaryBtn" type="button" onClick={saveLead} disabled={saveState === "saving"}>
          {saveState === "saving" ? "Saving..." : "Save follow-up"}
        </button>
        <button className="dangerBtn" type="button" onClick={deleteLead}>
          Delete
        </button>
        {saveState === "saved" ? <span className="saveStatus">Saved</span> : null}
        {saveState === "error" ? <span className="saveStatus error">Could not save</span> : null}
      </div>
    </article>
  );
}

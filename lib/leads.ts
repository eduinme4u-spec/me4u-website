export type LeadStatus =
  | "new"
  | "contacted"
  | "demo_scheduled"
  | "joined"
  | "not_interested"
  | "follow_up";

export type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  course_interest: string;
  learning_mode: "online" | "offline" | "both";
  message: string | null;
  status: LeadStatus;
  follow_up_date: string | null;
  notes: string | null;
  created_at: string;
};

export const leadStatuses: Array<{ label: string; value: LeadStatus }> = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Demo Scheduled", value: "demo_scheduled" },
  { label: "Joined", value: "joined" },
  { label: "Not Interested", value: "not_interested" },
  { label: "Follow-up", value: "follow_up" }
];

"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setState("success");
      setMessage("Enquiry received. Our team will contact you soon.");
      form.reset();
      return;
    }

    setState("error");
    setMessage("Something went wrong. Please call or WhatsApp us directly.");
  }

  return (
    <form className="leadForm" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input name="full_name" required placeholder="Student name" />
      </label>
      <label>
        Phone Number
        <input name="phone" required placeholder="+91..." />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="student@example.com" />
      </label>
      <label>
        Course Interest
        <select name="course_interest" required defaultValue="">
          <option value="" disabled>Select a course</option>
          <option>Spoken English</option>
          <option>Public Speaking</option>
          <option>Interview Preparation</option>
          <option>Career Communication</option>
        </select>
      </label>
      <label>
        Learning Mode
        <select name="learning_mode" required defaultValue="both">
          <option value="both">Online or Offline</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </label>
      <label className="fullWidth">
        Message
        <textarea name="message" rows={4} placeholder="Tell us your goal or preferred batch time" />
      </label>
      <button className="primaryBtn" disabled={state === "loading"}>
        {state === "loading" ? "Submitting..." : "Submit Enquiry"}
      </button>
      {message ? <p className={`formMessage ${state}`}>{message}</p> : null}
    </form>
  );
}

import { useState, type FormEvent } from "react";
import { CONTACT } from "../data/content";
import { Icon } from "./Icon";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      // Same endpoint + field names the current production site uses.
      const res = await fetch(CONTACT.form.endpoint, {
        method: "POST",
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      // In dev (no PHP server) the request fails — show fallback with mail link.
      setStatus("error");
    }
  }

  const inputCls =
    "bevel-well w-full rounded-xl border border-mist-200/80 bg-white/85 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500/60 backdrop-blur-sm transition-colors focus:border-azure-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-azure-500/20";

  if (status === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-signal-500/30 bg-signal-500/10 p-6 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-signal-500 text-white">
          <Icon name="check" className="h-6 w-6" strokeWidth={2.4} />
        </span>
        <p className="mt-4 font-semibold text-navy-900">Message sent!</p>
        <p className="mt-1 text-sm text-ink-600">
          Thank you — the HRCM team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-600">
          Your Name *
        </label>
        <input id="cf-name" name="name" type="text" required className={inputCls} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="cf-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-600">
          Number *
        </label>
        <input id="cf-phone" name="phone" type="tel" required className={inputCls} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-600">
          Your Email
        </label>
        <input id="cf-email" name="email" type="email" className={inputCls} autoComplete="email" />
      </div>
      <div>
        <label htmlFor="cf-service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-600">
          Service
        </label>
        <select id="cf-service" name="service" className={inputCls} defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {CONTACT.form.services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-600">
          Type your message
        </label>
        <textarea id="cf-message" name="message" rows={4} className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="press group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-azure-400 to-azure-600 px-8 py-3.5 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_rgb(3_105_161/0.55),0_12px_26px_-10px_rgb(8_136_232/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:from-azure-400 hover:to-azure-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : CONTACT.form.button}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Couldn't submit right now — please email us directly at{" "}
            <a className="font-semibold underline" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

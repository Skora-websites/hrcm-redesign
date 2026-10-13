import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT } from "../data/content";
import { Check, Send } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  // Synchronous guard: React state updates are async, so a fast double-click
  // could otherwise fire the POST multiple times before "sending" renders.
  const inFlight = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
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
    } finally {
      inFlight.current = false;
    }
  }

  const labelCls = "mb-2 block text-[0.82rem] font-semibold text-ink-700";
  const inputCls =
    "w-full rounded-2xl border border-mist-200 bg-white/80 px-4 py-3 text-[0.95rem] text-ink-900 shadow-[inset_0_1px_3px_rgba(16,24,40,0.05)] transition-all duration-300 placeholder:text-ink-400 focus:border-azure-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-azure-500/15";

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 rounded-[var(--r-card)] border border-signal-200 bg-signal-50 p-6"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-500 text-white shadow-[0_8px_20px_-8px_rgba(18,133,75,0.6)]">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <p className="mt-4 text-[1.05rem] font-semibold text-ink-900">Message sent.</p>
        <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-600">
          Thank you — the HRCM team will get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className={labelCls}>
          Name *
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          className={inputCls}
          autoComplete="name"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="cf-phone" className={labelCls}>
          Phone *
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          required
          pattern="[0-9+\(\)\- ]{7,20}"
          title="Enter a valid phone number (digits, spaces, +, - or parentheses)"
          className={inputCls}
          autoComplete="tel"
          placeholder="+91 00000 00000"
        />
      </div>
      <div>
        <label htmlFor="cf-email" className={labelCls}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className={inputCls}
          autoComplete="email"
          placeholder="name@hospital.com"
        />
      </div>
      <div>
        <label htmlFor="cf-service" className={labelCls}>
          Service
        </label>
        <select
          id="cf-service"
          name="service"
          className={inputCls}
          defaultValue=""
        >
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
        <label htmlFor="cf-message" className={labelCls}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          className={inputCls}
          placeholder="Tell us about your revenue cycle…"
        />
      </div>
      <div className="sm:col-span-2">
        <motion.button
          type="submit"
          disabled={status === "sending"}
          className="press inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-azure-500 to-azure-600 px-8 py-3.5 text-[0.95rem] font-semibold text-white shadow-brand ring-1 ring-inset ring-white/20 transition-colors hover:from-azure-600 hover:to-azure-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              {CONTACT.form.button}
            </>
          )}
        </motion.button>
        {status === "error" && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-[0.9rem] leading-relaxed text-ink-600"
          >
            Couldn't submit right now — please email us directly at{" "}
            <a
              className="font-medium text-azure-600 underline-offset-4 hover:underline"
              href={`mailto:${CONTACT.email}`}
            >
              {CONTACT.email}
            </a>
            .
          </motion.p>
        )}
      </div>
    </form>
  );
}

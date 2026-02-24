import { type SubmitEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { EMAILJS } from "../config";

type Status = "idle" | "sending" | "success" | "error";

const MIN_SUBMIT_TIME_MS = 2_000;
const BASE_BACKOFF_MS = 15_000;
const MAX_BACKOFF_MS = 60_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2_000;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20 dark:border-neon-cyan/20 dark:bg-void-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-neon-cyan dark:focus:ring-neon-cyan/20";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [nextAllowedSubmitAt, setNextAllowedSubmitAt] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const firstInteractionAtRef = useRef(0);

  useEffect(() => {
    firstInteractionAtRef.current = Date.now();
  }, []);

  function getBackoffMs(nextSubmitCount: number): number {
    return Math.min(
      BASE_BACKOFF_MS * 2 ** (nextSubmitCount - 1),
      MAX_BACKOFF_MS
    );
  }

  function validate(form: HTMLFormElement): boolean {
    const next: Record<string, string> = {};
    const name = (
      form.elements.namedItem("from_name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("from_email") as HTMLInputElement
    ).value.trim();
    const company = (
      form.elements.namedItem("company") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();

    if (!name) next.from_name = "Name is required";
    else if (name.length > MAX_NAME_LENGTH)
      next.from_name = `Name must be ${MAX_NAME_LENGTH} characters or fewer`;
    if (!email) next.from_email = "Email is required";
    else if (email.length > MAX_EMAIL_LENGTH)
      next.from_email = `Email must be ${MAX_EMAIL_LENGTH} characters or fewer`;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.from_email = "Enter a valid email";
    if (company.length > MAX_COMPANY_LENGTH)
      next.company = `Company must be ${MAX_COMPANY_LENGTH} characters or fewer`;
    if (!message) next.message = "Message is required";
    else if (message.length > MAX_MESSAGE_LENGTH)
      next.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`;

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const now = Date.now();

    if (now < nextAllowedSubmitAt) {
      const waitSeconds = Math.ceil((nextAllowedSubmitAt - now) / 1000);
      setErrors({
        _form: `Please wait ${waitSeconds}s before submitting again`,
      });
      return;
    }

    const honeypot = (form.elements.namedItem("honeypot") as HTMLInputElement)
      .value;
    if (honeypot) return;

    if (now - firstInteractionAtRef.current < MIN_SUBMIT_TIME_MS) {
      setErrors({
        _form: "Please take a moment before submitting",
      });
      return;
    }

    if (!validate(form)) return;

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: (
            form.elements.namedItem("from_name") as HTMLInputElement
          ).value.trim(),
          from_email: (
            form.elements.namedItem("from_email") as HTMLInputElement
          ).value.trim(),
          company: (
            form.elements.namedItem("company") as HTMLInputElement
          ).value.trim(),
          message: (
            form.elements.namedItem("message") as HTMLTextAreaElement
          ).value.trim(),
        },
        EMAILJS.publicKey
      );
      setStatus("success");
      form.reset();
      setErrors({});

      const nextSubmitCount = submitCount + 1;
      const backoffMs = getBackoffMs(nextSubmitCount);
      setSubmitCount(nextSubmitCount);
      setNextAllowedSubmitAt(Date.now() + backoffMs);
      firstInteractionAtRef.current = Date.now();
    } catch {
      setStatus("error");

      const nextSubmitCount = submitCount + 1;
      const backoffMs = getBackoffMs(nextSubmitCount);
      setSubmitCount(nextSubmitCount);
      setNextAllowedSubmitAt(Date.now() + backoffMs);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-neon-cyan/30 dark:bg-neon-cyan/5">
        <CheckCircle2
          size={32}
          className="text-green-600 dark:text-neon-cyan"
        />
        <p className="font-medium text-green-800 dark:text-neon-cyan">
          Message sent. I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-green-700 underline underline-offset-2 hover:text-green-900 dark:text-gray-400 dark:hover:text-neon-cyan"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="absolute h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="from_name" className={labelClass}>
          Name
        </label>
        <input
          id="from_name"
          name="from_name"
          type="text"
          required
          className={inputClass}
        />
        {errors.from_name && (
          <p className="mt-1 text-xs text-red-600 dark:text-neon-magenta">
            {errors.from_name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="from_email" className={labelClass}>
          Email
        </label>
        <input
          id="from_email"
          name="from_email"
          type="email"
          required
          className={inputClass}
        />
        {errors.from_email && (
          <p className="mt-1 text-xs text-red-600 dark:text-neon-magenta">
            {errors.from_email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company{" "}
          <span className="text-gray-400 dark:text-gray-600">(optional)</span>
        </label>
        <input id="company" name="company" type="text" className={inputClass} />
        {errors.company && (
          <p className="mt-1 text-xs text-red-600 dark:text-neon-magenta">
            {errors.company}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={inputClass}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600 dark:text-neon-magenta">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-neon-magenta/30 dark:bg-neon-magenta/5 dark:text-neon-magenta">
          <AlertCircle size={16} className="shrink-0" />
          Something went wrong. Please try again or reach out directly.
        </div>
      )}
      {errors._form && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-neon-magenta/30 dark:bg-neon-magenta/5 dark:text-neon-magenta">
          <AlertCircle size={16} className="shrink-0" />
          {errors._form}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-neon-cyan dark:text-void-950 dark:hover:glow-cyan-strong dark:hover:bg-neon-cyan/90"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-500">
        Don't include secrets. I'll only use your details to reply.
      </p>
    </form>
  );
}

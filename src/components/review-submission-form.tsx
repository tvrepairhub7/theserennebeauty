"use client";

import { useState, type FormEvent } from "react";
import { Star, Send } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

const services = [
  "Bridal makeup",
  "Engagement makeup",
  "Party makeup",
  "Pre-bridal package",
  "Facial / beauty treatment",
  "Other",
];

export function ReviewSubmissionForm() {
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const service = String(data.get("service") || "").trim();
    const review = String(data.get("review") || "").trim();
    const permission = data.get("permission") === "on";

    if (!name || !service || review.length < 10) {
      setError("Please complete all fields and write at least 10 characters.");
      return;
    }
    if (!permission) {
      setError("Please confirm that you allow the studio to review your feedback for possible publication.");
      return;
    }

    const message = [
      "Hello! I would like to submit a review for TheSerenneBeauty.",
      "",
      `Name: ${name}`,
      `Service: ${service}`,
      `Rating: ${rating}/5`,
      `Review: ${review}`,
      "",
      "I understand that the studio will contact me / ask for confirmation before publishing my review.",
    ].join("\n");
    const link = whatsappLink(message);
    if (!link) {
      setError("WhatsApp is not configured yet. Please contact the studio directly.");
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
    form.reset();
    setRating(5);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <label className="grid gap-2 text-sm text-ink">
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={60}
            placeholder="Enter your name"
            className="min-h-12 rounded-xl border border-line bg-white px-4 outline-none transition focus:border-gold"
          />
        </label>
        <label className="grid gap-2 text-sm text-ink">
          Service you received
          <select
            name="service"
            required
            defaultValue=""
            className="min-h-12 rounded-xl border border-line bg-white px-4 outline-none transition focus:border-gold"
          >
            <option value="" disabled>Select a service</option>
            {services.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm text-ink">Your rating</legend>
        <div className="flex items-center gap-1" aria-label={`Selected rating: ${rating} out of 5`}>
          {Array.from({ length: 5 }, (_, index) => {
            const value = index + 1;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`${value} star${value === 1 ? "" : "s"}`}
                aria-pressed={rating === value}
                className="rounded-md p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                <Star className={`size-6 ${value <= rating ? "fill-champagne text-gold" : "text-line"}`} />
              </button>
            );
          })}
          <span className="ml-2 text-xs text-mocha">{rating}/5</span>
        </div>
      </fieldset>

      <label className="grid gap-2 text-sm text-ink">
        Your review
        <textarea
          name="review"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          placeholder="Tell us about your experience..."
          className="resize-y rounded-xl border border-line bg-white px-4 py-3 outline-none transition focus:border-gold"
        />
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-mocha">
        <input name="permission" type="checkbox" required className="mt-0.5 size-4 accent-[#a17c45]" />
        I agree that the studio may review this feedback and contact me for confirmation before publishing it.
      </label>

      {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}

      <button type="submit" className="btn btn-lg btn-whatsapp w-fit">
        Send review on WhatsApp <Send className="size-4" aria-hidden="true" />
      </button>
      <p className="text-xs leading-relaxed text-mocha">
        Your review is sent to the studio for review; it is not published automatically.
      </p>
    </form>
  );
}

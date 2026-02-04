"use client";

import Button from "@/components/Button";
import { markdownify } from "@/lib/utils/textConverter";
import { useState, useRef } from "react";

interface ContactFormProps {
  title: string;
  description?: string;
  action: string;
}

export default function ContactForm({
  title,
  description,
  action,
}: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(formRef.current!);
      const response = await fetch(action, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        setIsSuccess(true);
        formRef.current?.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(result.message || "Form submission failed");
        console.error("Form submission failed:", result);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Network error";
      setError(errorMessage);
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      data-aos="fade-right-sm"
      data-aos-delay="150"
      className="bg-primary px-12 py-14 rounded-t-3xl"
      onSubmit={handleSubmit}
    >
      <h2
        className="text-white mb-4"
        dangerouslySetInnerHTML={markdownify(title)}
      />
      {description && (
        <p
          className="text-text-light/80 mb-16"
          dangerouslySetInnerHTML={markdownify(description)}
        />
      )}

      <div className="mb-6">
        <label htmlFor="name" className="form-label">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          className="form-input"
          placeholder="John Doe"
          type="text"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="form-label">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          className="form-input"
          placeholder="john.doe@email.com"
          type="email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="subject" className="form-label">
          Inquire Subject <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          className="form-input"
          placeholder="Question about a treatment..."
          type="text"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="form-label">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          className="form-input"
          placeholder="Write your message..."
          rows={3}
          required
        ></textarea>
      </div>
      <Button
        enable
        label="Send a message"
        type="submit"
        style="btn-outline"
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      {isSuccess && (
        <div className="mt-4 text-secondary font-medium animate-in fade-in duration-300">
          We've received your message!
        </div>
      )}
      {error && <div className="mt-4 text-red-400 font-medium">✗ {error}</div>}
    </form>
  );
}

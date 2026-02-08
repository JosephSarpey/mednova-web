"use client";

import { services } from "@/data/services";
import { FormEvent, useCallback, useState } from "react";

export default function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      console.error('Formspree endpoint not configured');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        e.currentTarget.reset();
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Input */}
        <div>
          <label htmlFor="contact-name" className="sr-only">Full Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            required
            aria-required="true"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition disabled:opacity-50"
          />
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="Phone"
            autoComplete="tel"
            required
            aria-required="true"
            inputMode="tel"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Input */}
        <div>
          <label htmlFor="contact-email" className="sr-only">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            aria-required="true"
            inputMode="email"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition disabled:opacity-50"
          />
        </div>

        {/* Service Selection */}
        <div>
          <label htmlFor="contact-service" className="sr-only">Type of Service</label>
          <select
            id="contact-service"
            name="service"
            required
            aria-required="true"
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] focus:outline-none focus:border-primary transition appearance-none cursor-pointer disabled:opacity-50"
          >
            <option value="">Type of Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="contact-message" className="sr-only">Your Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Message"
          required
          aria-required="true"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-transparent border-b border-[#e1e1e1] text-[#3E4241] placeholder-gray-600 focus:outline-none focus:border-primary transition resize-none disabled:opacity-50"
        />
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
          ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
          ✗ Oops! Something went wrong. Please try again or contact us directly.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-transparent border-2 border-primary text-primary font-bold uppercase cursor-pointer tracking-wider py-4 rounded-md hover:bg-primary hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Submit consultation request"
      >
        {isSubmitting ? 'Sending...' : 'Submit Request'}
      </button>
    </form>
  );
}

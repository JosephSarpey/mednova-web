"use client";

import Link from "next/link";
import { Video, Calendar, Users, ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { upcomingEvents, pastEvents } from "@/data/events";

export default function EventsPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Events" items={[{ label: "Events" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* ─── Upcoming Events ─── */}
        <ScrollReveal>
          <div className="mb-24">
            <div className="text-center mb-16">
              <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">
                Don&apos;t Miss Out
              </p>
              <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
                Upcoming Events
              </h2>
              <p className="max-w-2xl mx-auto text-black/60 text-lg font-light leading-relaxed">
                Join our upcoming webinars, workshops, and community health events. All sessions are designed to empower you with knowledge and practical tools for a healthier life.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.href}
                  href={event.href}
                  className="group relative bg-white border border-gray-100 rounded-sm p-10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-secondary/5 rounded-full flex items-center justify-center">
                      <event.icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-sm">
                      {event.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-serif text-heading mb-4 group-hover:text-primary transition-colors duration-200">
                    {event.title}
                  </h3>

                  <p className="text-black/70 mb-8 leading-relaxed font-light">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-black/50">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        {event.mode}
                      </span>
                    </div>
                    <span className="flex items-center text-primary font-bold uppercase text-xs tracking-widest group-hover:gap-3 gap-1.5 transition-all duration-200">
                      Register <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}

              {/* Placeholder card for future events */}
              <div className="relative bg-gray-50 border-2 border-dashed border-gray-200 rounded-sm p-10 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold font-serif text-heading/60 mb-3">
                  More Events Coming Soon
                </h3>
                <p className="text-sm text-black/40 font-light max-w-xs leading-relaxed">
                  We&apos;re planning exciting new workshops and community health sessions. Stay tuned for announcements.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Past Event Highlights (TODO: replace with events API) ─── */}
        {/* <ScrollReveal delay={0.1}>
          <div className="mb-24">
            <div className="text-center mb-16">
              <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">
                Looking Back
              </p>
              <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
                Past Event Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm hover:shadow-lg transition duration-300 group"
                >
                  <div className="mb-6 flex justify-between items-start">
                    <div className="flex items-center text-sm text-black/50 font-medium">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-secondary/60 uppercase tracking-wider">
                      <Users className="w-3.5 h-3.5" />
                      {event.attendees}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-heading mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-black/60 text-sm leading-relaxed font-light">
                    {event.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal> */}

        {/* ─── CTA Banner ─── */}
        <ScrollReveal>
          <div className="bg-secondary rounded-sm p-10 md:p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <Video className="h-8 w-8 text-white mr-4" />
                  <h2 className="text-3xl font-bold font-serif text-white">
                    Want to Host or Suggest an Event?
                  </h2>
                </div>
                <p className="text-gray-300 max-w-xl text-lg font-light leading-relaxed">
                  We&apos;re always open to collaboration. If you&apos;re a healthcare professional or organization looking to partner on an event, webinar, or health session, we&apos;d love to hear from you.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition duration-300 whitespace-nowrap"
              >
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}

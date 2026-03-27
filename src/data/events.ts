import { Video, type LucideIcon } from "lucide-react";

export interface UpcomingEvent {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge: string;
  date: string;
  mode: string;
}

export interface PastEvent {
  title: string;
  date: string;
  attendees: string;
  summary: string;
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Webinar Registration",
    description:
      "Register for upcoming Mednova+ live educational webinars led by our team of healthcare professionals. Topics span lifestyle medicine, mental wellness, chronic disease management, and community health.",
    href: "/events/webinar-registration",
    icon: Video,
    badge: "Open",
    date: "Ongoing",
    mode: "Virtual",
  },
];

export const pastEvents: PastEvent[] = [
  {
    title: "Holistic Health & Wellbeing",
    date: "February 2026",
    attendees: "120+",
    summary:
      "An interactive session exploring the intersection of physical health, mental wellness, and lifestyle choices.",
  },
  {
    title: "Mental Health Awareness Week",
    date: "January 2026",
    attendees: "200+",
    summary:
      "A week-long series of talks, workshops, and Q&A panels focused on reducing mental health stigma.",
  },
  {
    title: "Nutrition & Chronic Disease",
    date: "December 2025",
    attendees: "95+",
    summary:
      "Expert-led webinar on using evidence-based nutrition strategies to manage and prevent chronic conditions.",
  },
];

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "Mednova+ Inc. provided exceptional service. Their holistic approach helped me improve my lifestyle and overall health significantly. I highly recommend their dedicated team.",
    author: "James Anderson",
    role: "Patient",
  },
  {
    id: 2,
    content:
      "The corporate wellness program designed by Mednova+ for our company has been a game-changer. Our employees are healthier, happier, and more productive.",
    author: "Sarah Mitchell",
    role: "HR Director",
  },
  {
    id: 3,
    content:
      "Dr. Edem Nukunu's expertise in holistic health consultancy is unmatched. His insights were invaluable for our community health initiative.",
    author: "David Osei",
    role: "Community Leader",
  },
  {
    id: 4,
    content:
      "The commitment to excellence at Mednova+ is evident in everything they do. From the initial consultation to the follow-up care, the experience was seamless.",
    author: "Elena Rodriguez",
    role: "Wellness Client",
    // No image to test fallback
  },
  {
    id: 5,
    content:
      "We partnered with Mednova+ for our regional health assessment, and their data-driven approach provided us with a clear roadmap for improvement.",
    author: "Michael Chen",
    role: "Public Health Officer",
  },
  {
    id: 6,
    content:
      "Expertise, compassion, and innovation – that's what Mednova+ brought to our partnership. They are true leaders in global health consultancy.",
    author: "Kojo Mensah",
    role: "Healthcare Administrator",
    // No image to test fallback
  },
];

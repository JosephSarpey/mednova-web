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
    content: "Mednova+ Inc. provided exceptional service. Their holistic approach helped me improve my lifestyle and overall health significantly. I highly recommend their dedicated team.",
    author: "James Anderson",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    content: "The corporate wellness program designed by Mednova+ for our company has been a game-changer. Our employees are healthier, happier, and more productive.",
    author: "Sarah Mitchell",
    role: "HR Director, TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    content: "Prof. Lloyd Okine's expertise in public health consultancy is unmatched. His insights were invaluable for our community health initiative.",
    author: "David Osei",
    role: "Community Leader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    content: "The commitment to excellence at Mednova+ is evident in everything they do. From the initial consultation to the follow-up care, the experience was seamless.",
    author: "Elena Rodriguez",
    role: "Wellness Client",
    // No image to test fallback
  },
  {
    id: 5,
    content: "We partnered with Mednova+ for our regional health assessment, and their data-driven approach provided us with a clear roadmap for improvement.",
    author: "Michael Chen",
    role: "Public Health Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 6,
    content: "Expertise, compassion, and innovation – that's what Mednova+ brought to our partnership. They are true leaders in global health consultancy.",
    author: "Kojo Mensah",
    role: "Healthcare Administrator",
    // No image to test fallback
  }
];

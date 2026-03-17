"use client";

import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { Facebook, Twitter, Linkedin, Instagram, HeartHandshake, Award, Zap } from "lucide-react";
import { doctors } from "@/data/team";

const commitments = [
  {
    icon: Award,
    title: "Evidence-Based Practice",
    description: "We systematically apply the latest research from peer-reviewed journals and clinical guidelines to ensure safe and efficacious care."
  },
  {
    icon: HeartHandshake,
    title: "Client Empowerment",
    description: "We equip you with the tools and insights necessary for lasting success, believing true empowerment comes from knowledge and support."
  },
  {
    icon: Zap,
    title: "Holistic Integration",
    description: "Using the biopsychosocial model, we address physical, psychological, and social factors for truly sustainable wellness."
  }
];

export default function TeamPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Our Team" items={[{ label: "Team" }]} />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Our Dedicated Team</p>
            <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
              Meet Our Experts
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-20 max-w-5xl mx-auto">
            {doctors.map((doc, index) => (
              <div key={index} className="group flex flex-col relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                <Link href={`/team/${doc.slug}`} className="absolute inset-0 z-10" aria-label={`View profile of ${doc.name}`} />
                <div className="relative overflow-hidden rounded-t-lg h-[350px] shrink-0">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-md object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay for desktop */}
                  <div className="hidden lg:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none">
                     <span className="bg-white text-primary px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 text-sm transition-all duration-300">View Profile</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-white/90 py-4 translate-y-full group-hover:translate-y-0 transition duration-300 text-center flex justify-center gap-4 z-20">
                    <a href={doc.socials.facebook} className="text-heading hover:text-primary"><Facebook className="h-4 w-4" /></a>
                    <a href={doc.socials.twitter} className="text-heading hover:text-primary"><Twitter className="h-4 w-4" /></a>
                    <a href={doc.socials.linkedin} className="text-heading hover:text-primary"><Linkedin className="h-4 w-4" /></a>
                    <a href={doc.socials.instagram} className="text-heading hover:text-primary"><Instagram className="h-4 w-4" /></a>
                  </div>
                </div>
                <div className="flex-1 bg-white border border-t-0 text-center p-6 rounded-b-lg shadow-sm group-hover:shadow-lg transition duration-300 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-heading font-serif mb-1 group-hover:text-primary transition-colors relative z-20 pointer-events-none">{doc.name}</h3>
                    <p className="text-primary text-sm uppercase tracking-wider relative z-20 pointer-events-none mb-4">{doc.role}</p>
                  </div>
                  {/* Explicit View Profile link visible on mobile/tablet */}
                  <div className="lg:hidden mt-auto pt-4 border-t border-gray-100 relative z-20 pointer-events-none">
                     <span className="text-primary font-semibold text-sm inline-flex items-center">
                       View Profile <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                     </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Our Commitment Section */}
          <div className="bg-gray-50 rounded-2xl p-12 md:p-16 border border-gray-100 shadow-sm mb-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-heading mb-4">Our Commitment</h2>
              <p className="text-gray-600">At MedNova+, we prioritize empowering clients through knowledge and actionable strategies. Our commitment to evidence-based practice is the cornerstone of our methodology, providing a seamless continuum of care.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {commitments.map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="h-8 w-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Join Our Team CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold text-heading mb-6">Want to Join Our Mission?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">We are always looking for passionate health professionals and consultants to join our growing global team.</p>
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-heading transition duration-300 shadow-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

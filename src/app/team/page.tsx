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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {doctors.map((doc, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-t-lg h-[350px]">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="rounded-md object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-white/90 py-4 translate-y-full group-hover:translate-y-0 transition duration-300 text-center flex justify-center gap-4">
                    <a href={doc.socials.facebook} className="text-heading hover:text-primary"><Facebook className="h-4 w-4" /></a>
                    <a href={doc.socials.twitter} className="text-heading hover:text-primary"><Twitter className="h-4 w-4" /></a>
                    <a href={doc.socials.linkedin} className="text-heading hover:text-primary"><Linkedin className="h-4 w-4" /></a>
                    <a href={doc.socials.instagram} className="text-heading hover:text-primary"><Instagram className="h-4 w-4" /></a>
                  </div>
                </div>
                <div className="bg-white border text-center p-6 rounded-b-lg shadow-sm group-hover:shadow-lg transition duration-300">
                  <h3 className="text-xl font-bold text-heading font-serif mb-1">{doc.name}</h3>
                  <p className="text-primary text-sm uppercase tracking-wider">{doc.role}</p>
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

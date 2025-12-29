import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const doctors = [
  {
    name: "Dr. Lloyd Okine",
    role: "Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Lifestyle Medicine Specialist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Dr. Michael Chen",
    role: "Public Health Consultant",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    name: "Dr. Emily Williams",
    role: "Wellness Coach",
    image: "https://images.unsplash.com/photo-1651008325506-71d345a91f04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    socials: { facebook: "#", twitter: "#", linkedin: "#", instagram: "#" }
  }
];

export default function TeamPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Our Doctors" items={[{ label: "Team" }]} />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Our Dedicated Team</p>
                <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
                    Meet Our Experts
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {doctors.map((doc, index) => (
                    <div key={index} className="group">
                        <div className="relative overflow-hidden rounded-t-lg">
                            <img src={doc.image} alt={doc.name} className="w-full h-[350px] object-cover transition duration-500 group-hover:scale-105" />
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
        </div>
      </section>
    </div>
  );
}

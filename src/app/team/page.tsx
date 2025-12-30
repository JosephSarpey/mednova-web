import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Facebook, Twitter, Linkedin, Instagram, HeartHandshake, Award, Zap } from "lucide-react";

interface Socials {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

interface Doctor {
  name: string;
  role: string;
  image: string;
  socials: Socials;
}

const doctors: Doctor[] = [
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

const commitments = [
  {
    icon: HeartHandshake,
    title: "World-Class Care",
    description: "We are committed to providing the highest standard of healthcare solutions tailored to your unique needs."
  },
  {
    icon: Award,
    title: "Holistic Approach",
    description: "Our methods focus on the whole person, integrating physical, mental, and social well-being."
  },
  {
    icon: Zap,
    title: "Constant Innovation",
    description: "We stay at the forefront of medical technology and lifestyle medicine to ensure the best outcomes."
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

            {/* Our Commitment Section */}
            <div className="bg-gray-50 rounded-2xl p-12 md:p-16 border border-gray-100 shadow-sm mb-20">
                <div className="max-w-3xl mx-auto text-center mb-12">
                   <h2 className="text-3xl font-serif font-bold text-heading mb-4">Our Commitment</h2>
                   <p className="text-gray-600">At Mednova+, we don't just treat symptoms. We build relationships and foster health transformations through dedicated expertise.</p>
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

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { doctors } from "@/data/team";

export default function TeamSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Our Dedicated Team</p>
          <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
            Meet Our Experts
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {doctors.slice(0, 4).map((doc, index) => (
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

        <div className="text-center">
          <Link
            href="/team"
            className="inline-block border-2 border-heading text-heading px-8 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-heading hover:text-white transition duration-300"
          >
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}

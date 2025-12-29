import Link from "next/link";
import { HeartPulse, Globe, Stethoscope, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const services = [
  {
    title: "Holistic Health",
    description: "Comprehensive approaches to health that look at the whole person—body, mind, spirit, and emotions.",
    icon: HeartPulse,
    href: "/services",
  },
  {
    title: "Lifestyle Medicine",
    description: "Evidence-based therapeutic interventions to treat and prevent chronic diseases through lifestyle changes.",
    icon: Stethoscope,
    href: "/services",
  },
  {
    title: "Public Health",
    description: "Expert guidance on public health initiatives, policy development, and community health strategies.",
    icon: Globe,
    href: "/services",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Our Services</p>
          <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
            We Offer Different Services
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <SpotlightCard key={service.title} className="bg-white rounded-md p-10 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 group hover:-translate-y-2" spotlightColor="rgba(0, 122, 255, 0.1)">
              <div className="mb-8 relative">
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-primary/10 rounded-full group-hover:scale-125 transition duration-300" />
                <service.icon className="h-12 w-12 text-primary relative z-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-heading mb-4 group-hover:text-primary transition duration-300">{service.title}</h3>
              <p className="text-black mb-8 leading-relaxed">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-flex items-center text-heading font-bold uppercase text-xs tracking-wider hover:text-primary transition"
              >
                Read More <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

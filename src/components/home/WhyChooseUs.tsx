import { Users, Cpu, HeartPulse, ShieldCheck } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

const features = [
  {
    title: "Comprehensive Approach",
    description: "Our multidisciplinary services address the full spectrum of health and wellness needs, from prevention to intervention.",
    icon: HeartPulse,
  },
  {
    title: "Expertise and Innovation",
    description: "Our team of professionals combines deep expertise with cutting-edge research to deliver impactful solutions.",
    icon: Cpu,
  },
  {
    title: "Community-Centered Care",
    description: "We prioritize the unique needs of the communities we serve, fostering trust and collaboration.",
    icon: Users,
  },
  {
    title: "Commitment to Excellence",
    description: "Every service we provide is guided by a dedication to quality, compassion, and measurable results.",
    icon: ShieldCheck,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Why Choose Us?</p>
          <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
            The MedNova+ Advantage
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto leading-relaxed">
            Every service we provide is guided by a dedication to quality, compassion, and measurable results, ensuring holistic well-being for our communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <SpotlightCard
              key={feature.title}
              className="bg-white rounded-md p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group"
              spotlightColor="rgba(0, 122, 255, 0.05)"
            >
              <div className="mb-6 p-3 bg-primary/5 rounded-lg w-fit group-hover:bg-primary/10 transition duration-300">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-heading mb-3">{feature.title}</h3>
              <p className="text-black/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

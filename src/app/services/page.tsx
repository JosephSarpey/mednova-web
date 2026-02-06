import { HeartPulse, Globe, Stethoscope, CheckCircle, Smile, ArrowRight, BookOpen, Leaf, Brain } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { services } from "@/data/services";
import Link from "next/link";

const iconMap: Record<string, any> = {
  HeartPulse,
  Globe,
  Stethoscope,
  Smile,
  BookOpen,
  Leaf,
  Brain
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Our Services" items={[{ label: "Services" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-24">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || HeartPulse;

            return (
              <div key={service.id} className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-heading mb-6">{service.title}</h2>
                  <p className="text-lg text-black mb-8 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Preview of top-level items */}
                  <ul className="space-y-4 mb-8">
                    {service.items.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center text-black font-medium">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span>{item.name}</span>
                      </li>
                    ))}
                    {service.items.length > 3 && (
                      <li className="text-gray-500 pl-8">and more...</li>
                    )}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group"
                  >
                    View Detailed Services
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="w-full md:w-1/2 bg-gray-50 rounded-lg h-[450px] relative overflow-hidden group shadow-lg shrink-0">
                  <Image
                    src={service.image}
                    alt={`${service.title} Image`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

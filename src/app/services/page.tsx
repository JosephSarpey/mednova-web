import { HeartPulse, ArrowRight } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { services } from "@/data/services";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Our Services" items={[{ label: "Services" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-center max-w-3xl mx-auto text-lg text-black/80 mb-12">
          We offer a range of services spanning healthcare, public health, education, mental
          health, and dental laboratory solutions. Select a service to learn more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group block bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative h-40 w-full bg-gray-50">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-heading mb-2">{service.navLabel ?? service.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                <div className="flex items-center text-primary font-medium">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

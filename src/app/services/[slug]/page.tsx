import { notFound } from "next/navigation";
import { services } from "@/data/services";
import PageHeader from "@/components/layout/PageHeader";
import { HeartPulse, Globe, Stethoscope, CheckCircle, Smile, ArrowLeft, BookOpen, Leaf, Brain } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const iconMap: Record<string, any> = {
    HeartPulse,
    Globe,
    Stethoscope,
    Smile,
    BookOpen,
    Leaf,
    Brain
};

export function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

type Params = Promise<{ slug: string }>;

export default async function ServiceDetailPage({ params }: { params: Params }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    const Icon = iconMap[service.icon] || HeartPulse;

    return (
        <div className="bg-white min-h-screen">
            <PageHeader
                title={service.title}
                items={[{ label: "Services", href: "/services" }, { label: service.title }]}
                backgroundImage={service.image}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="mb-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to Services
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                                <Icon className="h-10 w-10 text-primary" />
                            </div>

                            <h1 className="text-4xl font-serif font-bold text-heading mb-6">{service.title}</h1>
                            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Service Items List */}
                            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                                <h3 className="text-2xl text-black font-semibold mb-6">What We Offer</h3>
                                <ul className="space-y-6">
                                    {service.items.map((item, index) => (
                                        <li key={index} className="flex flex-col">
                                            <div className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                                                <span className="text-lg font-medium text-black">{item.name}</span>
                                            </div>

                                            {/* Nested Sub-items */}
                                            {item.subItems && item.subItems.length > 0 && (
                                                <ul className="mt-3 ml-9 space-y-3 border-l-2 border-primary/20 pl-4">
                                                    {item.subItems.map((subItem, SubIndex) => (
                                                        <li key={SubIndex} className="text-gray-600">
                                                            {subItem}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar / Visual Area */}
                        <div className="lg:w-1/3 space-y-8">
                            {/* Service Image */}
                            <div className="rounded-2xl h-[400px] w-full relative overflow-hidden group shadow-lg">
                                <Image
                                    src={service.image}
                                    alt={`${service.title} Image`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition duration-700"
                                />
                            </div>

                            {/* Call to Action Box */}
                            <div className="bg-primary text-white rounded-2xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold mb-4">Need Assistance?</h3>
                                <p className="mb-6 opacity-90">
                                    Our team is ready to help you with personalized care and expert advice. Contact us today.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-block w-full text-center bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

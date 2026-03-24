import { notFound } from "next/navigation";
import { services } from "@/data/services";
import PageHeader from "@/components/layout/PageHeader";
import { HeartPulse, CheckCircle, Smile, ArrowLeft, BookOpen, Leaf, Brain, BookOpenCheck, HandHeart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const iconMap: Record<string, any> = {
    HeartPulse,
    Smile,
    BookOpen,
    Leaf,
    Brain,
    BookOpenCheck,
    HandHeart
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
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            {service.slug === "dental-laboratory-services" && (
                                <div className="space-y-6 mb-8">
                                    <h2 className="text-2xl font-semibold text-black">Why You Should Choose our Dental Laboratory Services</h2>

                                    <h3 className="text-lg font-medium text-black mt-4">Unmatched Expertise & Experience with Dual Clinical Insight</h3>
                                    <p className="text-gray-600">
                                        MedNova+, Inc. brings a level of expertise uniquely suited to New York’s demanding dental environment. With a seasoned dental laboratory technician and a foreign‑trained dentist who is also a certified dental technician, our team provides both the technical mastery and clinical understanding required in one of the most competitive dental markets in the U.S. This dual perspective ensures restorations that meet the highest standards for accuracy, function, esthetics, and regulatory expectations across New York and the entire country.
                                    </p>

                                    <h3 className="text-lg font-medium text-black">High-Quality, Fully Customized Restorations Designed for U.S. Patients</h3>
                                    <p className="text-gray-600">
                                        Every restoration we produce is meticulously crafted to serve the diverse and dynamic patient population of New York and the U.S. market. From culturally varied esthetic demands to advanced restorative needs, we tailor each denture, nightguard, implant-supported prosthesis, and orthodontic appliance to the patient’s anatomy, lifestyle, and oral health requirements. Our commitment to top-tier materials and precision fabrication ensures products that are durable, natural-looking, and aligned with the expectations of American dental care standards.
                                    </p>

                                    <h3 className="text-lg font-medium text-black">Comprehensive Support & Advisory Partnership for Modern U.S. Practices</h3>
                                    <p className="text-gray-600">
                                        We understand the fast-paced, technology-driven nature of U.S. dental practices—especially in New York. That’s why we go beyond fabrication, partnering closely with clinicians to offer case planning, treatment coordination, digital workflow integration, and chairside‑informed guidance. Whether you're navigating complex implant cases, digital impressions, or full‑mouth rehabilitation, our collaborative approach strengthens your practice, reduces barriers, and supports superior patient outcomes.
                                    </p>

                                    <h3 className="text-lg font-medium text-black">Rapid, Reliable & Patient‑Centered Service With Quick Turnaround Times</h3>
                                    <p className="text-gray-600">
                                        New York patients and practices expect efficiency—and we deliver. Our streamlined processes, digital CAD/CAM capabilities, and responsive communication enable quick turnaround times without compromising quality. Whether you need expedited denture repairs, fast-tracked appliances, or consistent scheduling reliability, MedNova+ keeps your practice moving. Our focus on precision and punctuality helps you reduce chair time, manage patient expectations, and maintain a rhythm that matches the pace of New York dentistry.
                                    </p>

                                    <p className="text-gray-800 font-semibold">We deliver on our promise.</p>
                                </div>
                            )}

                            {/* Mobile Image */}
                            <div className="lg:hidden rounded-2xl h-[300px] w-full relative overflow-hidden shadow-lg mb-12">
                                <Image
                                    src={service.image}
                                    alt={`${service.title} Image`}
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>

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
                            {/* Service Image (Desktop Only) */}
                            <div className="hidden lg:block rounded-2xl h-[400px] w-full relative overflow-hidden group shadow-lg">
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

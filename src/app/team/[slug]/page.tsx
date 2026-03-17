import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { doctors } from "@/data/team";
import { Facebook, Twitter, Linkedin, Instagram, ArrowLeft, CheckCircle2 } from "lucide-react";

interface TeamMemberPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return doctors.map((doc) => ({
        slug: doc.slug,
    }));
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
    const { slug } = await params;
    const doctor = doctors.find((doc) => doc.slug === slug);

    if (!doctor) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            <PageHeader
                title={doctor.name}
                items={[
                    { label: "Team", href: "/team" },
                    { label: doctor.name }
                ]}
            />

            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <Link href="/team" className="inline-flex items-center text-primary hover:text-heading font-medium mb-10 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Team
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Left Column: Image and quick info */}
                        <div className="lg:col-span-4 lg:col-start-1">
                            <div className="sticky top-24">
                                <div className="relative overflow-hidden rounded-2xl h-[400px] mb-6 shadow-lg">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm text-center mb-6">
                                    <h1 className="text-2xl font-bold text-heading font-serif mb-2">{doctor.name}</h1>
                                    <p className="text-primary font-medium tracking-wide uppercase text-sm mb-6 pb-6 border-b border-gray-200">
                                        {doctor.role}
                                    </p>

                                    <div className="flex justify-center gap-4">
                                        <a href={doctor.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-md transition-all shadow-sm border border-gray-100">
                                            <Facebook className="h-4 w-4" />
                                        </a>
                                        <a href={doctor.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-md transition-all shadow-sm border border-gray-100">
                                            <Twitter className="h-4 w-4" />
                                        </a>
                                        <a href={doctor.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-md transition-all shadow-sm border border-gray-100">
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                        <a href={doctor.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-md transition-all shadow-sm border border-gray-100">
                                            <Instagram className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>

                                {doctor.profile?.locationInformation && doctor.profile.locationInformation.length > 0 && (
                                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                        <h3 className="font-bold text-heading mb-4 text-lg">Location</h3>
                                        <ul className="space-y-2">
                                            {doctor.profile.locationInformation.map((loc, idx) => (
                                                <li key={idx} className="flex items-start text-gray-700">
                                                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                                                    <span>{loc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Detailed Info */}
                        <div className="lg:col-span-8">

                            <div className="mb-12">
                                <h2 className="text-3xl font-serif font-bold text-heading mb-6">About</h2>
                                {doctor.profile?.bio.map((paragraph, index) => (
                                    <p key={index} className="text-gray-600 leading-relaxed mb-4 text-lg">
                                        {paragraph}
                                    </p>
                                )) || <p className="text-gray-600 leading-relaxed text-lg">No additional biography information is available at this time.</p>}
                            </div>

                            {doctor.profile && (
                                <div className="space-y-12">
                                    {doctor.profile.coreSkills && doctor.profile.coreSkills.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-serif font-bold text-heading mb-6 border-b border-gray-200 pb-2">Core Skills & Expertise</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {doctor.profile.coreSkills.map((skill, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 shrink-0"></div>
                                                        <span className="text-gray-700 leading-relaxed">{skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {doctor.profile.specialties && doctor.profile.specialties.length > 0 && (
                                        <div>
                                            <h3 className="text-2xl font-serif font-bold text-heading mb-6 border-b border-gray-200 pb-2">Treatment Specialties</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {doctor.profile.specialties.map((specialty, index) => (
                                                    <span key={index} className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        {doctor.profile.populationServed && doctor.profile.populationServed.length > 0 && (
                                            <div>
                                                <h3 className="text-xl font-serif font-bold text-heading mb-4">Patient Focus</h3>
                                                <ul className="space-y-3">
                                                    {doctor.profile.populationServed.map((pop, index) => (
                                                        <li key={index} className="flex items-center text-gray-700">
                                                            <CheckCircle2 className="w-4 h-4 text-primary mr-3 shrink-0" />
                                                            <span>{pop}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {doctor.profile.languagesSpoken && doctor.profile.languagesSpoken.length > 0 && (
                                            <div>
                                                <h3 className="text-xl font-serif font-bold text-heading mb-4">Languages Spoken</h3>
                                                <ul className="space-y-3">
                                                    {doctor.profile.languagesSpoken.map((lang, index) => (
                                                        <li key={index} className="flex items-center text-gray-700">
                                                            <CheckCircle2 className="w-4 h-4 text-primary mr-3 shrink-0" />
                                                            <span>{lang}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

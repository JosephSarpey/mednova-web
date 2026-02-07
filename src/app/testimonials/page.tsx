"use client";

import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { Quote, Star, ExternalLink } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsPage() {
    return (
        <div className="bg-white min-h-screen">
            <PageHeader title="Client Testimonials" items={[{ label: "Testimonials" }]} />

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Our Success Stories</p>
                        <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
                            What Our Clients Say
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We are proud to have helped many individuals and organizations achieve their health and wellness goals. Read some of their experiences below.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-center space-x-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                    ))}
                                </div>

                                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                                <p className="text-gray-600 italic leading-relaxed mb-8 flex-grow text-lg">
                                    "{testimonial.content}"
                                </p>

                                <div className="flex items-center space-x-4 border-t pt-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        {testimonial.image ? (
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.author}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-lg font-bold text-primary">
                                                {testimonial.author
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-heading">{testimonial.author}</h4>
                                        <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Google Review CTA */}
                    <div className="bg-heading rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -skew-y-6 transform origin-top-left -translate-y-12"></div>

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                                Share Your Own Experience
                            </h2>
                            <p className="text-gray-300 mb-10 text-lg">
                                Your feedback helps us improve and helps others find the care they need. We'd love to hear from you on Google Reviews.
                            </p>
                            <a
                                href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK_HERE/review"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-heading transition duration-300 shadow-lg group"
                            >
                                Rate Us on Google
                                <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

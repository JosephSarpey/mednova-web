"use client";

import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    content: "Mednova+ Inc. provided exceptional service. Their holistic approach helped me improve my lifestyle and overall health significantly. I highly recommend their dedicated team.",
    author: "James Anderson",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    content: "The corporate wellness program designed by Mednova+ for our company has been a game-changer. Our employees are healthier, happier, and more productive.",
    author: "Sarah Mitchell",
    role: "HR Director, TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    content: "Prof. Lloyd Okine's expertise in public health consultancy is unmatched. His insights were invaluable for our community health initiative.",
    author: "David Osei",
    role: "Community Leader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Testimonials</p>
            <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">Happy Clients</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative h-[400px] sm:h-[350px]">
                {testimonials.map((item, index) => {
                    // Calculate position relative to current index
                    // 0 = active, 1 = next, -1 (or length-1) = prev
                    let position = "translate-x-full opacity-0 scale-95";
                    let zIndex = 0;
                    
                    if (index === currentIndex) {
                        position = "translate-x-0 opacity-100 scale-100";
                        zIndex = 20;
                    } else if (index === (currentIndex + 1) % testimonials.length) {
                        position = "translate-x-full opacity-0 scale-95"; // Prepare for next
                    } else if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) {
                         position = "-translate-x-full opacity-0 scale-95"; // Previous
                    }

                    return (
                        <div 
                            key={item.id}
                            className={cn(
                                "absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex justify-center items-center px-4",
                                position
                            )}
                            style={{ zIndex }}
                        >
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 max-w-2xl w-full text-center relative group hover:shadow-2xl transition duration-500">
                                <Quote className="absolute top-8 left-8 h-8 w-8 text-primary/20" />
                                
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                     <div className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                                        <Image 
                                            src={item.image} 
                                            alt={item.author} 
                                            width={64} 
                                            height={64} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <p className="text-lg md:text-xl text-heading font-light leading-relaxed mb-6 italic">
                                        "{item.content}"
                                    </p>
                                    <div>
                                        <h4 className="text-lg font-bold uppercase tracking-wider text-primary">{item.author}</h4>
                                        <p className="text-gray-500 text-sm font-medium">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center space-x-6 mt-8">
                <button 
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white border border-gray-200 text-heading hover:bg-primary hover:text-white hover:border-primary transition duration-300 shadow-sm"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex space-x-2">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                idx === currentIndex ? "bg-primary w-6" : "bg-gray-300 hover:bg-primary/50"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <button 
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white border border-gray-200 text-heading hover:bg-primary hover:text-white hover:border-primary transition duration-300 shadow-sm"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
}

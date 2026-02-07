"use client";

import Link from "next/link";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { testimonials } from "@/data/testimonials";

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function TestimonialSection() {
    const displayTestimonials = testimonials.slice(0, 3);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = displayTestimonials.length - 1;
            if (nextIndex >= displayTestimonials.length) nextIndex = 0;
            return nextIndex;
        });
    }, [displayTestimonials.length]);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex, paginate]);


    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Testimonials</p>
                    <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">Happy Clients</h2>
                </div>

                <div className="relative max-w-4xl mx-auto h-[400px] sm:h-[350px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute w-full px-4 flex justify-center items-center"
                        >
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 max-w-2xl w-full text-center relative group hover:shadow-2xl transition duration-500 cursor-grab active:cursor-grabbing">
                                <Quote className="absolute top-8 left-8 h-8 w-8 text-primary/20" />

                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <div className="w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-primary/10 flex items-center justify-center">
                                        {displayTestimonials[currentIndex].image ? (
                                            <Image
                                                src={displayTestimonials[currentIndex].image}
                                                alt={displayTestimonials[currentIndex].author}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xl font-bold text-primary">
                                                {displayTestimonials[currentIndex].author
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <p className="text-lg md:text-xl text-heading font-light leading-relaxed mb-6 italic select-none">
                                        "{displayTestimonials[currentIndex].content}"
                                    </p>
                                    <div>
                                        <h4 className="text-lg font-bold uppercase tracking-wider text-primary">{displayTestimonials[currentIndex].author}</h4>
                                        <p className="text-gray-500 text-sm font-medium">{displayTestimonials[currentIndex].role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center space-x-6 mt-8">
                    <button
                        onClick={() => paginate(-1)}
                        className="p-3 rounded-full bg-white border border-gray-200 text-heading hover:bg-primary hover:text-white hover:border-primary transition duration-300 shadow-sm z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex space-x-2 z-10">
                        {displayTestimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                    idx === currentIndex ? "bg-primary w-6" : "bg-gray-300 hover:bg-primary/50"
                                )}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(1)}
                        className="p-3 rounded-full bg-white border border-gray-200 text-heading hover:bg-primary hover:text-white hover:border-primary transition duration-300 shadow-sm z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/testimonials"
                        className="inline-flex items-center text-primary font-bold uppercase tracking-wider hover:text-heading transition-colors group"
                    >
                        View All Testimonials
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

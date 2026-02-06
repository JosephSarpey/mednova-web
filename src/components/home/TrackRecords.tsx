"use client";

import { Trophy, Users, Globe2, Building2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const Counter = ({ end, suffix = "" }: { end: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16); // 60fps

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function TrackRecords() {
  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mednova_space.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Darker, higher contrast overlay */}
        <div className="absolute inset-0 bg-gray-900/85 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold sm:text-5xl mb-6 leading-tight">
              Evidence-Based <br /> Holistic Impact
            </h2>
            <p className="text-lg text-gray-300 mb-8 font-light leading-relaxed">
              At MedNova+, our dedication to innovation and scientific rigor translates into measurable results across public health, mental wellness, and dental excellence.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              From reducing health disparities in underserved communities to training the next generation of healthcare leaders, we are redefining global wellness.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center border border-white/10 hover:bg-white/10 transition duration-300 group">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">
                <Counter end={10000} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 font-medium">Individuals Supported</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center border border-white/10 hover:bg-white/10 transition duration-300 group">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">
                <Counter end={100} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 font-medium">Dental Practices</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center border border-white/10 hover:bg-white/10 transition duration-300 group">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">
                <Counter end={5000} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 font-medium">Professionals Trained</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center border border-white/10 hover:bg-white/10 transition duration-300 group">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">
                <Counter end={10} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

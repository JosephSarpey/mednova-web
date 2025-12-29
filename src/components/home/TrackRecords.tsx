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
          src="/track_record_bg.jpg" 
          alt="Background" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold sm:text-5xl mb-6 leading-tight">
              We Are A Certified <br /> Award Winning Clinic
            </h2>
            <p className="text-lg text-gray-300 mb-8 font-light leading-relaxed">
              Mednova+ Inc. has a proven history of delivering excellence in healthcare consultancy and wellness programs. Our commitment to quality and innovation has helped us build lasting relationships and achieve measurable results.
            </p>
            <p className="text-lg text-gray-300 font-light leading-relaxed">
              From local community initiatives to global public health strategies, we bring expertise and dedication to every project we undertake.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white/5 p-8 rounded-sm text-center border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold font-serif mb-2">
                <Counter end={500} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400">Happy Patients</div>
            </div>
            <div className="bg-white/5 p-8 rounded-sm text-center border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold font-serif mb-2">
                <Counter end={20} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400">Hospitals</div>
            </div>
             <div className="bg-white/5 p-8 rounded-sm text-center border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Globe2 className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold font-serif mb-2">
                <Counter end={2} />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400">Country Offices</div>
            </div>
             <div className="bg-white/5 p-8 rounded-sm text-center border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-7 w-7 text-primary" />
              </div>
              <div className="text-4xl font-bold font-serif mb-2">
                <Counter end={10} suffix="+" />
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400">Year Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

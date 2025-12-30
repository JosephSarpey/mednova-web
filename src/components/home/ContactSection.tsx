"use client";

import { Play } from "lucide-react";
import ConsultationForm from "@/components/forms/ContactForm";

export default function ConsultationSection() {
  return (
    <section className="pt-20 pb-20 pl-1 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column - Consultation Form (Overlapping Hero) */}
          <div className="bg-white p-10 rounded-sm shadow-xl -mt-24 relative z-20">
            <h3 className="text-[15px] font-bold text-[#3E4241] mb-2 uppercase tracking-wider">Request for your</h3>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8 capitalize">Consultation</h2>
            
            <ConsultationForm />
          </div>

          {/* Right Column - About / Intro */}
          <div className="flex flex-col justify-center pt-10 lg:pt-0">
            <h4 className="text-primary font-bold uppercase tracking-[2px] mb-4 text-sm">Welcome to Mednova+</h4>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-heading mb-6 leading-tight">
              Holistic Approaches for <br /> <span className="text-primary font-black">Better Health</span>
            </h2>
            <p className="text-[#3E4241] mb-6 text-[15px] leading-7 font-light">
              We define health not merely as the absence of disease, but as a state of complete physical, mental, and social well-being. Our approach integrates the best of modern medicine with evidence-based lifestyle changes to prevent and treat chronic diseases.
            </p>
             <p className="text-[#3E4241] mb-8 text-[15px] leading-7 font-light">
              Whether you are looking for personal health transformation or organizational public health strategies, our team of experts is here to guide you every step of the way.
            </p>
            
            <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg group cursor-pointer mt-4">
              {/* Placeholder for video/image */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-300 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Medical Team" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition duration-300">
                  <Play className="h-6 w-6 text-primary fill-current" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, Calendar } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

export default function Hero() {
  return (
    <div className="relative bg-gray-900 h-auto min-h-screen w-full flex flex-col">
      {/* Hero Content Area */}
      <div className="relative flex-grow min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Medical Office"
            fill
            className="object-cover"
            priority
          />
          {/* Darker gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/85 to-black/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-32">
          <div className="max-w-4xl text-white">
            <span className="block text-blue-400 font-bold tracking-[2px] uppercase mb-4 text-sm md:text-base pl-1 shadow-black drop-shadow-md">
              Holistic Health • Lifestyle • Wellness
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.1] drop-shadow-lg">
              <BlurText text="We care about" className="block text-white" delay={0.2} />
              <BlurText text="your health" className="block text-white" delay={0.8} />
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-12 max-w-xl font-light leading-relaxed pl-1 drop-shadow-md">
              Mednova+ Inc. provides premier holistic health, wellness, and lifestyle medicine solutions, alongside expert public health consultancy to improve quality of life.
            </p>
            <div className="flex flex-wrap gap-4 pl-1">
               <Link
                href="/services"
                className="inline-block bg-primary text-white uppercase tracking-wider px-10 py-4 rounded-md transition duration-300 hover:bg-white hover:text-primary border-2 border-primary shadow-lg"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-transparent hover:bg-white text-white hover:text-primary uppercase tracking-wider px-10 py-4 rounded-md transition duration-300 border-2 border-white shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Boxes - Overlapping or stacked at bottom */}
      <div className="relative z-20 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 -mt-20 shadow-2xl">
              {/* Box 1: Emergency */}
              <div className="bg-primary p-10 text-white">
                 <h3 className="text-xl font-bold font-serif mb-4">Emergency Cases</h3>
                 <p className="mb-6 text-white/90 text-sm leading-relaxed">
                    If you feel you are not healthy proper lifestyle choices are valuable. Contact us for immediate consultation.
                 </p>
                 <div className="flex items-center text-xl font-bold">
                    <Phone className="h-6 w-6 mr-3" />
                    +1 212-555-0123
                 </div>
              </div> 
              
              {/* Box 2: Schedule */}
              <div className="bg-secondary p-10 text-white">
                 <h3 className="text-xl font-bold font-serif mb-4">Doctors Timetable</h3>
                 <p className="mb-6 text-white/90 text-sm leading-relaxed">
                    Qualified doctors available for consultation on specific days. Check our weekly schedule.
                 </p>
                 <Link href="/team" className="inline-flex items-center font-bold uppercase text-xs tracking-widest hover:text-primary transition">
                    View Timetable <Calendar className="ml-2 h-4 w-4" />
                 </Link>
              </div>
              
              {/* Box 3: Opening Hours */}
              <div className="bg-primary p-10 text-white">
                 <h3 className="text-xl font-bold font-serif mb-6">Opening Hours</h3>
                 <ul className="space-y-3 text-sm">
                    <li className="flex justify-between border-b border-white/20 pb-2">
                       <span>Monday - Friday</span>
                       <span>8:00 - 18:00</span>
                    </li>
                    <li className="flex justify-between border-b border-white/20 pb-2">
                       <span>Saturday</span>
                       <span>9:00 - 17:00</span>
                    </li>
                     <li className="flex justify-between pb-2">
                       <span>Sunday</span>
                       <span>Closed</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

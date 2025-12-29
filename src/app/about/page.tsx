import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { CheckCircle, Play } from "lucide-react";
import TrackRecords from "@/components/home/TrackRecords";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="About Us" items={[{ label: "About" }]} />

      {/* Intro Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative h-[500px] w-full rounded-sm overflow-hidden shadow-2xl">
                 <img 
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="About Mednova" 
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition duration-300">
                        <Play className="h-8 w-8 text-white fill-current" />
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary p-10 hidden md:block rounded-sm shadow-xl">
                 <h2 className="text-5xl font-bold text-white font-serif mb-2">10+</h2>
                 <p className="text-white/80 uppercase tracking-wider text-sm">Years Experience</p>
              </div>
            </div>
            
            <div className="pt-10 lg:pt-0">
               <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-4">Welcome to Mednova+</p>
               <h2 className="text-4xl lg:text-5xl font-bold font-serif text-heading mb-8 leading-tight">
                  Best Care For Your <br /> Good Health
               </h2>
               <p className="text-black mb-6 text-lg font-light leading-relaxed">
                  Mednova+ Inc. is a leading provider of holistic health, wellness, and lifestyle medicine solutions. We are dedicated to bridging the gap between conventional medicine and public health initiatives.
               </p>
               <div className="space-y-4 mb-10">
                  <div className="flex items-start">
                     <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                     <p className="text-black font-medium">Holistic Approach to Wellness</p>
                  </div>
                   <div className="flex items-start">
                     <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                     <p className="text-black font-medium">Certified Expert Doctors</p>
                  </div>
                   <div className="flex items-start">
                     <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                     <p className="text-black font-medium">Evidence-Based Practices</p>
                  </div>
               </div>
               <Link href="/services" className="inline-block bg-primary text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-transparent hover:text-primary border-2 border-primary transition duration-300 rounded-md">
                  Explore Services
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision Cards */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-10 border-b-4 border-primary shadow-sm hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-bold font-serif text-heading mb-4">Our Mission</h3>
                  <p className="text-black leading-relaxed">To empower individuals and communities to achieve optimal health through holistic, evidence-based, and accessible solutions.</p>
               </div>
               <div className="bg-white p-10 border-b-4 border-secondary shadow-sm hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-bold font-serif text-heading mb-4">Our Vision</h3>
                  <p className="text-black leading-relaxed">A world where comprehensive health and wellness are accessible to all, driving global improvements in quality of life.</p>
               </div>
               <div className="bg-white p-10 border-b-4 border-mednova-green shadow-sm hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-bold font-serif text-heading mb-4">Our Values</h3>
                  <p className="text-black leading-relaxed">Compassion, Innovation, Integrity, and Excellence guide every interaction and service we provide.</p>
               </div>
            </div>
         </div>
      </section> 
      <TrackRecords />
    </div>
  );
}

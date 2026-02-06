import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { CheckCircle, Play } from "lucide-react";
import TrackRecords from "@/components/home/TrackRecords";
import WhyChooseUs from "@/components/home/WhyChooseUs";

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
                        <Image
                           src="/mednova_space.jpg"
                           alt="About Mednova"
                           fill
                           sizes="(max-width: 1024px) 100vw, 50vw"
                           className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition duration-300 z-10">
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
                        Transforming Personal <br /> Health and Wellness
                     </h2>
                     <p className="text-black mb-6 text-lg font-light leading-relaxed">
                        MedNova+, Inc. is dedicated to transforming the landscape of personal health and wellness including public health programming and dental lab services. Founded on the principles of innovation, compassion, and scientific rigor, we are committed to empowering individuals through evidence-based practices.
                     </p>
                     <div className="space-y-4 mb-10">
                        <div className="flex items-start">
                           <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                           <p className="text-black font-medium">Holistic Biopsychosocial Model</p>
                        </div>
                        <div className="flex items-start">
                           <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                           <p className="text-black font-medium">Evidence-Based Clinical Support</p>
                        </div>
                        <div className="flex items-start">
                           <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1" />
                           <p className="text-black font-medium">Multidisciplinary Team of Experts</p>
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
                     <p className="text-black leading-relaxed">To empower individuals and communities through innovative, holistic, and evidence-based health and wellness services that promote physical, mental, and emotional well-being.</p>
                  </div>
                  <div className="bg-white p-10 border-b-4 border-secondary shadow-sm hover:shadow-xl transition duration-300">
                     <h3 className="text-2xl font-bold font-serif text-heading mb-4">Our Vision</h3>
                     <p className="text-black leading-relaxed">To be a global leader in integrative health, transforming lives by fostering sustainable wellness, advancing knowledge, and building healthier communities.</p>
                  </div>
                  <div className="bg-white p-10 border-b-4 border-mednova-green shadow-sm hover:shadow-xl transition duration-300">
                     <h3 className="text-2xl font-bold font-serif text-heading mb-4">Our Values</h3>
                     <p className="text-black leading-relaxed">Innovation, Compassion, Scientific Rigor, Integrity, and Excellence guide our commitment to holistic care and measurable results.</p>
                  </div>
               </div>
            </div>
         </section>
         <TrackRecords />
         <WhyChooseUs />
      </div>
   );
}

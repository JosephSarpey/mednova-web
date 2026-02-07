import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import { CheckCircle, Play, Dna, Brain, Globe, Activity, Sparkles, PersonStanding } from "lucide-react";
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
                     <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 bg-primary/95 backdrop-blur-md p-8 lg:p-10 hidden md:block rounded-3xl shadow-[0_20px_50px_rgba(12,93,105,0.3)] border border-white/20 z-20 overflow-hidden group hover:scale-105 transition-transform duration-500">
                        {/* Subtle decorative circle */}
                        <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />

                        <div className="relative z-10 text-center">
                           <h2 className="text-5xl lg:text-6xl font-bold text-white font-serif mb-1 leading-none">10+</h2>
                           <div className="h-1 w-12 bg-white/30 mx-auto mb-4 rounded-full" />
                           <p className="text-white/90 uppercase tracking-[2px] text-xs font-bold leading-tight">
                              Years of <br /> Excellence
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-10 lg:pt-0">
                     <p className="text-mednova-green font-bold uppercase tracking-[2px] text-sm mb-4">Welcome to Mednova+</p>
                     <h2 className="text-4xl lg:text-5xl font-bold font-serif text-heading mb-8 leading-tight">
                        Transforming Personal <br /> Health and Wellness
                     </h2>
                     <p className="text-black mb-6 text-lg font-light leading-relaxed">
                        At Mednova+, Health means love. MedNova+, Inc. is dedicated to transforming the landscape of personal health and wellness including public health programming and dental lab services. Founded on the principles of innovation, compassion, and scientific rigor, we are committed to empowering individuals through evidence-based practices.
                     </p>
                     <div className="space-y-4 mb-10">
                        <div className="flex items-start">
                           <CheckCircle className="h-6 w-6 text-mednova-green mr-4 mt-1" />
                           <p className="text-black font-medium">Holistic Biopsychosocial Model</p>
                        </div>
                        <div className="flex items-start">
                           <CheckCircle className="h-6 w-6 text-mednova-green mr-4 mt-1" />
                           <p className="text-black font-medium">Evidence-Based Clinical Support</p>
                        </div>
                        <div className="flex items-start">
                           <CheckCircle className="h-6 w-6 text-mednova-green mr-4 mt-1" />
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

         {/* Section 2: Science-Driven Care (EBM) */}
         <section className="py-24 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                     <Image
                        src="/services-section.jpg"
                        alt="Medical Research"
                        fill
                        className="object-cover"
                     />
                     <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                  </div>
                  <div>
                     <h2 className="text-3xl lg:text-4xl font-serif font-bold text-heading mb-8">The Cornerstone: Evidence-Based Practice</h2>
                     <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                        <p>
                           At MedNova+, our commitment to evidence-based practice is woven into the fabric of our operations. Evidence-based medicine (EBM) is more than a buzzword; it's the cornerstone of our methodology.
                        </p>
                        <p>
                           We systematically review and apply the latest research from peer-reviewed journals, clinical guidelines, and meta-analyses to develop treatment plans that are both safe and efficacious. For instance, when addressing pain management, we rely on protocols validated by organizations like the World Health Organization (WHO) and the American Medical Association (AMA).
                        </p>
                        <p>
                           This dedication to science allows us to offer interventions that are adaptable, measurable, and continuously refined based on emerging data, minimizing risks and maximizing benefits.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                           {['Peer-Reviewed Research', 'Clinical Guidelines', 'Validated Protocols', 'Continuous Refinement'].map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                 <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                 <span className="text-sm font-semibold text-heading">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Section 3: The Biopsychosocial Model */}
         {/* Section 4: Continuum of Care */}
         <section className="py-24 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-heading mb-4">A Seamless Continuum of Care</h2>
                  <p className="text-gray-600 font-light max-w-2xl mx-auto">From initial consultation to long-term follow-up, we provide a collaborative roadmap for your success.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 z-0"></div>
                  {[
                     { step: "01", title: "Assessment", text: "Comprehensive evaluation of medical history and lifestyle." },
                     { step: "02", title: "Roadmap", text: "Collaborative creation of a customized wellness plan." },
                     { step: "03", title: "Monitoring", text: "Ongoing adjustments and motivational support." },
                     { step: "04", title: "Follow-up", text: "Ensuring lasting success and vitality." }
                  ].map((item, idx) => (
                     <div key={idx} className="relative z-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold mx-auto mb-6 border-4 border-white shadow-lg">
                           {item.step}
                        </div>
                        <h4 className="font-bold text-heading mb-3">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-light">{item.text}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Section 5: Multidisciplinary Excellence */}
         <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="order-2 lg:order-1">
                     <h2 className="text-3xl lg:text-4xl font-serif font-bold text-heading mb-8">Expertise Beyond Boundaries</h2>
                     <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                        <p>
                           MedNova+ boasts a multidisciplinary roster of professionals, each bringing years of specialized experience to the table. Our physicians, nurses, psychologists, physical therapists, nutritionists, and wellness coaches are not only credentialed but also passionate about collaborative care.
                        </p>
                        <p>
                           Many hold advanced degrees from prestigious institutions and maintain active involvement in professional organizations, ensuring they stay at the forefront of healthcare advancements. We believe that collaborative care is the key to unlocking optimal health.
                        </p>
                        <div className="pt-6 grid grid-cols-2 gap-6">
                           <div className="border-l-4 border-primary pl-4">
                              <h4 className="text-2xl font-bold text-heading">15+</h4>
                              <p className="text-xs text-gray-400 uppercase tracking-wider">Medical Experts</p>
                           </div>
                           <div className="border-l-4 border-secondary pl-4">
                              <h4 className="text-2xl font-bold text-heading">100%</h4>
                              <p className="text-xs text-gray-400 uppercase tracking-wider">Compassionate Care</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="relative order-1 lg:order-2">
                     <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                           src="/mednova_img.jpg"
                           alt="Our Expert Team"
                           fill
                           className="object-cover"
                        />
                     </div>
                     <div className="absolute top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                  </div>
               </div>
            </div>
         </section>

         {/* Section 6: Holistic Integration */}
         <section className="py-24 bg-heading text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[100px]"></div>
               <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="text-center mb-20">
                  <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Embracing True Holism</h2>
                  <p className="text-white/70 max-w-3xl mx-auto text-lg font-light leading-relaxed">
                     Traditional medicine often focuses narrowly on symptoms. We reject this siloed perspective in favor of holism, viewing the body, mind, and spirit as an integrated whole.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     {
                        title: "Physical Body",
                        desc: "Restoring bodily function through exercise science, nutritional plans, and evidence-supported therapies.",
                        icon: <PersonStanding className="w-10 h-10 text-primary" />
                     },
                     {
                        title: "Psychological Mind",
                        desc: "Building resilience and cultivating positive mindsets through neuroscience and positive psychology.",
                        icon: <Brain className="w-10 h-10 text-primary" />
                     },
                     {
                        title: "Mental Spirit",
                        desc: "Focusing on cognitive health, stress reduction, and emotional balance through meditation and mindfulness.",
                        icon: <Sparkles className="w-10 h-10 text-primary" />
                     }
                  ].map((item, idx) => (
                     <div key={idx} className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="mb-6">{item.icon}</div>
                        <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                        <p className="text-white/70 font-light leading-relaxed">{item.desc}</p>
                     </div>
                  ))}
               </div>

               <div className="mt-20 text-center border-t border-white/10 pt-16">
                  <p className="text-white/60 mb-8 italic max-w-2xl mx-auto">
                     "Healthcare should transcend symptom-based treatment and embrace a holistic approach that promotes not just recovery but thriving."
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                     <Link href="/contact" className="bg-primary hover:bg-white hover:text-heading text-white px-10 py-5 rounded-full font-bold transition-all duration-300">Connect With Us</Link>
                     <p className="text-white/80 font-serif italic text-xl">Let's redefine what it means to live well.</p>
                  </div>
               </div>
            </div>
         </section>
         <TrackRecords />
         <WhyChooseUs />

         {/* Final CTA Section */}
         <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="bg-heading rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                  <div className="relative z-10">
                     <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                        Ready to Start Your <br className="hidden md:block" /> Wellness Journey?
                     </h2>
                     <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
                        Detailed consultations, expert guidance, and a personalized approach – all focused on helping you achieve your best self.
                     </p>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                           href="/contact"
                           className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-heading transition duration-300 shadow-lg text-center"
                        >
                           Get in Touch
                        </Link>
                        <Link
                           href="/services"
                           className="w-full sm:w-auto bg-transparent text-white border-2 border-white/30 px-10 py-5 rounded-full font-bold uppercase tracking-wider hover:bg-white/10 transition duration-300 text-center"
                        >
                           View Services
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

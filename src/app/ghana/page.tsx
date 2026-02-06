"use client";

import { useState } from "react";
import {
  MapPin, Phone, Mail, FlaskConical, Users, ShieldCheck,
  MessageCircle, Brain, Stethoscope, HeartPulse, Activity,
  ChevronDown, ChevronUp
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const partnerLabs = [
  "Accra Medical Genetics",
  "West African Diagnostics",
  "Global Health Labs Ghana",
  "Community Care Pathology"
];

const ghanaServices = [
  {
    title: "General Medical Practice",
    description: "Comprehensive medical care and consultations for individuals and families.",
    icon: Stethoscope,
  },
  {
    title: "Psychotherapy",
    description: "Professional mental health support and counseling services.",
    icon: Brain,
  },
  {
    title: "Telehealth Services",
    description: "Remote medical consultations and health support accessible from anywhere.",
    icon: Phone,
  },
  {
    title: "Laboratory & Diagnostics",
    description: "Accurate diagnostics and screening services through our partner network.",
    icon: FlaskConical,
  },
];

const partnersData = {
  "Accra": [
    "Medikah Diagnostics Services",
    "MKS Laboratories",
    "G2 Laboratories",
    "Advance Diagnostics Centre",
    "The Diagnostic Centre Ltd",
    "Obrempong Medical Labs",
    "Dankama Medical Lab",
    "B & D Medical Labs",
    "M & G Medical Labs",
    "Pabbs Medical Labs"
  ],
  "Tamale": [
    "Lab Hill Diagnostics",
    "Global Medical Labs"
  ],
  "Takoradi": [
    "Mediwest Labs Services",
    "Blue Waves Diagnostics",
    "El-Shaddai Medical and Labs"
  ],
  "Tarkwa": [
    "Precise Labs & Consult",
    "Adom Medical Labs Ltd"
  ],
  "Volta, Ho": [
    "BestLab Medical Diagnostics Lab",
    "Pacesetters Medical Lab Services"
  ],
  "Koforidua": [
    "SafeLine Medical Lab",
    "Biomed Diagnostics Ltd"
  ],
  "Sunyani": [
    "Heaven Diagnostics Services Ltd",
    "Divine Diagnostics & Lab Services"
  ]
};

const psychoServices = [
  "Depression",
  "Suicide Ideation/Thoughts",
  "Post-Traumatic Stress Disorder (PTSD)",
  "Substances Related & Addictive Disorders",
  "Borderline Personality Disorders",
  "Obsessive Compulsive Disorder (OCD)",
  "Anxiety, Phobias and Stress",
  "Abuses and Emotional Trauma",
  "Relationships/Behavioural Therapy",
  "Neurodevelopmental Disorders",
  "Dissociative & Bipolar Disorders"
];

export default function GhanaPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('services');

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Mednova+ Ghana" items={[{ label: "Ghana Branch" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Desktop Tabs View */}
            <div className="hidden md:block">
              <Tabs defaultValue="services" className="w-full">
                <TabsList className="w-full justify-start mb-8 bg-gray-100 p-1.5 h-auto flex-wrap">
                  <TabsTrigger value="services" className="flex-1 min-w-[120px]">General Services</TabsTrigger>
                  <TabsTrigger value="med-psycho" className="flex-1 min-w-[120px]">Med Psycho</TabsTrigger>
                  <TabsTrigger value="partners" className="flex-1 min-w-[120px]">Partner Labs</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-12 animate-in fade-in zoom-in-95 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ghanaServices.map((service) => (
                      <div key={service.title} className="bg-white p-8 rounded-sm border-l-4 border-primary shadow-sm hover:shadow-lg transition duration-300">
                        <service.icon className="h-10 w-10 text-primary mb-6" />
                        <h3 className="text-xl font-bold font-serif text-heading mb-3">{service.title}</h3>
                        <p className="text-black leading-relaxed font-light">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="med-psycho" className="space-y-12 animate-in fade-in zoom-in-95 duration-300">
                  <MedPsychoContent />
                </TabsContent>

                <TabsContent value="partners" className="space-y-12 animate-in fade-in zoom-in-95 duration-300">
                  <PartnersContent />
                </TabsContent>
              </Tabs>
            </div>

            {/* Mobile Accordion View */}
            <div className="md:hidden space-y-4">
              <AccordionItem
                title="General Services"
                isOpen={activeAccordion === 'services'}
                onClick={() => setActiveAccordion(activeAccordion === 'services' ? null : 'services')}
              >
                <div className="grid grid-cols-1 gap-6 pt-4">
                  {ghanaServices.map((service) => (
                    <div key={service.title} className="bg-white p-6 rounded-sm border-l-4 border-primary shadow-md">
                      <service.icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-bold font-serif text-heading mb-2">{service.title}</h3>
                      <p className="text-sm text-black leading-relaxed font-light">{service.description}</p>
                    </div>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem
                title="Med Psycho"
                isOpen={activeAccordion === 'med-psycho'}
                onClick={() => setActiveAccordion(activeAccordion === 'med-psycho' ? null : 'med-psycho')}
              >
                <div className="pt-4">
                  <MedPsychoContent />
                </div>
              </AccordionItem>

              <AccordionItem
                title="Partner Labs"
                isOpen={activeAccordion === 'partners'}
                onClick={() => setActiveAccordion(activeAccordion === 'partners' ? null : 'partners')}
              >
                <div className="pt-4">
                  <PartnersContent />
                </div>
              </AccordionItem>
            </div>

          </div>

          {/* Sidebar / Contact Person */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-secondary text-white p-8 md:p-10 rounded-sm shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>

                <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">Branch Contact</h3>

                <div className="mb-8 relative z-10">
                  <p className="text-primary text-xs uppercase tracking-widest font-bold mb-2">Contact Person</p>
                  <p className="text-xl font-bold font-serif">Dr. Simon Arthur</p>
                </div>

                <ul className="space-y-6 relative z-10">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-4 mt-1" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wide mb-1">Ghana Office</p>
                      <p className="text-gray-300 font-light text-sm">Agbogba-Ashongman Road, Near Police Station<br /> P.O. Box TF 459<br />Trade-Fair, Accra, Ghana</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-4" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wide mb-1">Phone</p>
                      <a href="tel:+233246831417" className="text-gray-300 text-sm font-light hover:text-white">+233 24 683 1417</a> / <br />
                      <a href="tel:+233248775736" className="text-gray-300 text-sm font-light hover:text-white">+233 24 877 5736</a>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-primary mr-4" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wide mb-1">WhatsApp</p>
                      <a href="https://wa.me/233246831417" target="_blank" className="text-gray-300 text-sm font-light hover:text-white transition-colors">+233 24 683 1417</a>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-4" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wide mb-1">Email</p>
                      <p className="text-gray-300 text-sm font-light">contact.ghana@mednova.org</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helper Components
const AccordionItem = ({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) => (
  <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-5 text-left transition-colors duration-200",
        isOpen ? "bg-primary text-white" : "bg-white text-heading hover:bg-gray-50"
      )}
    >
      <span className="font-serif font-bold text-lg">{title}</span>
      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="p-5 bg-white border-t border-gray-100">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const MedPsychoContent = () => (
  <div className="space-y-12">
    <div>
      <div className="bg-secondary/5 rounded-lg p-6 md:p-8 border border-secondary/20 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-heading mb-2">Mednova Psychotherapy Services</h2>
        <p className="text-primary font-medium text-lg mb-6 flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Online & Home therapy sessions available
        </p>
        <p className="text-black text-lg font-light leading-relaxed italic border-l-2 border-primary pl-4">
          "Our approach focuses on changing problematic behaviours, feelings, and thoughts by discovering their unconscious meanings and motivations. Don’t be alone, just speak to us."
        </p>
      </div>

      <h3 className="text-xl font-bold font-serif text-heading mb-6 uppercase tracking-wide border-b border-gray-100 pb-2">Our Areas of Focus</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {psychoServices.map((service, idx) => (
          <div key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100/50 hover:border-primary/30 transition-colors">
            <div className="mr-3 mt-1 bg-primary/10 p-1.5 rounded-full">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <span className="text-heading font-medium">{service}</span>
          </div>
        ))}
        <div className="flex items-center bg-primary/5 p-4 rounded-lg border border-primary/10">
          <span className="text-primary font-bold">And Many More...</span>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100">
        <h4 className="font-bold text-sm uppercase tracking-wide mb-2 text-heading">Direct Lines</h4>
        <p className="text-gray-600 font-light text-sm">024 877 5736 / 020 959 6662</p>
      </div>
    </div>
  </div>
);

const PartnersContent = () => (
  <div className="space-y-10">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold font-serif text-heading mb-6">Partner Diagnostic Centres</h2>
      <p className="text-black mb-8 font-light text-lg">
        We cooperate with a wide network of certified diagnostic centers across Ghana to ensure accessible healthcare.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(partnersData).map(([region, labs]) => (
          <div key={region} className="bg-gray-50 rounded-lg p-6 border border-gray-100 h-full">
            <h3 className="text-lg font-bold font-serif text-primary mb-4 uppercase tracking-wider border-b border-gray-200 pb-2">{region}</h3>
            <ul className="space-y-3">
              {labs.map((lab, idx) => (
                <li key={idx} className="flex items-start text-heading/80 text-sm md:text-base">
                  <div className="mr-2 mt-1.5 bg-secondary/20 h-1.5 w-1.5 rounded-full flex-shrink-0"></div>
                  {lab}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

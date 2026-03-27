"use client";

import { useState } from "react";
import {
  MapPin, Phone, Mail, FlaskConical, Users, ShieldCheck,
  MessageCircle, Brain, Stethoscope, HeartPulse, Activity,
  ChevronDown, ChevronUp, FileText, Video, ClipboardList
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import InfoModal from "@/components/ui/InfoModal";
import { Info } from "lucide-react";
import TelehealthConsentForm from "@/components/forms/TelehealthConsentForm";
import HealthWellnessConsentForm from "@/components/forms/HealthWellnessConsentForm";

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
  {
    name: "Depression",
    description: "Depression is more than just feeling sad. It's a complex mental health condition that affects how you feel, think, and handle daily activities. Symptoms can include persistent low mood, loss of interest in activities, changes in appetite or sleep, and difficulty concentrating. Our therapy helps identify root causes and develop coping strategies to reclaim your quality of life."
  },
  {
    name: "Suicide Ideation/Thoughts",
    description: "Thoughts of self-harm or suicide are a serious sign of deep emotional distress. If you are experiencing these thoughts, please know that you are not alone and help is available. Our specialized support provides a safe, non-judgmental space to explore these feelings and develop safety plans and long-term resilience."
  },
  {
    name: "Post-Traumatic Stress Disorder (PTSD)",
    description: "PTSD can develop after experiencing or witnessing a traumatic event. Symptoms often include flashbacks, nightmares, severe anxiety, and uncontrollable thoughts about the event. We use evidence-based approaches like Trauma-Focused Therapy to help you process the trauma and regain a sense of safety and control."
  },
  {
    name: "Substances Related & Addictive Disorders",
    description: "Addiction is a chronic but treatable condition involving complex interactions among brain circuits, genetics, and the environment. We provide comprehensive support for overcoming dependency on substances or high-risk behaviors, focusing on both the physical and psychological aspects of recovery."
  },
  {
    name: "Borderline Personality Disorders",
    description: "BPD is characterized by a pattern of varying moods, self-image, and behavior. These symptoms often result in impulsive actions and problems in relationships. Our therapy focuses on emotional regulation, distress tolerance, and building stable, healthy relationships."
  },
  {
    name: "Obsessive Compulsive Disorder (OCD)",
    description: "OCD features a pattern of unwanted thoughts and fears (obsessions) that lead you to do repetitive behaviors (compulsions). These obsessions and compulsions interfere with daily activities and cause significant distress. We help you break the cycle of OCD through proven therapeutic techniques."
  },
  {
    name: "Anxiety, Phobias and Stress",
    description: "While some anxiety is normal, persistent and excessive worry can be overwhelming. Phobias are intense, irrational fears of specific things or situations. Our sessions help you identify triggers, manage physical symptoms, and challenge the thought patterns that fuel anxiety."
  },
  {
    name: "Abuses and Emotional Trauma",
    description: "The effects of emotional, physical, or psychological abuse can be long-lasting. Trauma can impact every area of your life. We provide a compassionate, trauma-informed environment to help victims heal, rebuild self-esteem, and move forward with their lives."
  },
  {
    name: "Relationships/Behavioural Therapy",
    description: "Difficulties in relationships or maladaptive behavioral patterns can be a major source of stress. We work with individuals and couples to improve communication, resolve conflicts, and change behaviors that are hindering personal growth or relationship satisfaction."
  },
  {
    name: "Neurodevelopmental Disorders",
    description: "This includes conditions like ADHD and Autism Spectrum Disorders that affect how the brain functions. We provide support for individuals and families to manage symptoms, develop life skills, and create environments that allow neurodivergent individuals to thrive."
  },
  {
    name: "Dissociative & Bipolar Disorders",
    description: "Bipolar disorder involves significant mood swings ranging from depressive lows to manic highs. Dissociative disorders involve a disconnection between thoughts, identities, memory, and surroundings. We provide clinical support to stabilize mood and integrate experiences through specialized therapy and management plans."
  }
];

export default function GhanaPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('services');
  const [selectedService, setSelectedService] = useState<{ name: string, description: string } | null>(null);

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Mednova Ghana" items={[{ label: "Ghana Partners" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Desktop Tabs View */}
            <div className="hidden md:block">
              <Tabs defaultValue="services" className="w-full">
                <TabsList className="w-full justify-start mb-8 bg-gray-100 p-1.5 h-auto flex-wrap">
                  <TabsTrigger value="services" className="flex-1 min-w-[120px]">General Services</TabsTrigger>
                  <TabsTrigger value="med-psycho" className="flex-1 min-w-[120px]">Med Psychotherapy</TabsTrigger>
                  <TabsTrigger value="partners" className="flex-1 min-w-[120px]">Partner Labs</TabsTrigger>
                  <TabsTrigger value="forms" className="flex-1 min-w-[120px]">Forms</TabsTrigger>
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
                  <MedPsychoContent
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                  />
                </TabsContent>

                <TabsContent value="partners" className="space-y-12 animate-in fade-in zoom-in-95 duration-300">
                  <PartnersContent />
                </TabsContent>

                <TabsContent value="forms" className="space-y-12 animate-in fade-in zoom-in-95 duration-300">
                  <FormsContent />
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
                title="Med Psychotherapy"
                isOpen={activeAccordion === 'med-psycho'}
                onClick={() => setActiveAccordion(activeAccordion === 'med-psycho' ? null : 'med-psycho')}
              >
                <div className="pt-4">
                  <MedPsychoContent
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                  />
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

              <AccordionItem
                title="Forms"
                isOpen={activeAccordion === 'forms'}
                onClick={() => setActiveAccordion(activeAccordion === 'forms' ? null : 'forms')}
              >
                <div className="pt-4">
                  <FormsContent />
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
                      <p className="text-gray-300 font-light text-sm">Agbogba-Ashongman Road, Near Police Station</p>
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
                      <br />
                      <a href="https://wa.me/233248775736" target="_blank" className="text-gray-300 text-sm font-light hover:text-white transition-colors">+233 24 877 5736</a>
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

const MedPsychoContent = ({
  selectedService,
  setSelectedService
}: {
  selectedService: { name: string, description: string } | null,
  setSelectedService: (service: { name: string, description: string } | null) => void
}) => (
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
          <button
            key={idx}
            onClick={() => setSelectedService(service)}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100/50 hover:border-primary/30 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-primary/10 p-1.5 rounded-full">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <span className="text-heading font-medium">{service.name}</span>
            </div>
            <Info className="h-4 w-4 text-primary/40" />
          </button>
        ))}
        <div className="flex items-center bg-primary/5 p-4 rounded-lg border border-primary/10">
          <span className="text-primary font-bold">And Many More...</span>
        </div>
      </div>

      <InfoModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name || ""}
        description={selectedService?.description || ""}
      />

      <div className="mt-12">
        <h3 className="text-xl font-bold font-serif text-heading mb-6 uppercase tracking-wide border-b border-gray-100 pb-2">Our various therapy categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Individual therapy",
              description: "A personalized and confidential space to explore thoughts and behaviors with a professional, addressing concerns like stress, anxiety, and personal growth."
            },
            {
              title: "Group base therapy",
              description: "A supportive environment where individuals facing similar challenges share experiences and gain new perspectives under expert guidance."
            },
            {
              title: "Family therapy",
              description: "Focuses on improving communication and resolving conflicts within the family unit to strengthen relationships."
            },
            {
              title: "Couple's therapy",
              description: "Designed to help partners enhance communication, resolve conflicts, and deepen their understanding of each other's needs."
            }
          ].map((category, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-full">
              <div className="flex items-center mb-3">
                <div className="mr-3 bg-secondary/10 p-1.5 rounded-full">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-heading font-bold font-serif">{category.title}</span>
              </div>
              <p className="text-sm text-black/70 font-light leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
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

const FormsContent = () => {
  const [activeForm, setActiveForm] = useState<'telehealth' | 'health-wellness' | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-heading mb-4">Consent Forms</h2>
        <p className="text-black mb-8 font-light text-lg">
          Please complete the appropriate informed consent form before your appointment. You can fill out, download a PDF copy, and submit the form directly.
        </p>
      </div>

      {/* Form Selection Cards */}
      {!activeForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setActiveForm('telehealth')}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all text-left group"
          >
            <div className="bg-primary/10 p-4 rounded-full w-fit mb-6 group-hover:bg-primary/20 transition-colors">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-serif text-heading mb-3">Telehealth Intervention Informed Consent</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Required for patients receiving remote healthcare services via video, phone, or messaging.
            </p>
          </button>

          <button
            onClick={() => setActiveForm('health-wellness')}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all text-left group"
          >
            <div className="bg-emerald-100 p-4 rounded-full w-fit mb-6 group-hover:bg-emerald-200 transition-colors">
              <HeartPulse className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold font-serif text-heading mb-3">Health &amp; Wellness Informed Consent</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Required for participants enrolling in health assessments, wellness coaching, and lifestyle programs.
            </p>
          </button>
        </div>
      )}

      {/* Active Form View */}
      {activeForm && (
        <div>
          <button
            onClick={() => setActiveForm(null)}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ChevronUp className="w-4 h-4 mr-1 rotate-[-90deg]" />
            Back to Forms
          </button>

          {activeForm === 'telehealth' && <TelehealthConsentForm />}
          {activeForm === 'health-wellness' && <HealthWellnessConsentForm />}
        </div>
      )}

      {!activeForm && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-secondary">Privacy Note:</span> Your privacy is our priority.
            All information provided is encrypted and handled in strict accordance with healthcare privacy standards.
          </p>
        </div>
      )}
    </div>
  );
};

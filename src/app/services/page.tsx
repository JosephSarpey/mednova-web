import { HeartPulse, Globe, Stethoscope, CheckCircle } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const services = [
  {
    title: "Holistic Health",
    description: "We focus on the whole person. Our holistic approach ensures that physical, mental, emotional, and social needs are addressed to promote overall well-being.",
    features: [
      "Personalized Wellness Plans",
      "Stress Management Workshops",
      "Nutritional Counseling",
      "Mindfulness & Meditation Training"
    ],
    icon: HeartPulse,
  },
  {
    title: "Lifestyle Medicine",
    description: "Our Lifestyle Medicine services use evidence-based lifestyle therapeutic approaches to prevent, treat, and often reverse chronic disease.",
    features: [
      "Chronic Disease Management",
      "Sleep Hygiene Optimization",
      "Physical Activity Guidance",
      "Tobacco & Substance Cessation"
    ],
    icon: Stethoscope,
  },
  {
    title: "Public Health",
    description: "We provide expert consultancy for organizations and governments to improve population health outcomes through strategic planning and policy development.",
    features: [
      "Health Program Development",
      "Epidemiological Research",
      "Policy Strategy & Advocacy",
      "Community Health Assessments"
    ],
    icon: Globe,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Our Services" items={[{ label: "Services" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-24">
          {services.map((service, index) => (
            <div key={service.title} className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-4xl font-serif font-bold text-heading mb-6">{service.title}</h2>
                <p className="text-lg text-black mb-8 leading-relaxed font-light">
                  {service.description}
                </p>
                <ul className="space-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-black font-medium">
                      <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg h-[450px] w-full relative overflow-hidden group shadow-lg">
                 {/* Placeholder for service image */}
                 <div className="absolute inset-0 bg-secondary/5 flex items-center justify-center text-gray-400 group-hover:scale-105 transition duration-700">
                    <service.icon className="h-40 w-40 opacity-10 text-primary" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

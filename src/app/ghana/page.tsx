import { MapPin, Phone, Mail, FlaskConical, Users, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const partnerLabs = [
  "Accra Medical Genetics",
  "West African Diagnostics",
  "Global Health Labs Ghana",
  "Community Care Pathology"
];

const ghanaServices = [
  {
    title: "Local Public Health",
    description: "Collaborating with local communities to implement impactful health interventions.",
    icon: Users,
  },
  {
    title: "Diagnostic Partnerships",
    description: "Referral and coordination with top-tier labs for accurate diagnostics.",
    icon: FlaskConical,
  },
  {
    title: "Corporate Wellness",
    description: "Tailored wellness packages for companies operating in Ghana.",
    icon: ShieldCheck,
  },
];

export default function GhanaPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Mednova+ Ghana" items={[{ label: "Ghana Branch" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
               <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Regional Services</p>
               <h2 className="text-3xl font-bold font-serif text-heading mb-6">Serving West Africa</h2>
               <p className="text-black mb-8 leading-relaxed font-light text-lg">
                  Dedicated to serving the West African region with locally adapted health solutions and global expertise.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {ghanaServices.map((service) => (
                <div key={service.title} className="bg-white p-8 rounded-sm border-l-4 border-primary shadow-sm hover:shadow-lg transition duration-300">
                  <service.icon className="h-10 w-10 text-primary mb-6" />
                  <h3 className="text-xl font-bold font-serif text-heading mb-3">{service.title}</h3>
                  <p className="text-black leading-relaxed font-light">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-10 border border-gray-100">
               <h3 className="text-2xl font-bold font-serif text-heading mb-6">Partner Laboratories</h3>
               <p className="text-black mb-8 font-light">
                 We work with certified and accredited laboratories to ensure the highest standard of diagnostic accuracy for our clients.
               </p>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {partnerLabs.map((lab) => (
                   <li key={lab} className="flex items-center text-heading font-medium">
                     <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                        <FlaskConical className="h-4 w-4 text-secondary" />
                     </div>
                     {lab}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Sidebar / Contact Person */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
               <div className="bg-secondary text-white p-10 rounded-sm shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                 
                 <h3 className="text-2xl font-serif font-bold mb-8 relative z-10">Branch Contact</h3>
                 
                 <div className="mb-8 relative z-10">
                   <p className="text-primary text-xs uppercase tracking-widest font-bold mb-2">Contact Person</p>
                   <p className="text-xl font-bold font-serif">Mr. Kwame Osei</p>
                   <p className="text-black font-light text-white/80">Regional Director</p>
                 </div>

                 <ul className="space-y-6 relative z-10">
                   <li className="flex items-start">
                     <MapPin className="h-5 w-5 text-primary mr-4 mt-1" />
                     <div>
                       <p className="font-bold text-sm uppercase tracking-wide mb-1">Local Office</p>
                       <p className="text-gray-300 text-sm font-light leading-relaxed">
                         12 Independence Avenue<br/>
                         Accra, Ghana
                       </p>
                     </div>
                   </li>
                   <li className="flex items-center">
                     <Phone className="h-5 w-5 text-primary mr-4" />
                     <div>
                       <p className="font-bold text-sm uppercase tracking-wide mb-1">Phone</p>
                       <p className="text-gray-300 text-sm font-light">+233 20 123 4567</p>
                     </div>
                   </li>
                    <li className="flex items-center">
                     <Mail className="h-5 w-5 text-primary mr-4" />
                     <div>
                       <p className="font-bold text-sm uppercase tracking-wide mb-1">Email</p>
                       <p className="text-gray-300 text-sm font-light">ghana@mednova.org</p>
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

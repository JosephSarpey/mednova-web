import { Mail, MapPin, Phone, Send } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ConsultationForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Contact Us" items={[{ label: "Contact" }]} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
             <div>
                <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Get in Touch</p>
                <h2 className="text-4xl font-serif font-bold text-heading mb-6">Contact with us</h2>
                <p className="text-black leading-relaxed font-light">
                    Have questions about our services or need expert consultancy? We'd love to hear from you.
                </p>
             </div>

            {/* US Head Office */}
            <div className="bg-white rounded-lg p-0">
              <h3 className="text-xl font-bold text-heading mb-6 flex items-center font-serif">
                 USA Head Office
              </h3>
              <ul className="space-y-6">
                 <li className="flex items-start">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                        <MapPin className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-bold text-heading text-[15px] uppercase mb-1">Address</p>
                     <p className="text-black font-light text-sm">123 Health Avenue, Suite 400<br/>New York, NY 10001, USA</p>
                   </div>
                 </li>
                 <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-bold text-heading text-[15px] uppercase mb-1">Phone</p>
                     <p className="text-black font-light text-sm">+1 (212) 555-0123</p>
                   </div>
                 </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-bold text-heading text-[15px] uppercase mb-1">Email</p>
                     <p className="text-black font-light text-sm">info@mednova.org</p>
                   </div>
                 </li>
              </ul>
            </div>

            {/* Ghana Branch */}
             <div className="bg-white rounded-lg p-0 pt-6 border-t border-gray-100">
              <h3 className="text-xl font-bold text-heading mb-6 flex items-center font-serif">
                 Ghana Branch
              </h3>
              <ul className="space-y-6">
                 <li className="flex items-start">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                        <MapPin className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-bold text-heading text-[15px] uppercase mb-1">Address</p>
                     <p className="text-black font-light text-sm">12 Independence Avenue<br/>Accra, Ghana</p>
                   </div>
                 </li>
                 <li className="flex items-center">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-bold text-heading text-[15px] uppercase mb-1">Phone</p>
                     <p className="text-black font-light text-sm">+233 20 123 4567</p>
                   </div>
                 </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-sm shadow-2xl p-10 border border-gray-100 h-fit">
            <h3 className="text-[15px] font-bold text-[#3E4241] mb-2 uppercase tracking-wider">Get in Touch</h3>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8 capitalize">Send Us A Message</h2>
            <ConsultationForm />
          </div>
        </div>
      </div>
      
      {/* Map Embed (Placeholder) */}
      <div className="w-full h-[400px] bg-gray-200 relative mb-[-80px] z-0">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">Google Map Area</div>
      </div>
    </div>
  );
}

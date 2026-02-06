import { Mail, MapPin, Phone, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
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
              <h2 className="text-4xl font-serif font-bold text-heading mb-6">Connect with us</h2>
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
                    <p className="text-black font-light text-sm">7 Pearl St., Mount Vernon, NY 10550</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-heading text-[15px] uppercase mb-1">Phone</p>
                    <p className="text-black font-light text-sm">+1 (914) 616-6162</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-heading text-[15px] uppercase mb-1">Email</p>
                    <p className="text-black font-light text-sm">director@mednova.org</p>
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
                    <p className="text-black font-light text-sm">Agbogba-Ashongman Road, Near Police Station<br /> P.O. Box TF 459<br />Trade-Fair, Accra, Ghana</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-heading text-[15px] uppercase mb-1">Phone</p>
                    <a href="tel:+233246831417" className="text-black font-light text-sm">+233 24 683 1417</a>/<a href="tel:+233248775736" className="text-black font-light text-sm">+233 24 877 5736</a>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-heading text-[15px] uppercase mb-1">WhatsApp</p>
                    <a href="https://wa.me/233246831417" target="_blank" className="text-black font-light text-sm hover:text-primary transition-colors">+233 24 683 1417</a>
                  </div>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-50">
                <Link
                  href="/ghana"
                  className="inline-flex items-center text-primary font-bold uppercase text-xs tracking-widest hover:text-heading transition-colors group"
                >
                  Visit our Ghana Branch
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
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
      <div className="w-full h-[500px] relative mb-[-80px] z-0 overflow-hidden shadow-inner group">
        <iframe
          src="https://maps.google.com/maps?q=7%20Pearl%20St%2C%20Mount%20Vernon%2C%20NY%2010550&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MedNova USA Office Location"
          className="filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}

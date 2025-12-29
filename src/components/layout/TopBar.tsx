import { Mail, Phone, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-[#0c5d69] text-white py-3 hidden md:block border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[13px] font-medium">
        <div className="flex items-center space-x-8">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>info@mednova.org</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+1 (212) 555-0123</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon - Fri: 8:00am - 6:00pm</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-mednova-green transition"><Facebook className="h-4 w-4" /></a>
          <a href="#" className="hover:text-mednova-green transition"><Twitter className="h-4 w-4" /></a>
          <a href="#" className="hover:text-mednova-green transition"><Linkedin className="h-4 w-4" /></a>
          <a href="#" className="hover:text-mednova-green transition"><Instagram className="h-4 w-4" /></a>
        </div>
      </div>
    </div>
  );
}

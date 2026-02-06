"use client"

import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] text-white pt-20 pb-10 font-sans overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mednova_space.jpg"
          alt="Footer Background"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Newsletter Section */}
        <Newsletter />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[15px]">
          {/* Brand & Socials */}
          <div className="col-span-1">
            <div className="mb-8 flex items-center gap-3">
              <Image src="/logo.png" className="rounded-md" alt="Logo" width={50} height={50} />
              <h2 className="text-2xl font-bold font-serif m-0">MEDNOVA+ INC.</h2>
            </div>
            <p className="text-gray-400 mb-8 leading-7">
              Leading the way in holistic health, lifestyle medicine, and public health consultancy. Committed to improving quality of life globally.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/MedNova" target="_blank" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-primary transition duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-primary transition duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-primary transition duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/mednova_clinic" target="_blank" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-primary transition duration-300">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-wider relative after:content-[''] after:absolute after:left-0 after:-bottom-3 after:w-10 after:h-[2px] after:bg-primary">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-primary transition">Our Services</Link></li>
              <li><Link href="/team" className="text-gray-400 hover:text-primary transition">Our Team</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Departments / Extra Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-wider relative after:content-[''] after:absolute after:left-0 after:-bottom-3 after:w-10 after:h-[2px] after:bg-primary">Connect</h4>
            <ul className="space-y-3">
              <li><Link href="/education" className="text-gray-400 hover:text-primary transition">Education & Training</Link></li>
              <li><Link href="/ghana" className="text-gray-400 hover:text-primary transition">Ghana Branch</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-primary transition">Latest News</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-wider relative after:content-[''] after:absolute after:left-0 after:-bottom-3 after:w-10 after:h-[2px] after:bg-primary">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1">Address</h5>
                  <span className="text-gray-400 block">7 Pearl St., Mount Vernon, NY 10550</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1">Phone</h5>
                  <a href="tel:+19146166162" className="text-gray-400 block">+1 (914) 616-6162</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm mb-1">Email</h5>
                  <a href="mailto:director@mednova.org" className="text-gray-400 block">director@mednova.org</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center bg-transparent">
          <p className="text-gray-400 text-[14px]">
            Copyright &copy; {new Date().getFullYear()} All rights reserved, Mednova+ INC. | Developed by <a href="https://themegastechinc.com" target="_blank" className="text-primary hover:text-white transition">MEGAS TECH INC.</a>
          </p>
          <ul className="mt-4 md:mt-0 flex gap-6 text-[14px]">
            <li><Link href="/privacy" className="text-gray-400 hover:text-primary transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-gray-400 hover:text-primary transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

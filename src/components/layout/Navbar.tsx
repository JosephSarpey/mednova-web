"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchModal from "../ui/SearchModal";

const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/ghana", label: "Ghana Branch" },
];

const pagesDropdown = [
  { href: "/education", label: "Education" },
  { href: "/team", label: "Our Team" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[70px] items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Mednova+ Inc."
                width={200}
                height={80}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-grow justify-end mr-8">
            <div className="flex items-center space-x-8">
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[15px]  uppercase tracking-wide transition-colors duration-200 py-2",
                    pathname === link.href ? "text-primary" : "text-secondary hover:text-primary"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-100 transition-transform" />
                  )}
                </Link>
              ))}

              {/* Pages Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className={cn(
                  "flex items-center text-[15px] uppercase tracking-wide transition-colors duration-200 py-2",
                  pagesDropdown.some(item => pathname === item.href) ? "text-primary" : "text-secondary hover:text-primary"
                )}>
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                <div className={cn(
                  "absolute top-full left-0 w-48 bg-white shadow-lg rounded-sm py-2 border-t-2 border-primary transition-all duration-200 origin-top-left",
                  isDropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                )}>
                  {pagesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-sm uppercase tracking-wide hover:bg-gray-50 hover:text-primary transition",
                        pathname === item.href ? "text-primary" : "text-secondary"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Search Trigger (Desktop) */}
          <div className="hidden lg:flex items-center mr-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-secondary hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Link
              href="/contact"
              className="bg-primary text-white border-2 border-primary px-6 py-3 rounded-md text-[15px] uppercase tracking-wider hover:bg-transparent hover:text-primary transition duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none ml-2"
            >
              <Search className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base uppercase",
                  pathname === link.href ? "text-primary bg-gray-50" : "text-secondary hover:text-primary"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 my-2 pt-2">
              <p className="px-3 text-xs text-gray-400 uppercase tracking-widest mb-2">More Pages</p>
              {pagesDropdown.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base uppercase",
                    pathname === link.href ? "text-primary bg-gray-50" : "text-secondary hover:text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              className="block w-full text-left px-3 py-2 text-primary uppercase mt-4 bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Make an Appointment
            </Link>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
}

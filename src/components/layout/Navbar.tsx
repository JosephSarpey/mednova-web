/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { services } from "@/data/services";
import SearchModal from "../ui/SearchModal";

const navItems = [
  { href: "/", label: "Home" },
  {
    label: "About Us",
    dropdown: [
      { href: "/about", label: "About" },
      { href: "/team", label: "Our Team" },
      { href: "/testimonials", label: "Testimonials" },
    ],
  },
  {
    label: "Services",
    dropdown: [
      // { href: "/services", label: "Services" },
      
      ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.title, displayLabel: s.navLabel ?? s.title })),
      { href: "/education", label: "Education" },
    ],
  },
  {
    label: "Resources",
    dropdown: [
      { href: "/form", label: "Forms" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { href: "/ghana", label: "Ghana Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMouseEnter = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: true,
    }));
  };

  const handleMouseLeave = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: false,
    }));
  };

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
            <div className="flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                item.dropdown ? (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={() => handleMouseLeave(item.label)}
                  >
                    <button className={cn(
                      "flex items-center text-[14px] xl:text-[15px] uppercase tracking-wide transition-colors duration-200 py-2",
                      item.dropdown.some(subItem => pathname === subItem.href) ? "text-primary" : "text-secondary hover:text-primary"
                    )}>
                      {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className={cn(
                      "absolute top-full left-0 w-64 bg-white shadow-lg rounded-sm py-2 border-t-2 border-primary transition-all duration-200 origin-top-left",
                      openDropdowns[item.label] ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                    )}>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          title={subItem.label}
                          className={cn(
                            "block px-4 py-3 text-sm uppercase tracking-wide hover:bg-gray-50 hover:text-primary transition truncate",
                            pathname === subItem.href ? "text-primary" : "text-secondary"
                          )}
                        >
                          {(subItem as any).displayLabel ?? subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={cn(
                      "relative text-[14px] xl:text-[15px] uppercase tracking-wide transition-colors duration-200 py-2",
                      pathname === item.href ? "text-primary" : "text-secondary hover:text-primary"
                    )}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-100 transition-transform" />
                    )}
                  </Link>
                )
              ))}
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
              href="/form"
              className="bg-primary text-white border-2 border-primary px-4 xl:px-6 py-2 xl:py-3 rounded-md text-[14px] xl:text-[15px] uppercase tracking-wider hover:bg-transparent hover:text-primary transition duration-300 whitespace-nowrap"
            >
              Pick a Form
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
        <div className="lg:hidden bg-white border-t overflow-y-auto max-h-[calc(100vh-70px)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.label} className="border-b border-gray-100 last:border-0 pb-2 mb-2">
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex justify-between items-center w-full px-3 py-2 text-base uppercase text-secondary hover:text-primary"
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openDropdowns[item.label] ? "rotate-180" : ""
                    )} />
                  </button>

                  {/* Mobile Dropdown */}
                  {openDropdowns[item.label] && (
                    <div className="pl-6 space-y-1 mt-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block px-3 py-2 rounded-md justify-between items-center text-sm uppercase",
                            pathname === subItem.href ? "text-primary bg-gray-50" : "text-gray-500 hover:text-primary hover:bg-gray-50"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base uppercase border-b border-gray-100 last:border-0",
                    pathname === item.href ? "text-primary bg-gray-50" : "text-secondary hover:text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}

            <Link
              href="/contact"
              className="block w-full text-center px-3 py-3 text-white uppercase mt-4 bg-primary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Pick A
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

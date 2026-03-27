"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Search, FileText, Activity, ArrowRight, HeartHandshake, Link2, Sheet, NotebookText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { services, Service } from "@/data/services";
import { blogPosts, BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

interface ServiceDetail {
    id: string;
    slug: string;
    title: string;
    description: string;
}

interface PageResult {
    title: string;
    href: string;
    description: string;
}

type SearchResult =
    | { type: 'service'; data: Service }
    | { type: 'blog'; data: BlogPost }
    | { type: 'page'; data: PageResult };

const searchablePages: PageResult[] = [
    { title: "Home", href: "/", description: "MedNova+ Inc. homepage" },
    { title: "About Us", href: "/about", description: "Learn more about MedNova+ and our mission" },
    { title: "Our Services", href: "/services", description: "Comprehensive health and wellness services" },
    { title: "Our Team", href: "/team", description: "Meet our dedicated professionals" },
    { title: "Contact Us", href: "/contact", description: "Get in touch with us for inquiries or appointments" },
    { title: "Education & Training", href: "/education", description: "Learning resources and health education" },
    { title: "Ghana Partners", href: "/ghana", description: "Information about our operations in Ghana" },
    { title: "Latest News", href: "/blog", description: "Stay updated with our latest articles and announcements" },
    { title: "Privacy Policy", href: "/privacy", description: "How we handle your data" },
    { title: "Terms of Service", href: "/terms", description: "Rules for using our services" },
    { title: "Forms Directory", href: "/form", description: "Access and submit required forms for Mednova+ services." },
    { title: "Client Medical History Form", href: "/form/medical-history", description: "Provide your medical history for comprehensive evaluation." },
    { title: "Psychotherapy Intake Form", href: "/form/psychotherapy-intake", description: "Complete this intake form prior to your first psychotherapy session." },
    { title: "Webinar Registration Form", href: "/events/webinar-registration", description: "Register for upcoming Mednova+ educational webinars." },
    { title: "Events", href: "/events", description: "Explore upcoming Mednova+ events, webinars, and educational sessions." },
];
interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setSelectedIndex(-1);
            // Store original overflow value
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                // Restore original overflow value on cleanup
                document.body.style.overflow = originalOverflow;
            };
        } else {
            setQuery("");
            setResults([]);
            setSelectedIndex(-1);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                onClose();
                return;
            }

            const itemsCount = query ? results.length : Math.min(4, services.length);

            if (itemsCount > 0) {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev < itemsCount - 1 ? prev + 1 : prev));
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
                } else if (e.key === "Enter" && selectedIndex >= 0) {
                    e.preventDefault();
                    let href = "";
                    if (query) {
                        const selectedResult = results[selectedIndex];
                        if (selectedResult.type === 'service') {
                            href = `/services/${(selectedResult.data as Service).slug}`;
                        } else if (selectedResult.type === 'page') {
                            href = (selectedResult.data as PageResult).href;
                        } else if (selectedResult.type === 'blog') {
                            href = `/blog/${(selectedResult.data as BlogPost).id}`;
                        }
                    } else {
                        const selectedService = services.slice(0, 4)[selectedIndex];
                        if (selectedService) {
                            href = `/services/${selectedService.slug}`;
                        }
                    }

                    if (href) {
                        router.push(href);
                        onClose();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, query, results, selectedIndex, router]);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();

        const filteredServices: SearchResult[] = services
            .filter(s =>
                s.title.toLowerCase().includes(lowerQuery) ||
                s.description.toLowerCase().includes(lowerQuery) ||
                s.items.some(item => item.name.toLowerCase().includes(lowerQuery))
            )
            .map(s => ({ type: 'service', data: s }));

        const filteredBlogs: SearchResult[] = blogPosts
            .filter(b =>
                b.title.toLowerCase().includes(lowerQuery) ||
                b.excerpt.toLowerCase().includes(lowerQuery) ||
                b.category.toLowerCase().includes(lowerQuery) ||
                b.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            )
            .map(b => ({ type: 'blog', data: b }));

        const filteredPages: SearchResult[] = searchablePages
            .filter(p =>
                p.title.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery)
            )
            .map(p => ({ type: 'page', data: p }));

        setResults([...filteredServices, ...filteredBlogs, ...filteredPages]);
        setSelectedIndex(-1);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-secondary/40 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        {/* Search Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search services, articles, news..."
                                className="flex-1 bg-transparent border-none outline-none text-lg text-secondary placeholder:text-gray-400 py-2"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="Close"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {query && results.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="text-gray-500">No results found for "{query}"</p>
                                    <p className="text-sm text-gray-400 mt-1">Try searching for something else</p>
                                </div>
                            )}

                            {!query && (
                                <div className="p-4">
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick Links</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {services.slice(0, 4).map((service, index) => (
                                            <Link
                                                key={service.id}
                                                href={`/services/${service.slug}`}
                                                onClick={onClose}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={cn(
                                                    "flex items-center gap-3 p-3 rounded-xl transition-colors border",
                                                    selectedIndex === index
                                                        ? "bg-primary/5 border-primary/30"
                                                        : "border-transparent hover:bg-primary/5 hover:border-primary/10"
                                                )}
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Link2 className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-medium text-secondary">{service.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {results.length > 0 && (
                                <div className="space-y-6 p-2">
                                    {/* Services Results */}
                                    {results.some(r => r.type === 'service') && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Services</h3>
                                            <div className="space-y-1">
                                                {results.map((r, index) => r.type === 'service' ? (
                                                    <Link
                                                        key={(r.data as Service).id}
                                                        href={`/services/${(r.data as Service).slug}`}
                                                        onClick={onClose}
                                                        onMouseEnter={() => setSelectedIndex(index)}
                                                        className={cn(
                                                            "group flex items-center gap-4 p-3 rounded-xl transition-all border",
                                                            selectedIndex === index
                                                                ? "bg-primary/5 border-primary/30"
                                                                : "border-transparent hover:bg-primary/5"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                                            selectedIndex === index ? "bg-primary text-white" : "bg-primary/10 group-hover:bg-primary group-hover:text-white"
                                                        )}>
                                                            <HeartHandshake className={cn("w-5 h-5", selectedIndex === index ? "text-white" : "text-primary group-hover:text-white")} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-secondary truncate">{(r.data as Service).title}</h4>
                                                            <p className="text-xs text-gray-500 truncate mt-0.5">{(r.data as Service).description}</p>
                                                        </div>
                                                        <ArrowRight className={cn("w-4 h-4 transition-colors", selectedIndex === index ? "text-primary" : "text-primary/60 group-hover:text-primary")} />
                                                    </Link>
                                                ) : null)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Page Results */}
                                    {results.some(r => r.type === 'page') && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2 mt-4">Pages</h3>
                                            <div className="space-y-1">
                                                {results.map((r, index) => r.type === 'page' ? (
                                                    <Link
                                                        key={`page-${index}`}
                                                        href={(r.data as PageResult).href}
                                                        onClick={onClose}
                                                        onMouseEnter={() => setSelectedIndex(index)}
                                                        className={cn(
                                                            "group flex items-center gap-4 p-3 rounded-xl transition-all border",
                                                            selectedIndex === index
                                                                ? "bg-primary/5 border-primary/30"
                                                                : "border-transparent hover:bg-primary/5"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                                            selectedIndex === index ? "bg-primary text-white" : "bg-primary/10 group-hover:bg-primary group-hover:text-white"
                                                        )}>
                                                            <NotebookText className={cn("w-5 h-5", selectedIndex === index ? "text-white" : "text-primary group-hover:text-white")} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-secondary truncate">{(r.data as PageResult).title}</h4>
                                                            <p className="text-xs text-gray-500 truncate mt-0.5">{(r.data as PageResult).description}</p>
                                                        </div>
                                                        <ArrowRight className={cn("w-4 h-4 transition-colors", selectedIndex === index ? "text-primary" : "text-primary/60 group-hover:text-primary")} />
                                                    </Link>
                                                ) : null)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Blog Results */}
                                    {results.some(r => r.type === 'blog') && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2 mt-4">Articles & News</h3>
                                            <div className="space-y-1">
                                                {results.map((r, index) => r.type === 'blog' ? (
                                                    <Link
                                                        key={(r.data as BlogPost).id}
                                                        href={`/blog/${(r.data as BlogPost).id}`}
                                                        onClick={onClose}
                                                        onMouseEnter={() => setSelectedIndex(index)}
                                                        className={cn(
                                                            "group flex items-center gap-4 p-3 rounded-xl transition-all border",
                                                            selectedIndex === index
                                                                ? "bg-primary/5 border-primary/30"
                                                                : "border-transparent hover:bg-primary/5"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                                            selectedIndex === index ? "bg-primary text-white" : "bg-primary/10 group-hover:bg-primary group-hover:text-white"
                                                        )}>
                                                            <FileText className={cn("w-5 h-5", selectedIndex === index ? "text-white" : "text-primary group-hover:text-white")} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-secondary truncate">{(r.data as BlogPost).title}</h4>
                                                            <p className="text-xs text-gray-500 truncate mt-0.5">{(r.data as BlogPost).excerpt}</p>
                                                        </div>
                                                        <ArrowRight className={cn("w-4 h-4 transition-colors", selectedIndex === index ? "text-primary" : "text-primary/60 group-hover:text-primary")} />
                                                    </Link>
                                                ) : null)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                            <div className="flex gap-4">
                                <span><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm mr-1">ESC</kbd> to close</span>
                                <span><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm mr-1">↵</kbd> to select</span>
                            </div>
                            <div>Mednova+ Search</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

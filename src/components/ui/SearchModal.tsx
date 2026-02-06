"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Search, FileText, Activity, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
    { title: "Ghana Branch", href: "/ghana", description: "Information about our operations in Ghana" },
    { title: "Latest News", href: "/blog", description: "Stay updated with our latest articles and announcements" },
    { title: "Privacy Policy", href: "/privacy", description: "How we handle your data" },
    { title: "Terms of Service", href: "/terms", description: "Rules for using our services" },
];
interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setQuery("");
            setResults([]);
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

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
                                        {services.slice(0, 4).map(service => (
                                            <Link
                                                key={service.id}
                                                href={`/services/${service.slug}`}
                                                onClick={onClose}
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Activity className="w-4 h-4 text-primary" />
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
                                                {results.filter(r => r.type === 'service').map(r => (
                                                    <Link
                                                        key={(r.data as Service).id}
                                                        href={`/services/${(r.data as Service).slug}`}
                                                        onClick={onClose}
                                                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                            <Activity className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-secondary truncate">{(r.data as Service).title}</h4>
                                                            <p className="text-xs text-gray-500 truncate mt-0.5">{(r.data as Service).description}</p>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Page Results */}
                                    {results.some(r => r.type === 'page') && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Pages</h3>
                                            <div className="space-y-1">
                                                {results.filter(r => r.type === 'page').map((r, idx) => (
                                                    <Link
                                                        key={`page-${idx}`}
                                                        href={(r.data as PageResult).href}
                                                        onClick={onClose}
                                                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                                            <Activity className="w-5 h-5 text-orange-600 group-hover:text-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-secondary truncate">{(r.data as PageResult).title}</h4>
                                                            <p className="text-xs text-gray-500 truncate mt-0.5">{(r.data as PageResult).description}</p>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Blog Results */}
                                    {results.some(r => r.type === 'blog') && (
                                        <div>
                                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Articles & News</h3>
                                            <div className="space-y-1">
                                                {results.filter(r => r.type === 'blog').map(r => (
                                                    <Link
                                                        key={(r.data as BlogPost).id}
                                                        href={`/blog/${(r.data as BlogPost).id}`}
                                                        onClick={onClose}
                                                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-semibold text-secondary truncate">{(r.data as BlogPost).title}</h4>
                                                            <p className="text-xs text-gray-500 truncate mt-0.5">{(r.data as BlogPost).excerpt}</p>
                                                        </div>
                                                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                                    </Link>
                                                ))}
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

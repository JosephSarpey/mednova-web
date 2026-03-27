"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Search,
  BookOpen,
  FileText,
  Film,
  BarChart3,
  Wrench,
  ScrollText,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  resources,
  resourceCategories,
  type ResourceType,
} from "@/data/resources";

/* ── Type badge icons ── */
const typeIcons: Record<ResourceType, React.ElementType> = {
  Article: FileText,
  Guide: BookOpen,
  Whitepaper: ScrollText,
  Video: Film,
  Infographic: BarChart3,
  Toolkit: Wrench,
};

const typeColors: Record<ResourceType, string> = {
  Article: "bg-primary/10 text-primary",
  Guide: "bg-emerald-50 text-emerald-600",
  Whitepaper: "bg-violet-50 text-violet-600",
  Video: "bg-rose-50 text-rose-600",
  Infographic: "bg-amber-50 text-amber-700",
  Toolkit: "bg-sky-50 text-sky-600",
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesCategory =
        activeCategory === "all" || r.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredResources = resources.filter((r) => r.featured);

  const activeCategoryData = resourceCategories.find(
    (c) => c.slug === activeCategory
  );

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Resources"
        items={[
          { label: "Education", href: "/education" },
          { label: "Resources" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* ─── Featured Resources ─── */}
        <ScrollReveal>
          <div className="mb-24">
            <div className="text-center mb-16">
              <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">
                Start Here
              </p>
              <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
                Featured Resources
              </h2>
              <p className="max-w-2xl mx-auto text-black/60 text-lg font-light leading-relaxed">
                Our most popular and impactful resources, hand-picked by the
                MedNova+ team to help you take control of your health journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource) => {
                const TypeIcon = typeIcons[resource.type];
                return (
                  <Link
                    key={resource.title}
                    href={resource.href}
                    className="group relative bg-white border border-gray-100 rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center">
                        <TypeIcon className="h-6 w-6 text-primary" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm ${typeColors[resource.type]}`}
                      >
                        {resource.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-heading mb-4 group-hover:text-primary transition-colors duration-200">
                      {resource.title}
                    </h3>

                    <p className="text-black/60 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      {resource.readTime && (
                        <span className="flex items-center gap-1.5 text-sm text-black/40">
                          <Clock className="w-3.5 h-3.5" />
                          {resource.readTime}
                        </span>
                      )}
                      <span className="flex items-center text-primary font-bold uppercase text-xs tracking-widest group-hover:gap-3 gap-1.5 transition-all duration-200 ml-auto">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Resource Library ─── */}
        <ScrollReveal delay={0.05}>
          <div className="mb-24">
            <div className="text-center mb-12">
              <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">
                Explore
              </p>
              <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
                Resource Library
              </h2>
              <p className="max-w-2xl mx-auto text-black/60 text-lg font-light leading-relaxed">
                Browse our complete collection of articles, guides,
                whitepapers, and toolkits across all health and wellness topics.
              </p>
            </div>

            {/* ── Search Bar ── */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
                <input
                  id="resource-search"
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors duration-200 placeholder:text-black/30"
                />
              </div>
            </div>

            {/* ── Category Filters ── */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {resourceCategories.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    id={`category-${cat.slug}`}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm border-2 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                        : "bg-white border-gray-200 text-secondary hover:border-primary hover:text-primary"
                    }`}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* ── Active Category Description ── */}
            {activeCategoryData && activeCategory !== "all" && (
              <div className="text-center mb-12">
                <p className="text-black/50 font-light text-sm max-w-lg mx-auto leading-relaxed">
                  {activeCategoryData.description}
                </p>
              </div>
            )}

            {/* ── Resource Grid ── */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource) => {
                  const TypeIcon = typeIcons[resource.type];
                  const categoryData = resourceCategories.find(
                    (c) => c.slug === resource.category
                  );
                  return (
                    <Link
                      key={resource.title}
                      href={resource.href}
                      className="group relative bg-white border border-gray-100 rounded-sm p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Left accent */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex items-start justify-between mb-5">
                        <div className="w-11 h-11 bg-secondary/5 rounded-full flex items-center justify-center">
                          <TypeIcon className="h-5 w-5 text-primary" />
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm ${typeColors[resource.type]}`}
                        >
                          {resource.type}
                        </span>
                      </div>

                      {/* Category tag */}
                      {categoryData && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-black/30 mb-3">
                          <categoryData.icon className="w-3 h-3" />
                          {categoryData.label}
                        </span>
                      )}

                      <h3 className="text-lg font-bold font-serif text-heading mb-3 group-hover:text-primary transition-colors duration-200 leading-snug">
                        {resource.title}
                      </h3>

                      <p className="text-black/55 text-sm leading-relaxed font-light mb-6 line-clamp-3 flex-grow">
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        {resource.readTime && (
                          <span className="flex items-center gap-1.5 text-xs text-black/35">
                            <Clock className="w-3 h-3" />
                            {resource.readTime}
                          </span>
                        )}
                        <span className="flex items-center text-primary font-bold uppercase text-[10px] tracking-widest group-hover:gap-2 gap-1 transition-all duration-200 ml-auto">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-7 h-7 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold font-serif text-heading/60 mb-3">
                  No Resources Found
                </h3>
                <p className="text-sm text-black/40 font-light max-w-xs mx-auto leading-relaxed">
                  Try adjusting your search or selecting a different category to
                  find what you&apos;re looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-6 px-6 py-2.5 border-2 border-primary text-primary font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition duration-300 cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* ─── CTA Banner ─── */}
        <ScrollReveal>
          <div className="bg-secondary rounded-sm p-10 md:p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <BookOpen className="h-8 w-8 text-white mr-4" />
                  <h2 className="text-3xl font-bold font-serif text-white">
                    Can&apos;t Find What You Need?
                  </h2>
                </div>
                <p className="text-gray-300 max-w-xl text-lg font-light leading-relaxed">
                  Our team is constantly adding new resources. If you have a
                  specific topic you&apos;d like us to cover, or need
                  personalized health guidance, don&apos;t hesitate to reach out.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition duration-300 whitespace-nowrap"
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

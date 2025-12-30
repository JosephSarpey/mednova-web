"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const category = searchParams.get("category");
  
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);
    
    const searchString = params.toString();
    const url = `/blog${searchString ? `?${searchString}` : ""}`;
    
    router.push(url, { scroll: false });
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h4 className="text-lg font-bold text-heading mb-6 pb-2 border-b-2 border-primary inline-block">Search Blog</h4>
      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type keywords..." 
          className="w-full bg-gray-50 text-black border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition duration-300 outline-none"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, User, ArrowRight } from "lucide-react";

import { X } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import BlogSearch from "@/components/blog/BlogSearch";

interface PageProps {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { category, q } = await searchParams;
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !category || post.category === category;
    const matchesSearch = !q || 
      post.title.toLowerCase().includes(q.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(q.toLowerCase()) ||
      post.category.toLowerCase().includes(q.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="News & Updates" items={[{ label: "Blog" }]} />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Mobile Search - Visible only on mobile/tablet */}
            <div className="lg:hidden mb-12">
                <BlogSearch />
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    {(category || q) && (
                        <div className="mb-12 flex items-center justify-between bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-gray-500 text-sm font-medium uppercase tracking-widest whitespace-nowrap">Active Filters:</span>
                                {category && (
                                    <div className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/20">
                                        Category: {category}
                                    </div>
                                )}
                                {q && (
                                    <div className="flex items-center gap-2 bg-heading text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                                        Search: "{q}"
                                    </div>
                                )}
                            </div>
                            <Link 
                                href="/blog" 
                                scroll={false}
                                className="flex items-center gap-2 text-heading hover:text-primary transition text-xs font-bold uppercase tracking-widest group ml-4"
                            >
                                <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" /> Clear All
                            </Link>
                        </div>
                    )}

                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                        <Link 
                                            href={`/blog?category=${post.category}${q ? `&q=${q}` : ""}`}
                                            scroll={false}
                                            className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg hover:bg-heading transition duration-300"
                                        >
                                            {post.category}
                                        </Link>
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center text-gray-500 text-[10px] uppercase tracking-wider font-bold mb-4 gap-4">
                                            <div className="flex items-center">
                                                <Calendar className="h-3 w-3 mr-2 text-primary" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center">
                                                <User className="h-3 w-3 mr-2 text-primary" />
                                                {post.author}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold font-serif text-heading mb-4 hover:text-primary transition duration-300 line-clamp-2">
                                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                        </h3>
                                        <p className="text-gray-600 mb-6 text-sm leading-relaxed font-light line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto">
                                            <Link href={`/blog/${post.id}`} className="inline-flex items-center text-heading font-bold uppercase text-[10px] tracking-widest hover:text-primary transition group">
                                                Read More <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <h3 className="text-2xl font-bold text-heading mb-4">No posts found matching your criteria.</h3>
                            <Link href="/blog" className="text-primary font-bold uppercase text-xs tracking-widest hover:underline">
                                View all posts
                            </Link>
                        </div>
                    )}
                    
                    {!category && !q && filteredPosts.length > 0 && (
                        <div className="mt-20 flex justify-center space-x-2">
                            <span className="w-10 h-10 flex items-center justify-center bg-primary text-white font-bold rounded-full cursor-pointer shadow-lg shadow-primary/20">1</span>
                            <span className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 text-black font-bold rounded-full hover:bg-gray-50 transition cursor-pointer shadow-sm">2</span>
                            <span className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 text-black font-bold rounded-full hover:bg-gray-50 transition cursor-pointer shadow-sm">3</span>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="lg:w-1/3 space-y-12">
                    {/* Search */}
                    <div className="hidden lg:block">
                        <BlogSearch />
                    </div>

                    {/* Categories */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-lg font-bold text-heading mb-6 pb-2 border-b-2 border-primary inline-block">Categories</h4>
                        <ul className="space-y-4">
                            {Array.from(new Set(blogPosts.map(p => p.category))).map(cat => (
                                <li key={cat}>
                                    <Link 
                                        href={`/blog?category=${cat}${q ? `&q=${q}` : ""}`} 
                                        scroll={false}
                                        className={`flex justify-between items-center transition font-medium group text-sm ${category === cat ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                                    >
                                        <span>{cat}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${category === cat ? "bg-primary text-white" : "bg-gray-50 group-hover:bg-primary/10"}`}>
                                            {blogPosts.filter(p => p.category === cat).length}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recent Posts */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-lg font-bold text-heading mb-6 pb-2 border-b-2 border-primary inline-block">Recent Posts</h4>
                        <div className="space-y-8">
                            {blogPosts.slice(0, 3).map(rp => (
                                <Link key={rp.id} href={`/blog/${rp.id}`} className="group flex gap-4">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">{rp.date}</span>
                                        <h5 className="font-bold text-heading text-sm line-clamp-2 leading-tight group-hover:text-primary transition duration-300">{rp.title}</h5>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
      </section>
    </div>
  );
}

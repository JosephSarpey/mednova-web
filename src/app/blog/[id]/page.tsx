import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, User, Tag, ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogContent from "@/components/blog/BlogContent";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === parseInt(id));

    if (!post) {
        notFound();
    }

    const relatedPosts = blogPosts
        .filter((p) => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

    return (
        <div className="bg-white min-h-screen">
            <PageHeader
                title={post.title}
                items={[
                    { label: "Blog", href: "/blog" },
                    { label: post.title }
                ]}
            />

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Mobile Search - Visible only on mobile/tablet */}
                    <div className="lg:hidden mb-12">
                        <BlogSearch />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <div className="mb-8">
                                <Link href="/blog" className="inline-flex items-center text-primary font-bold uppercase text-xs tracking-widest hover:translate-x-[-4px] transition-transform duration-300">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                                </Link>
                            </div>

                            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-2xl">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 left-6 bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                                    {post.category}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-100">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                                    {post.date}
                                </div>
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2 text-primary" />
                                    By {post.author}
                                </div>
                                <div className="flex items-center">
                                    <Tag className="h-4 w-4 mr-2 text-primary" />
                                    {post.tags.join(", ")}
                                </div>
                            </div>

                            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-heading prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:bg-gray-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-strong:text-heading">
                                <BlogContent content={post.content} />
                            </article>

                            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-heading font-bold uppercase text-xs tracking-widest">Share this post:</span>
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition duration-300 shadow-sm">
                                            <Facebook className="h-4 w-4" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition duration-300 shadow-sm">
                                            <Twitter className="h-4 w-4" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition duration-300 shadow-sm">
                                            <Linkedin className="h-4 w-4" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition duration-300 shadow-sm">
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Author Bio */}
                            <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8">
                                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                                    <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-heading mb-1">{post.author}</h4>
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 block">{post.authorRole}</span>
                                    <p className="text-gray-600 leading-relaxed font-light">
                                        Dr. {post.author.split(' ')[1]} is a dedicated healthcare professional at Mednova+, specializing in {post.category.toLowerCase()}. With over 15 years of experience, they are passionate about patient education and holistic wellness.
                                    </p>
                                </div>
                            </div>
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
                                            <Link href={`/blog?category=${cat}`} className="flex justify-between items-center text-gray-600 hover:text-primary transition font-medium group text-sm">
                                                <span>{cat}</span>
                                                <span className="bg-gray-50 group-hover:bg-primary/10 px-2 py-0.5 rounded text-[10px] font-bold">
                                                    {blogPosts.filter(p => p.category === cat).length}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Related Posts */}
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h4 className="text-lg font-bold text-heading mb-6 pb-2 border-b-2 border-primary inline-block">Related Posts</h4>
                                <div className="space-y-8">
                                    {relatedPosts.length > 0 ? (
                                        relatedPosts.map(rp => (
                                            <Link key={rp.id} href={`/blog/${rp.id}`} className="group flex gap-4">
                                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">{rp.date}</span>
                                                    <h5 className="font-bold text-heading text-sm line-clamp-2 leading-tight group-hover:text-primary transition duration-300">{rp.title}</h5>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm italic">No related posts found.</p>
                                    )}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-heading rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-4">Subscribe to our newsletter</h4>
                                    <p className="text-gray-400 text-sm mb-6 font-light">Stay updated with our latest news and health tips.</p>
                                    <form className="space-y-3">
                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            className="w-full bg-white/10 border-none rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-primary/50 outline-none transition duration-300"
                                        />
                                        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition duration-300 shadow-xl shadow-primary/20">
                                            Subscribe Now
                                        </button>
                                    </form>
                                </div>
                                {/* Decorative element */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}

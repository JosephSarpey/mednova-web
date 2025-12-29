import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const recentPosts = [
  {
    id: 1,
    title: "The Importance of Holistic Health in Modern Society",
    excerpt: "Holistic health is not just about physical well-being; it encompasses mental, emotional, and social aspects as well...",
    date: "Dec 28, 2024",
    author: "Dr. Lloyd Okine",
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Wellness"
  },
  {
    id: 2,
    title: "Managing Stress Through Lifestyle Changes",
    excerpt: "Chronic stress is a major contributor to many health issues. Learn how simple lifestyle modifications can help you...",
    date: "Dec 30, 2024",
    author: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle"
  },
  {
    id: 3,
    title: "Public Health Strategies for Community Wellness",
    excerpt: "Effective public health strategies require community engagement and evidence-based interventions...",
    date: "Dec 25, 2024",
    author: "Dr. Michael Chen",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Public Health"
  }
];

export default function NewsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Recent News</p>
                <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl">
                    Latest Blog Posts
                </h2>
            </div>
            <Link 
                href="/blog" 
                className="hidden md:inline-block bg-primary text-white px-8 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-heading transition duration-300"
            >
                View All News
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentPosts.map((post) => (
                <div key={post.id} className="group bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300">
                    <div className="relative h-64 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                            {post.category}
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center text-black text-xs uppercase tracking-wider font-medium mb-4">
                            <div className="flex items-center mr-6">
                                <Calendar className="h-3 w-3 mr-2" />
                                {post.date}
                            </div>
                            <div className="flex items-center">
                                <User className="h-3 w-3 mr-2" />
                                {post.author}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-serif text-heading mb-4 hover:text-primary transition duration-300">
                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-black mb-6 text-sm leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                        <Link href={`/blog/${post.id}`} className="inline-flex items-center text-heading font-bold uppercase text-xs tracking-wider hover:text-primary transition">
                            Read More <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="text-center md:hidden">
             <Link 
                href="/blog" 
                className="inline-block bg-primary text-white px-8 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-heading transition duration-300"
            >
                View All News
            </Link>
        </div>
      </div>
    </section>
  );
}

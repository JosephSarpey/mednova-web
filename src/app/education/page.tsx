import { BookOpen, GraduationCap, Calendar, Download } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

const courses = [
  {
    title: "Fundamentals of Lifestyle Medicine",
    description: "An introductory course on the pillars of lifestyle medicine and how to apply them for better health outcomes.",
    date: "Coming Soon",
    mode: "Online",
  },
  {
    title: "Public Health Advocacy Workshop",
    description: "Learn effective strategies for advocating public health policies and community interventions.",
    date: "TBA",
    mode: "Hybrid",
  },
  {
    title: "Nutrition for Life",
    description: "A comprehensive guide to nutritional wellness and managing dietary needs for chronic conditions.",
    date: "Available Now",
    mode: "Self-paced",
  },
];

export default function EducationPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Education & Training" items={[{ label: "Education" }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Featured Courses */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-[2px] text-sm mb-3">Learn With Us</p>
            <h2 className="text-4xl font-serif font-bold text-heading sm:text-5xl mb-6">
                 Featured Courses
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.title} className="bg-white border border-gray-100 rounded-md p-8 shadow-sm hover:shadow-xl transition duration-300 group">
                <div className="mb-6 flex justify-between items-start">
                  <div className="w-12 h-12 bg-secondary/5 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-secondary" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-sm">
                    {course.mode}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif text-heading mb-4 group-hover:text-primary transition">{course.title}</h3>
                <p className="text-black mb-6 text-sm leading-relaxed">
                  {course.description}
                </p>
                <div className="flex items-center text-black text-sm mb-8 font-medium">
                  <Calendar className="h-4 w-4 mr-2" />
                  {course.date}
                </div>
                <button className="w-full py-3 border-2 border-primary text-primary font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-secondary rounded-sm p-10 md:p-16 relative overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
           <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>
           
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <div className="flex items-center mb-6">
                <BookOpen className="h-8 w-8 text-white mr-4" />
                <h2 className="text-3xl font-bold font-serif text-white">Health Resources Library</h2>
              </div>
              <p className="text-gray-300 max-w-xl text-lg font-light leading-relaxed">
                Access our curated library of articles, whitepapers, and guides on various health topics. Stay informed with the latest evidence-based information.
              </p>
            </div>
            <Link
              href="/contact" 
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-white hover:text-primary transition duration-300 whitespace-nowrap"
            >
              Access Library <Download className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

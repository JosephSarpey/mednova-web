import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  breadcrumbClass?: string;
  items?: { label: string; href?: string }[];
}

export default function PageHeader({ title, items = [] }: PageHeaderProps) {
  return (
    <div className="relative bg-secondary py-15 md:py-20">
       {/* Background Image / Overlay */}
       <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-60"></div>
       <div className="absolute inset-0 bg-[#0a0a0a]/60 mix-blend-multiply"></div>
       
       <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-wider">{title}</h1>
        
        <div className="flex items-center justify-center space-x-2 text-white/80 text-sm md:text-base font-medium uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight className="h-4 w-4 mx-2" />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-primary transition-colors">{item.label}</Link>
                    ) : (
                        <span className="text-white">{item.label}</span>
                    )}
                </div>
            ))}
        </div>
       </div>
    </div>
  );
}

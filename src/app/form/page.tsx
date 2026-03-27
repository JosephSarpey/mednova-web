import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FileText, ClipboardList } from "lucide-react";

export const metadata: Metadata = {
    title: "Forms Directory | Mednova+ Inc.",
    description: "Access and submit required forms for Mednova+ services securely.",
};

export default function FormsDirectoryPage() {
    const forms = [
        {
            title: "Client Medical History",
            description: "Provide your medical history for comprehensive evaluation.",
            href: "/form/medical-history",
            icon: <FileText className="w-8 h-8 text-primary" />,
        },
        {
            title: "Psychotherapy Intake",
            description: "Complete this intake form prior to your first psychotherapy session.",
            href: "/form/psychotherapy-intake",
            icon: <ClipboardList className="w-8 h-8 text-primary" />,
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-12 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 uppercase tracking-tight">
                        Forms Center
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Please select the appropriate form to complete from the options below.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {forms.map((form) => (
                        <Link 
                            key={form.href} 
                            href={form.href}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center group"
                        >
                            <div className="bg-primary/10 p-4 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                                {form.icon}
                            </div>
                            <h2 className="text-xl font-bold text-secondary mb-3">{form.title}</h2>
                            <p className="text-muted-foreground">{form.description}</p>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 max-w-2xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="font-semibold text-secondary">Privacy Note:</span> Your privacy is our priority.
                        All information provided is encrypted and handled in strict accordance with healthcare privacy standards.
                    </p>
                </div>
            </div>
        </main>
    );
}

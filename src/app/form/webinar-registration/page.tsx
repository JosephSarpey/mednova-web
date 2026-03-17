import WebinarRegistrationForm from "@/components/forms/WebinarRegistrationForm";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Webinar Registration Form | Mednova+ Inc.",
    description: "Register for Mednova+ Inc. webinars.",
};

export default function WebinarRegistrationFormPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-12 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        href="/form"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Forms
                    </Link>
                </div>
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 uppercase tracking-tight">
                        Webinar Registration
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Please complete the form below to register for the webinar.
                    </p>
                </div>

                <WebinarRegistrationForm />

                <div className="mt-16 max-w-2xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="font-semibold text-secondary">Data Usage Note:</span> 
                        The information you provide will be used to send you webinar details and updates.
                    </p>
                </div>
            </div>
        </main>
    );
}

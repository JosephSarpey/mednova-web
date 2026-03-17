import ClientMedicalHistoryForm from "@/components/forms/ClientMedicalHistoryForm";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Client Medical History Form | Mednova+ Inc.",
    description: "Secure and easy client medical history form submission for Mednova+ services.",
};

export default function MedicalHistoryFormPage() {
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
                        Client Medical History
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Please complete the form below. Once finished, you can download a PDF copy for your records
                        before submitting it to our care team.
                    </p>
                </div>

                <ClientMedicalHistoryForm />

                <div className="mt-16 max-w-2xl mx-auto text-center">
                    <p className="text-sm text-muted-foreground bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="font-semibold text-secondary">Privacy Note:</span> Your privacy is our priority.
                        All information provided is encrypted and handled in strict accordance with healthcare privacy standards.
                        We do not share your personal data with third parties without your explicit consent.
                    </p>
                </div>
            </div>
        </main>
    );
}

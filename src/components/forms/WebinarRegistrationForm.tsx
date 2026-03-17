"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, Video, AlertCircle, Phone, Mail, User, Globe, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

const WebinarRegistrationForm = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        country: "",
        expectation: "",
    });
    const [isMounted, setIsMounted] = useState(false);
    const [formRefID, setFormRefID] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    const [isDownloading, setIsDownloading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    React.useEffect(() => {
        setIsMounted(true);
        setCurrentDate(new Date().toLocaleDateString());
        setFormRefID(`MN-WR-${Math.random().toString(36).substring(7).toUpperCase()}`);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const downloadPDF = async () => {
        setIsDownloading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 600));

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 20;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.setTextColor(12, 43, 75);
            doc.text("MEDNOVA+", 20, yPos);

            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("Healthcare Excellence", 20, yPos + 6);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(19, 162, 183);
            doc.text("WEBINAR REGISTRATION FORM", pageWidth - 20, yPos, { align: "right" });

            yPos += 15;

            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(12, 43, 75);
            doc.text("Attendee Information", 20, yPos);
            yPos += 10;

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            const leftColX = 20;

            const addField = (label: string, value: string, x: number, y: number, valueOffsetX = 45) => {
                doc.setFont("helvetica", "bold");
                doc.text(label, x, y);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                doc.text(value || "N/A", x + valueOffsetX, y);
                doc.setTextColor(0, 0, 0);
            };

            addField("First Name:", formData.firstName, leftColX, yPos);
            yPos += 10;
            addField("Last Name:", formData.lastName, leftColX, yPos);
            yPos += 10;
            addField("Email:", formData.email, leftColX, yPos);
            yPos += 10;
            addField("Contact Number:", formData.contactNumber, leftColX, yPos);
            yPos += 10;
            addField("Country:", formData.country, leftColX, yPos);
            yPos += 15;

            doc.setFont("helvetica", "bold");
            doc.text("Expectation:", leftColX, yPos);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(60, 60, 60);
            const expectationLines = doc.splitTextToSize(formData.expectation || "None provided", pageWidth - leftColX - 20);
            doc.text(expectationLines, leftColX, yPos + 6);
            doc.setTextColor(0, 0, 0);
            yPos += (expectationLines.length * 5) + 15;

            doc.setDrawColor(230, 230, 230);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 15;

            doc.setDrawColor(0, 0, 0);
            doc.line(20, yPos, 80, yPos);
            doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
            yPos += 5;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text("Attendee Signature", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            const pageCount = (doc.internal as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Generated on: ${currentDate}`, 20, 287);
                doc.text(`Ref: ${formRefID} | Page ${i} of ${pageCount}`, pageWidth - 20, 287, { align: "right" });
            }

            doc.save(`Webinar_Registration_${formData.firstName}_${formData.lastName || "Submission"}.pdf`);

        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("There was an issue generating the PDF.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation
        const requiredFields = ['firstName', 'lastName', 'email'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            setSubmitError(`Please fill in all required fields: ${missingFields.join(', ')}`);
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        const lastSubmitTime = localStorage.getItem('wrFormLastSubmit');
        if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < 300000) {
            setSubmitError("Please wait 5 minutes before submitting again.");
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const formspreeEndpoint = process.env.NEXT_PUBLIC_WEBINAR_ENDPOINT || "https://formspree.io/f/example";

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "Form Type": "Webinar Registration",
                    "Reference ID": formRefID,
                    "Generated Date": currentDate,
                    "First Name": formData.firstName,
                    "Last Name": formData.lastName,
                    "Email": formData.email,
                    "Contact Number": formData.contactNumber,
                    "Country": formData.country,
                    "Expectation": formData.expectation,
                })
            });

            if (response.ok) {
                setSubmitSuccess(true);
                localStorage.setItem('wrFormLastSubmit', Date.now().toString());
                setTimeout(() => setSubmitSuccess(false), 5000);
            } else {
                setSubmitError("An error occurred during submission. Please try again.");
                setTimeout(() => setSubmitError(""), 5000);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setSubmitError("A network error occurred. Please try again.");
            setTimeout(() => setSubmitError(""), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl text-black shadow-xl overflow-hidden border border-gray-100"
        >
            <div ref={formRef} className="p-8 sm:p-12 bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-8 mb-8 gap-6">
                    <div>
                        <Image
                            src="/logo.png"
                            alt="Mednova+ Logo"
                            width={180}
                            height={60}
                            className="h-12 w-auto mb-4"
                        />
                        <h1 className="text-2xl font-bold text-secondary uppercase tracking-tight">Webinar Registration Form</h1>
                        <p className="text-sm text-muted-foreground mt-1">Join our next educational session.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-primary pl-3">
                        <Video className="w-5 h-5 text-primary" /> Attendee Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-secondary ml-1">First Name <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-secondary ml-1">Last Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Doe"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium text-secondary ml-1">Email <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-secondary ml-1">Contact Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="+233 XX XXX XXXX"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-secondary ml-1">Country</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white appearance-none"
                                >
                                    <option value="">Select Country</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-medium text-secondary ml-1">Expectation</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                <textarea
                                    name="expectation"
                                    value={formData.expectation}
                                    onChange={handleInputChange}
                                    placeholder="What are your expectations for this webinar?"
                                    rows={4}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between text-[10px] text-muted-foreground uppercase tracking-widest gap-4">
                    <div>Generated on: {isMounted ? currentDate : "---"}</div>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Confirmed via Web Registration
                    </div>
                    <div>Ref: {isMounted ? formRefID : "---"}</div>
                </div>
            </div>

            <div className="p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">
                        Review your information before submitting.
                    </p>
                    <p className="text-xs text-amber-600 font-medium">
                        Please fill the form accurately. You can only submit once every 5 minutes.
                    </p>
                    {submitSuccess && (
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs text-green-600 font-medium"
                        >
                            Registration successful!
                        </motion.p>
                    )}
                    {submitError && (
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs text-red-600 font-medium"
                        >
                            {submitError}
                        </motion.p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        className={cn(
                            "flex items-center justify-center gap-2 bg-white text-secondary border border-gray-200 px-6 py-3 rounded-xl font-semibold uppercase tracking-wide transition-all hover:bg-gray-50 active:scale-[0.98]",
                            isDownloading ? "opacity-70 cursor-not-allowed" : ""
                        )}
                    >
                        {isDownloading ? (
                            <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        PDF
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || submitSuccess}
                        className={cn(
                            "flex items-center justify-center gap-2 bg-primary text-white border-2 border-primary px-8 py-3 rounded-xl font-semibold uppercase tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.98]",
                            (isSubmitting || submitSuccess) ? "opacity-70 cursor-not-allowed" : "hover:bg-transparent hover:text-primary"
                        )}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </>
                        ) : submitSuccess ? (
                            "Registered"
                        ) : (
                            "Register"
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default WebinarRegistrationForm;

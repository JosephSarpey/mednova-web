"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, User, Phone, Mail, MapPin, ShieldCheck, AlertCircle, HeartPulse, FileText } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

const HealthWellnessConsentForm = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        // Health & Wellness specific
        currentMedications: "",
        knownAllergies: "",
        preExistingConditions: "",
        fitnessLevel: "",
        // Consent checkboxes
        understandPurpose: false,
        understandVoluntary: false,
        understandRisks: false,
        understandConfidentiality: false,
        understandRightToWithdraw: false,
        understandMedicalAdvice: false,
        consentToProgram: false,
        // Additional
        wellnessGoals: "",
        additionalNotes: "",
        signatureText: "",
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
        setFormRefID(`MN-HW-${Math.random().toString(36).substring(7).toUpperCase()}`);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const downloadPDF = async () => {
        setIsDownloading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 600));

            const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
            const pageWidth = doc.internal.pageSize.getWidth();
            let yPos = 20;

            // Header
            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.setTextColor(12, 43, 75);
            doc.text("MEDNOVA+", 20, yPos);

            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("Healthcare Excellence", 20, yPos + 6);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(19, 162, 183);
            doc.text("HEALTH & WELLNESS", pageWidth - 20, yPos, { align: "right" });
            doc.text("INFORMED CONSENT FORM", pageWidth - 20, yPos + 6, { align: "right" });

            yPos += 18;
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            // Personal Details
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(12, 43, 75);
            doc.text("Participant Information", 20, yPos);
            yPos += 10;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            const addField = (label: string, value: string, x: number, y: number, valueOffsetX = 45) => {
                doc.setFont("helvetica", "bold");
                doc.text(label, x, y);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                doc.text(value || "N/A", x + valueOffsetX, y);
                doc.setTextColor(0, 0, 0);
            };

            const leftColX = 20;
            const rightColX = pageWidth / 2 + 10;

            addField("Full Name:", formData.fullName, leftColX, yPos);
            addField("Date of Birth:", formData.dateOfBirth, rightColX, yPos);
            yPos += 8;
            addField("Gender:", formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : "", leftColX, yPos);
            addField("Phone:", formData.phone, rightColX, yPos);
            yPos += 8;
            addField("Email:", formData.email, leftColX, yPos);
            yPos += 8;
            addField("Address:", formData.address || "N/A", leftColX, yPos, 45);
            yPos += 8;
            addField("Emergency Contact:", formData.emergencyContactName, leftColX, yPos, 45);
            addField("Emergency Phone:", formData.emergencyContactPhone, rightColX, yPos, 45);

            yPos += 12;
            doc.setDrawColor(230, 230, 230);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            // Health Background
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(12, 43, 75);
            doc.text("Health Background", 20, yPos);
            yPos += 10;
            doc.setFontSize(10);

            const addTextBlock = (label: string, value: string) => {
                if (yPos > 260) { doc.addPage(); yPos = 20; }
                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 0, 0);
                doc.text(label, 20, yPos);
                yPos += 6;
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(value || "None provided", pageWidth - 40);
                doc.text(lines, 20, yPos);
                yPos += lines.length * 5 + 5;
                doc.setTextColor(0, 0, 0);
            };

            addTextBlock("Current Medications:", formData.currentMedications);
            addTextBlock("Known Allergies:", formData.knownAllergies);
            addTextBlock("Pre-existing Conditions:", formData.preExistingConditions);
            addField("Fitness Level:", formData.fitnessLevel || "N/A", leftColX, yPos, 35);
            yPos += 8;
            addTextBlock("Wellness Goals:", formData.wellnessGoals);

            yPos += 2;
            doc.setDrawColor(230, 230, 230);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            // Consent Section
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(12, 43, 75);
            doc.text("Consent Acknowledgements", 20, yPos);
            yPos += 10;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            const consentItems = [
                { label: "Understanding of Program Purpose", value: formData.understandPurpose },
                { label: "Voluntary Participation", value: formData.understandVoluntary },
                { label: "Understanding of Risks & Benefits", value: formData.understandRisks },
                { label: "Understanding of Confidentiality", value: formData.understandConfidentiality },
                { label: "Right to Withdraw Consent", value: formData.understandRightToWithdraw },
                { label: "Understanding Medical Advice Disclaimer", value: formData.understandMedicalAdvice },
                { label: "Consent to Health & Wellness Program", value: formData.consentToProgram },
            ];

            consentItems.forEach((item) => {
                if (yPos > 260) { doc.addPage(); yPos = 20; }
                const checkMark = item.value ? "☑" : "☐";
                doc.setFont("helvetica", "normal");
                doc.text(`${checkMark}  ${item.label}`, 20, yPos);
                yPos += 7;
            });

            if (formData.additionalNotes) {
                yPos += 5;
                addTextBlock("Additional Notes:", formData.additionalNotes);
            }

            // Declaration
            if (yPos > 240) { doc.addPage(); yPos = 20; }
            yPos += 5;
            doc.setDrawColor(220, 220, 220);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Declaration:", 20, yPos);
            yPos += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const decLines = doc.splitTextToSize(
                "I hereby voluntarily consent to participate in the Health and Wellness program provided by Mednova+ Inc. I have read and understood the purpose, risks, benefits, and limitations of the program. I understand that participation is voluntary and that I may withdraw my consent at any time. I confirm that the information provided is accurate to the best of my knowledge.",
                pageWidth - 40
            );
            doc.text(decLines, 20, yPos);
            yPos += decLines.length * 5 + 10;

            if (formData.signatureText) {
                doc.setFontSize(10);
                doc.setFont("helvetica", "italic");
                doc.setTextColor(0, 0, 0);
                doc.text(`Signed: ${formData.signatureText}`, 20, yPos);
                yPos += 10;
            }

            if (yPos > 260) { doc.addPage(); yPos = 20; }
            doc.setDrawColor(0, 0, 0);
            doc.line(20, yPos, 80, yPos);
            doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
            yPos += 5;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text("Participant Signature", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            const pageCount = (doc.internal as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Generated on: ${currentDate}`, 20, 287);
                doc.text(`Ref: ${formRefID} | Page ${i} of ${pageCount}`, pageWidth - 20, 287, { align: "right" });
            }

            doc.save(`Health_Wellness_Consent_${formData.fullName.replace(/\s+/g, "_") || "Submission"}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("There was an issue generating the PDF.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requiredFields = ["fullName", "email", "phone"];
        const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            setSubmitError(`Please fill in all required fields: ${missingFields.join(", ")}`);
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        if (!formData.consentToProgram) {
            setSubmitError("You must consent to the Health & Wellness program to submit this form.");
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        const lastSubmitTime = localStorage.getItem("hwConsentLastSubmit");
        if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < 300000) {
            setSubmitError("Please wait 5 minutes before submitting again.");
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const formspreeEndpoint = process.env.NEXT_PUBLIC_HEALTHWELLNESS_CONSENT_ENDPOINT || "https://formspree.io/f/example";

        try {
            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    "Form Type": "Health and Wellness Informed Consent",
                    "Reference ID": formRefID,
                    "Generated Date": currentDate,
                    "Full Name": formData.fullName,
                    "Date of Birth": formData.dateOfBirth,
                    Gender: formData.gender,
                    Email: formData.email,
                    Phone: formData.phone,
                    Address: formData.address,
                    "Emergency Contact Name": formData.emergencyContactName,
                    "Emergency Contact Phone": formData.emergencyContactPhone,
                    "Current Medications": formData.currentMedications,
                    "Known Allergies": formData.knownAllergies,
                    "Pre-existing Conditions": formData.preExistingConditions,
                    "Fitness Level": formData.fitnessLevel,
                    "Wellness Goals": formData.wellnessGoals,
                    "Understands Purpose": formData.understandPurpose ? "Yes" : "No",
                    "Understands Voluntary": formData.understandVoluntary ? "Yes" : "No",
                    "Understands Risks & Benefits": formData.understandRisks ? "Yes" : "No",
                    "Understands Confidentiality": formData.understandConfidentiality ? "Yes" : "No",
                    "Understands Right to Withdraw": formData.understandRightToWithdraw ? "Yes" : "No",
                    "Understands Medical Advice Disclaimer": formData.understandMedicalAdvice ? "Yes" : "No",
                    "Consents to Program": formData.consentToProgram ? "Yes" : "No",
                    "Additional Notes": formData.additionalNotes,
                    "Signature Text": formData.signatureText,
                }),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                localStorage.setItem("hwConsentLastSubmit", Date.now().toString());
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
            <div ref={formRef} className="p-5 sm:p-8 md:p-12 bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-8 mb-8 gap-6">
                    <div>
                        <Image src="/logo.png" alt="Mednova+ Logo" width={180} height={60} className="h-12 w-auto mb-4" />
                        <h1 className="text-2xl font-bold text-secondary uppercase tracking-tight">
                            Health &amp; Wellness Informed Consent
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Please review and complete the consent form below.
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Health & Wellness Information Banner */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-6">
                        <div className="flex items-start gap-3">
                            <HeartPulse className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-secondary mb-2">About Our Health &amp; Wellness Program</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Our Health and Wellness program is designed to support your overall well-being through personalized
                                    health assessments, wellness coaching, nutritional guidance, and lifestyle recommendations. This
                                    consent form ensures you understand the nature of the program, its benefits, limitations, and your
                                    rights as a participant.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-primary pl-3">
                            <User className="w-5 h-5 text-primary" /> Participant Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
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
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+233 XX XXX XXXX"
                                        required
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">Residential Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full address"
                                        rows={2}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-red-400 pl-3">
                            <AlertCircle className="w-5 h-5 text-red-400" /> Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Contact Name</label>
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleInputChange}
                                    placeholder="Emergency contact full name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Contact Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="emergencyContactPhone"
                                        value={formData.emergencyContactPhone}
                                        onChange={handleInputChange}
                                        placeholder="+233 XX XXX XXXX"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Health Background */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
                            <HeartPulse className="w-5 h-5 text-emerald-500" /> Health Background
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Current Medications</label>
                                <textarea
                                    name="currentMedications"
                                    value={formData.currentMedications}
                                    onChange={handleInputChange}
                                    placeholder="List any current medications..."
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Known Allergies</label>
                                <textarea
                                    name="knownAllergies"
                                    value={formData.knownAllergies}
                                    onChange={handleInputChange}
                                    placeholder="List any known allergies..."
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Pre-existing Conditions</label>
                                <textarea
                                    name="preExistingConditions"
                                    value={formData.preExistingConditions}
                                    onChange={handleInputChange}
                                    placeholder="List any pre-existing medical conditions..."
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Current Fitness Level</label>
                                <select
                                    name="fitnessLevel"
                                    value={formData.fitnessLevel}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                >
                                    <option value="">Select</option>
                                    <option value="sedentary">Sedentary</option>
                                    <option value="lightly-active">Lightly Active</option>
                                    <option value="moderately-active">Moderately Active</option>
                                    <option value="very-active">Very Active</option>
                                    <option value="extremely-active">Extremely Active</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-secondary ml-1">Wellness Goals</label>
                            <textarea
                                name="wellnessGoals"
                                value={formData.wellnessGoals}
                                onChange={handleInputChange}
                                placeholder="Describe your health and wellness goals (e.g., weight management, stress reduction, improved fitness, nutrition guidance)..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Consent Acknowledgements */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-mednova-green pl-3">
                            <ShieldCheck className="w-5 h-5 text-mednova-green" /> Consent Acknowledgements
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandPurpose"
                                        checked={formData.understandPurpose}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that the Health and Wellness program is designed to support my overall well-being through assessments, coaching, and lifestyle recommendations, and that it does not replace professional medical treatment.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandVoluntary"
                                        checked={formData.understandVoluntary}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that my participation in this program is entirely voluntary and that I may choose which activities and recommendations to follow at my own discretion.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandRisks"
                                        checked={formData.understandRisks}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand the potential benefits (improved health, increased awareness, better lifestyle habits) and risks (physical discomfort from new activities, emotional responses during wellness assessments) associated with the program.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandConfidentiality"
                                        checked={formData.understandConfidentiality}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that all personal health information shared during the program will remain confidential and will only be used for the purpose of providing wellness services.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandRightToWithdraw"
                                        checked={formData.understandRightToWithdraw}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that I have the right to withdraw my consent and discontinue participation at any time without penalty or loss of benefits.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandMedicalAdvice"
                                        checked={formData.understandMedicalAdvice}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that the wellness recommendations provided are not a substitute for professional medical advice, diagnosis, or treatment, and I should consult my physician for specific medical concerns.
                                    </span>
                                </label>
                            </div>

                            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="consentToProgram"
                                        checked={formData.consentToProgram}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-5 h-5"
                                    />
                                    <span className="text-sm font-semibold text-secondary leading-relaxed">
                                        I hereby consent to participate in the Health and Wellness program provided by Mednova+ Inc. I have
                                        read, understood, and agree to all conditions stated above. <span className="text-red-500">*</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Signature & Notes */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-secondary pl-3">
                            <FileText className="w-5 h-5 text-secondary" /> Additional Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Type Your Full Name as Signature</label>
                                <input
                                    type="text"
                                    name="signatureText"
                                    value={formData.signatureText}
                                    onChange={handleInputChange}
                                    placeholder="Type your full legal name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all italic"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-secondary ml-1">Additional Notes or Concerns</label>
                            <textarea
                                name="additionalNotes"
                                value={formData.additionalNotes}
                                onChange={handleInputChange}
                                placeholder="Any additional information, health concerns, or questions you'd like to share..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between text-[10px] text-muted-foreground uppercase tracking-widest gap-4">
                    <div>Generated on: {isMounted ? currentDate : "---"}</div>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Confirmed by Participant Signature
                    </div>
                    <div>Ref: {isMounted ? formRefID : "---"}</div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">
                        Review your information and consent acknowledgements before submitting.
                    </p>
                    <p className="text-xs text-amber-600 font-medium">
                        Please ensure all consent checkboxes are checked. You can only submit once every 5 minutes.
                    </p>
                    {submitSuccess && (
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs text-green-600 font-medium"
                        >
                            Form submitted successfully!
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

                <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        className={cn(
                            "flex items-center justify-center gap-2 bg-white text-secondary border border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold uppercase text-xs sm:text-sm tracking-wide transition-all hover:bg-gray-50 active:scale-[0.98] whitespace-nowrap",
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
                            "flex items-center justify-center gap-2 bg-primary text-white border-2 border-primary px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold uppercase text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.98] whitespace-nowrap",
                            isSubmitting || submitSuccess
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:bg-transparent hover:text-primary"
                        )}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </>
                        ) : submitSuccess ? (
                            "Submitted"
                        ) : (
                            "Submit Form"
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default HealthWellnessConsentForm;

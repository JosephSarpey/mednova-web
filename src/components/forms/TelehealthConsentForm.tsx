"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, User, Phone, Mail, MapPin, ShieldCheck, AlertCircle, Video, FileText } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

const TelehealthConsentForm = () => {
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
        // Consent checkboxes
        understandNature: false,
        understandRisks: false,
        understandConfidentiality: false,
        understandRightToWithdraw: false,
        understandTechnical: false,
        understandRecording: false,
        consentToTelehealth: false,
        // Additional
        preferredPlatform: "",
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
        setFormRefID(`MN-TH-${Math.random().toString(36).substring(7).toUpperCase()}`);
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
            doc.text("TELEHEALTH INTERVENTION", pageWidth - 20, yPos, { align: "right" });
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
            doc.text("Patient Information", 20, yPos);
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

            // Consent Section
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(12, 43, 75);
            doc.text("Consent Acknowledgements", 20, yPos);
            yPos += 10;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            const consentItems = [
                { label: "Understanding of Telehealth Nature", value: formData.understandNature },
                { label: "Understanding of Risks & Benefits", value: formData.understandRisks },
                { label: "Understanding of Confidentiality", value: formData.understandConfidentiality },
                { label: "Right to Withdraw Consent", value: formData.understandRightToWithdraw },
                { label: "Understanding of Technical Requirements", value: formData.understandTechnical },
                { label: "Understanding of Recording Policy", value: formData.understandRecording },
                { label: "Consent to Telehealth Services", value: formData.consentToTelehealth },
            ];

            consentItems.forEach((item) => {
                if (yPos > 260) { doc.addPage(); yPos = 20; }
                const checkMark = item.value ? "☑" : "☐";
                doc.setFont("helvetica", "normal");
                doc.text(`${checkMark}  ${item.label}`, 20, yPos);
                yPos += 7;
            });

            yPos += 5;
            addField("Preferred Platform:", formData.preferredPlatform || "N/A", leftColX, yPos, 45);
            yPos += 8;

            if (formData.additionalNotes) {
                doc.setFont("helvetica", "bold");
                doc.text("Additional Notes:", 20, yPos);
                yPos += 6;
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                const noteLines = doc.splitTextToSize(formData.additionalNotes, pageWidth - 40);
                doc.text(noteLines, 20, yPos);
                yPos += noteLines.length * 5 + 5;
                doc.setTextColor(0, 0, 0);
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
                "I hereby voluntarily consent to participate in telehealth interventions provided by Mednova+ Inc. I have read and understood the nature, risks, benefits, and limitations of telehealth services. I understand that I may withdraw my consent at any time.",
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
            doc.text("Patient Signature", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            const pageCount = (doc.internal as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Generated on: ${currentDate}`, 20, 287);
                doc.text(`Ref: ${formRefID} | Page ${i} of ${pageCount}`, pageWidth - 20, 287, { align: "right" });
            }

            doc.save(`Telehealth_Consent_${formData.fullName.replace(/\s+/g, "_") || "Submission"}.pdf`);
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

        if (!formData.consentToTelehealth) {
            setSubmitError("You must consent to telehealth services to submit this form.");
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        const lastSubmitTime = localStorage.getItem("thConsentLastSubmit");
        if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < 300000) {
            setSubmitError("Please wait 5 minutes before submitting again.");
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const formspreeEndpoint = process.env.NEXT_PUBLIC_TELEHEALTH_CONSENT_ENDPOINT || "https://formspree.io/f/example";

        try {
            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    "Form Type": "Telehealth Intervention Informed Consent",
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
                    "Understands Nature of Telehealth": formData.understandNature ? "Yes" : "No",
                    "Understands Risks & Benefits": formData.understandRisks ? "Yes" : "No",
                    "Understands Confidentiality": formData.understandConfidentiality ? "Yes" : "No",
                    "Understands Right to Withdraw": formData.understandRightToWithdraw ? "Yes" : "No",
                    "Understands Technical Requirements": formData.understandTechnical ? "Yes" : "No",
                    "Understands Recording Policy": formData.understandRecording ? "Yes" : "No",
                    "Consents to Telehealth": formData.consentToTelehealth ? "Yes" : "No",
                    "Preferred Platform": formData.preferredPlatform,
                    "Additional Notes": formData.additionalNotes,
                    "Signature Text": formData.signatureText,
                }),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                localStorage.setItem("thConsentLastSubmit", Date.now().toString());
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
                            Telehealth Intervention Informed Consent
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Please review and complete the consent form below.
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Telehealth Information Banner */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6">
                        <div className="flex items-start gap-3">
                            <Video className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-secondary mb-2">About Telehealth Services</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Telehealth involves the use of electronic communications to enable healthcare providers to deliver
                                    medical services remotely. This includes but is not limited to video consultations, phone calls,
                                    messaging, and remote monitoring. By signing this form, you consent to receive healthcare services
                                    via telehealth technology.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-primary pl-3">
                            <User className="w-5 h-5 text-primary" /> Patient Information
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

                    {/* Consent Acknowledgements */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-mednova-green pl-3">
                            <ShieldCheck className="w-5 h-5 text-mednova-green" /> Consent Acknowledgements
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandNature"
                                        checked={formData.understandNature}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that telehealth involves the use of electronic communications to enable healthcare providers at different locations to share individual patient medical information for the purpose of improving patient care.
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
                                        I understand the potential risks associated with telehealth, including but not limited to: interruptions, delays, unauthorized access, and the possibility that the electronic systems may not work as intended.
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
                                        I understand that all patient information during telehealth consultations will remain confidential and will be handled in accordance with applicable healthcare privacy regulations.
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
                                        I understand that I have the right to withdraw my consent and discontinue telehealth services at any time without affecting my right to future care or treatment.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandTechnical"
                                        checked={formData.understandTechnical}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that I am responsible for providing the necessary equipment and internet connection for the telehealth session and ensuring a private environment during consultations.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="understandRecording"
                                        checked={formData.understandRecording}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        I understand that the telehealth session will not be recorded without my explicit consent, and I agree not to record the session without the provider&apos;s consent.
                                    </span>
                                </label>
                            </div>

                            <div className="bg-primary/5 p-5 rounded-xl border border-primary/20">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="consentToTelehealth"
                                        checked={formData.consentToTelehealth}
                                        onChange={handleInputChange}
                                        className="mt-1 accent-primary w-5 h-5"
                                    />
                                    <span className="text-sm font-semibold text-secondary leading-relaxed">
                                        I hereby consent to participate in telehealth interventions provided by Mednova+ Inc. I have read,
                                        understood, and agree to all conditions stated above. <span className="text-red-500">*</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Preferred Platform & Notes */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-secondary pl-3">
                            <FileText className="w-5 h-5 text-secondary" /> Additional Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Preferred Telehealth Platform</label>
                                <select
                                    name="preferredPlatform"
                                    value={formData.preferredPlatform}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                >
                                    <option value="">Select a platform</option>
                                    <option value="zoom">Zoom</option>
                                    <option value="google-meet">Google Meet</option>
                                    <option value="whatsapp-video">WhatsApp Video</option>
                                    <option value="phone-call">Phone Call</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
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
                                placeholder="Any additional information, concerns, or questions you'd like to share..."
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
                        <AlertCircle className="w-3 h-3" /> Confirmed by Patient Signature
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

export default TelehealthConsentForm;

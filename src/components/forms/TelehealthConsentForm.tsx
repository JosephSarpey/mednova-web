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
        // Client info
        clientName: "",
        providerName: "",
        email: "",
        phone: "",
        country: "",
        // Consent acknowledgements (7 items from the document)
        consentWithdraw: false,
        consentRisks: false,
        consentNoRecording: false,
        consentPrivacy: false,
        consentCrisis: false,
        consentTechnical: false,
        consentEmergencyContact: false,
        // Emergency Protocols
        emergencyLocation: "",
        emergencyContactName: "",
        emergencyContactAddress: "",
        emergencyContactPhone: "",
        // Signature
        signatureText: "",
        guardianSignature: "",
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
            doc.text("TELEHEALTH/REMOTE HEALTH", pageWidth - 20, yPos, { align: "right" });
            doc.text("INFORMED CONSENT", pageWidth - 20, yPos + 6, { align: "right" });

            yPos += 18;
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            // Opening Statement
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            const openingText = `I, ${formData.clientName || "_______________"}, hereby consent to participate in telehealth with ${formData.providerName || "_______________"} as part of my healthcare or medical intervention plan needs. I confirm to being in ${formData.country || "Ghana"}, Ghanaian or other country other than the United States. I understand that telehealth is the practice of delivering clinical health care services via technology assisted media or other electronic means between a practitioner and a client who are located in two different locations.`;
            const openingLines = doc.splitTextToSize(openingText, pageWidth - 40);
            doc.text(openingLines, 20, yPos);
            yPos += openingLines.length * 5 + 5;

            // Consent items
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(12, 43, 75);
            doc.text("I understand the following with respect to telehealth:", 20, yPos);
            yPos += 8;

            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);

            const consentItems = [
                { num: "1", text: "I understand that I have the right to withdraw consent at any time without affecting my right to future care, services, or program benefits to which I would otherwise be entitled.", checked: formData.consentWithdraw },
                { num: "2", text: "I understand that there are risk and consequences associated with telehealth medical or healthcare, including but not limited to, disruption of transmission by technology failures, interruption and/or breaches of confidentiality by unauthorized persons, and/or limited ability to respond to emergencies.", checked: formData.consentRisks },
                { num: "3", text: "I understand that there will be no recording of any of the online therapeutic or health coaching sessions by either party. All information disclosed within sessions and written records pertaining to those sessions are confidential and may not be disclosed to anyone without written authorization, except where permitted and/or required by law.", checked: formData.consentNoRecording },
                { num: "4", text: "I understand that the privacy laws that protect the confidentiality of my protected health information (PHI) also apply to telehealth care unless an exception to confidentiality applies (i.e. mandatory reporting of child, elder, or vulnerable adult abuse; danger to self or others).", checked: formData.consentPrivacy },
                { num: "5", text: "I understand that if I am having suicidal or homicidal thoughts or medical/health emergency, actively experiencing psychotic symptoms or experiencing a mental health crisis that cannot be resolved remotely, it may be determined that telehealth services are not appropriate and a higher level of care is required.", checked: formData.consentCrisis },
                { num: "6", text: "I understand that during a telehealth session, we could encounter technical difficulties resulting in service interruptions. If this occurs, end and restart the session. If unable to reconnect within fifteen minutes, please call Dr. Arthur (+233(0) 246831417) or Dr. P. Edem Nukunu (+19144383914) to discuss rescheduling.", checked: formData.consentTechnical },
                { num: "7", text: "I understand that my healthcare provider may need to contact my emergency contact and/or appropriate authorities in case of an emergency.", checked: formData.consentEmergencyContact },
            ];

            consentItems.forEach((item) => {
                if (yPos > 255) { doc.addPage(); yPos = 20; }
                const checkMark = item.checked ? "☑" : "☐";
                doc.setFont("helvetica", "normal");
                const lines = doc.splitTextToSize(`${checkMark} ${item.num}) ${item.text}`, pageWidth - 40);
                doc.text(lines, 20, yPos);
                yPos += lines.length * 4.5 + 3;
            });

            // Emergency Protocols
            if (yPos > 230) { doc.addPage(); yPos = 20; }
            yPos += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(12, 43, 75);
            doc.text("Emergency Protocols", 20, yPos);
            yPos += 8;

            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
            const emergencyIntro = "I need to know your location in case of an emergency. You agree to inform me of the address where you are at the beginning of each meeting. I also need a contact person who I may contact on your behalf in a life-threatening emergency only.";
            const emergencyLines = doc.splitTextToSize(emergencyIntro, pageWidth - 40);
            doc.text(emergencyLines, 20, yPos);
            yPos += emergencyLines.length * 5 + 5;

            const addField = (label: string, value: string, x: number, y: number, valueOffsetX = 45) => {
                doc.setFont("helvetica", "bold");
                doc.text(label, x, y);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                doc.text(value || "N/A", x + valueOffsetX, y);
                doc.setTextColor(0, 0, 0);
            };

            addField("Emergency Location:", formData.emergencyLocation, 20, yPos, 45);
            yPos += 8;
            addField("Contact Name:", formData.emergencyContactName, 20, yPos, 45);
            yPos += 8;
            addField("Contact Address:", formData.emergencyContactAddress, 20, yPos, 45);
            yPos += 8;
            addField("Contact Phone:", formData.emergencyContactPhone, 20, yPos, 45);

            // Declaration
            yPos += 15;
            if (yPos > 240) { doc.addPage(); yPos = 20; }

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const decLines = doc.splitTextToSize(
                "I have read the information provided above and discussed it with my therapist/practitioner. I understand the information contained in this form and all of my questions have been answered to my satisfaction.",
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
            doc.text("Signature of Client/Parent/Legal Guardian", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            yPos += 15;
            if (yPos > 260) { doc.addPage(); yPos = 20; }
            doc.line(20, yPos, 80, yPos);
            doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
            yPos += 5;
            doc.text("Signature of Practitioner/Therapist", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            const pageCount = (doc.internal as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Generated on: ${currentDate}`, 20, 287);
                doc.text(`Ref: ${formRefID} | Page ${i} of ${pageCount}`, pageWidth - 20, 287, { align: "right" });
            }

            doc.save(`Telehealth_Consent_${formData.clientName.replace(/\s+/g, "_") || "Submission"}.pdf`);
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("There was an issue generating the PDF.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requiredFields = ["clientName", "email", "phone"];
        const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            setSubmitError(`Please fill in all required fields: ${missingFields.join(", ")}`);
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        const allConsented = formData.consentWithdraw && formData.consentRisks && formData.consentNoRecording &&
            formData.consentPrivacy && formData.consentCrisis && formData.consentTechnical && formData.consentEmergencyContact;

        if (!allConsented) {
            setSubmitError("You must acknowledge all consent items to submit this form.");
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
                    "Form Type": "Telehealth/Remote Health Informed Consent",
                    "Reference ID": formRefID,
                    "Generated Date": currentDate,
                    "Client Name": formData.clientName,
                    "Provider Name": formData.providerName,
                    "Email": formData.email,
                    "Phone": formData.phone,
                    "Country": formData.country,
                    "Consent - Right to Withdraw": formData.consentWithdraw ? "Yes" : "No",
                    "Consent - Risks Acknowledged": formData.consentRisks ? "Yes" : "No",
                    "Consent - No Recording": formData.consentNoRecording ? "Yes" : "No",
                    "Consent - Privacy/PHI": formData.consentPrivacy ? "Yes" : "No",
                    "Consent - Crisis Protocol": formData.consentCrisis ? "Yes" : "No",
                    "Consent - Technical Difficulties": formData.consentTechnical ? "Yes" : "No",
                    "Consent - Emergency Contact Auth": formData.consentEmergencyContact ? "Yes" : "No",
                    "Emergency Location": formData.emergencyLocation,
                    "Emergency Contact Name": formData.emergencyContactName,
                    "Emergency Contact Address": formData.emergencyContactAddress,
                    "Emergency Contact Phone": formData.emergencyContactPhone,
                    "Client Signature": formData.signatureText,
                    "Guardian Signature": formData.guardianSignature,
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
                        <h1 className="text-xl sm:text-2xl font-bold text-secondary uppercase tracking-tight">
                            Telehealth/Remote Health Informed Consent
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Please review and complete the consent form below.
                        </p>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* Opening Statement Banner */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6">
                        <div className="flex items-start gap-3">
                            <Video className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                I understand that telehealth is the practice of delivering clinical health care services via
                                technology assisted media or other electronic means between a practitioner and a client who
                                are located in two different locations. I confirm to being in Ghana, Ghanaian or other country
                                other than the United States.
                            </p>
                        </div>
                    </div>

                    {/* Client & Provider Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-primary pl-3">
                            <User className="w-5 h-5 text-primary" /> Client &amp; Provider Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Name of Client <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    placeholder="Full name of client"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Name of Provider
                                </label>
                                <input
                                    type="text"
                                    name="providerName"
                                    value={formData.providerName}
                                    onChange={handleInputChange}
                                    placeholder="Name of healthcare provider"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
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
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Country of Residence
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Ghana"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Consent Acknowledgements — 7 items from the document */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-mednova-green pl-3">
                            <ShieldCheck className="w-5 h-5 text-mednova-green" /> Consent Acknowledgements
                        </h3>
                        <p className="text-sm text-muted-foreground">I understand the following with respect to telehealth:</p>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl space-y-5">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" name="consentWithdraw" checked={formData.consentWithdraw} onChange={handleInputChange} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        <strong>1)</strong> I understand that I have the right to withdraw consent at any time without affecting my right to future care, services, or program benefits to which I would otherwise be entitled.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" name="consentRisks" checked={formData.consentRisks} onChange={handleInputChange} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        <strong>2)</strong> I understand that there are risk and consequences associated with telehealth medical or healthcare, including but not limited to, disruption of transmission by technology failures, interruption and/or breaches of confidentiality by unauthorized persons, and/or limited ability to respond to emergencies.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" name="consentNoRecording" checked={formData.consentNoRecording} onChange={handleInputChange} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        <strong>3)</strong> I understand that there will be no recording of any of the online therapeutic or health coaching sessions or meet-up by either party. All information disclosed within sessions or during care conversation and written records pertaining to those health coaching or care sessions are confidential and may not be disclosed to anyone without written authorization, except where the disclosure is permitted and/or required by law.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" name="consentPrivacy" checked={formData.consentPrivacy} onChange={handleInputChange} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        <strong>4)</strong> I understand that the privacy laws that protect the confidentiality of my protected health information (PHI) also apply to telehealth care unless an exception to confidentiality applies (i.e. mandatory reporting of child, elder, or vulnerable adult abuse; danger to self or others; I raise mental/emotional/emergency health as an issue in a legal proceeding).
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" name="consentCrisis" checked={formData.consentCrisis} onChange={handleInputChange} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        <strong>5)</strong> I understand that if I am having suicidal or homicidal thoughts or medical/health emergency, actively experiencing psychotic symptoms or experiencing a mental health crisis or emergency that cannot be resolved remotely, it may be determined that telehealth services are not appropriate and a higher level of care is required.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" name="consentTechnical" checked={formData.consentTechnical} onChange={handleInputChange} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        <strong>6)</strong> I understand that during a telehealth session, we could encounter technical difficulties resulting in service interruptions. If this occurs, end and restart the session. If we are unable to reconnect within fifteen minutes, please call Dr. Arthur (+233(0) 246831417) or Dr. P. Edem Nukunu (+19144383914) to discuss since we may have to re-schedule.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" name="consentEmergencyContact" checked={formData.consentEmergencyContact} onChange={handleInputChange} className="mt-1 accent-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-secondary leading-relaxed">
                                        <strong>7)</strong> I understand that my healthcare provider may need to contact my emergency contact and/or appropriate authorities in case of an emergency.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Protocols */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-red-400 pl-3">
                            <AlertCircle className="w-5 h-5 text-red-400" /> Emergency Protocols
                        </h3>

                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 sm:p-5">
                            <p className="text-sm text-secondary leading-relaxed">
                                I need to know your location in case of an emergency. You agree to inform me of the address
                                where you are at the beginning of each meeting. I also need a contact person who I may contact
                                on your behalf in a <strong>life-threatening emergency only</strong>. This person will only be contacted
                                to go to your location or take you to the hospital in the event of an emergency.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    In case of an emergency, my location is:
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                    <textarea
                                        name="emergencyLocation"
                                        value={formData.emergencyLocation}
                                        onChange={handleInputChange}
                                        placeholder="Enter the address where you will be located during sessions"
                                        rows={2}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Emergency Contact Person&apos;s Name</label>
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleInputChange}
                                    placeholder="Full name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Emergency Contact Phone</label>
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

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">Emergency Contact Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                    <textarea
                                        name="emergencyContactAddress"
                                        value={formData.emergencyContactAddress}
                                        onChange={handleInputChange}
                                        placeholder="Address of emergency contact person"
                                        rows={2}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Declaration & Signature */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-secondary pl-3">
                            <FileText className="w-5 h-5 text-secondary" /> Declaration &amp; Signature
                        </h3>

                        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
                            <p className="text-sm text-secondary leading-relaxed">
                                I have read the information provided above and discussed it with my therapist. I understand
                                the information contained in this form and all of my questions have been answered to my satisfaction.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Signature of Client/Parent/Legal Guardian <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="signatureText"
                                    value={formData.signatureText}
                                    onChange={handleInputChange}
                                    placeholder="Type your full legal name as signature"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all italic"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Guardian Signature (if applicable)
                                </label>
                                <input
                                    type="text"
                                    name="guardianSignature"
                                    value={formData.guardianSignature}
                                    onChange={handleInputChange}
                                    placeholder="If client is a minor, guardian's full name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all italic"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between text-[10px] text-muted-foreground uppercase tracking-widest gap-4">
                    <div>Generated on: {isMounted ? currentDate : "---"}</div>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Confirmed by Client Signature
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
                        <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-green-600 font-medium">
                            Form submitted successfully!
                        </motion.p>
                    )}
                    {submitError && (
                        <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-red-600 font-medium">
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

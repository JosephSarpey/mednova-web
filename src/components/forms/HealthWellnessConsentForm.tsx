"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, User, Phone, Mail, MapPin, ShieldCheck, AlertCircle, HeartPulse, FileText, Clock, DollarSign, Scale, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

const HealthWellnessConsentForm = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        // Client info
        clientName: "",
        email: "",
        phone: "",
        // Consent acknowledgements per section
        consentHolisticCare: false,
        consentProfessionalStatement: false,
        consentPractitioner: false,
        consentAppointments: false,
        consentSessions: false,
        consentProfessionalRelationship: false,
        consentGoals: false,
        consentConfidentiality: false,
        consentDutyToWarn: false,
        consentRisks: false,
        consentFees: false,
        consentEmergencies: false,
        consentMinors: false,
        consentGeneral: false,
        // Emergency contact
        emergencyContactName: "",
        emergencyContactPhone: "",
        // Signatures
        signatureText: "",
        practitionerName: "",
        guardianName: "",
        guardianSignature: "",
        // Is minor
        isMinor: false,
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

    // Disclosure sections data
    const disclosureSections = [
        {
            id: "consentHolisticCare",
            title: "Holistic Medical Care & Lifestyle Healthcare Services",
            content: "MedNova recognizes that seeking support for your overall health and well-being can feel challenging. We are here to help you understand your current health patterns, emotions, and lifestyle habits so you can move toward genuine healing, balance, and sustainable wellness. Our Holistic Practitioners will partner with you to support greater health and wholeness through personalized lifestyle medicine, integrative health coaching, nutrition guidance, movement therapy, stress management, mindfulness practices, and other evidence-based holistic approaches. Care is delivered within a biopsychosocial framework and is always tailored to your individual beliefs, values, and goals. No personal theology or belief system is ever imposed. All services are grounded in proven research, clinical practicality, and scientific integrity.",
        },
        {
            id: "consentProfessionalStatement",
            title: "Professional Statement",
            content: "People who seek holistic medical intervention or medical care and lifestyle care want to feel better in body, mind, and spirit. They recognize that their physical health, emotional balance, relationships, or daily habits could be improved. They choose this collaborative approach to enhance vitality, adopt healthier routines, resolve persistent health concerns, improve mood and resilience, strengthen relationships with self and others, and deepen self-understanding. Our core techniques align with the six pillars of lifestyle medicine: nutrition, physical activity, restorative sleep, stress management, avoidance of risky substances, and positive social connections. Holistic health and wellness, including any medical intervention interaction, provide a safe, non-judgmental space to explore your health needs, feelings, and lifestyle patterns while receiving professional guidance and support towards your overall wellbeing and health specific needs.",
        },
        {
            id: "consentPractitioner",
            title: "Practitioner",
            content: "Your Holistic Practitioner and/or your Healthcare provider is a trained professional who provides integrative health, Primary Medical care and lifestyle medicine services. The Practitioner will discuss with you the assessment process, personalized wellness plan, recommended approaches, possible benefits and side effects (if any), and any alternative options. You may withdraw from care at any time; we simply ask that you discuss this with your Practitioner first.",
        },
        {
            id: "consentAppointments",
            title: "Appointments and Cancellations",
            content: "Once your Client Intake form is completed, your Practitioner will contact you to schedule your first session (usually an in-depth medical/health assessment). Appointments are available Monday–Friday between 8:00 am and 6:00 pm UTC (6:00 p.m. Accra time). Weekend sessions (in-person or telehealth) can be arranged when mutually convenient. Telehealth services are available seven days a week per agreed schedule. Please cancel or reschedule at least 24 hours in advance. Missed appointments without 24-hour notice will be charged at the full session rate and noted on your record. Third-party payers generally do not reimburse for missed sessions.",
        },
        {
            id: "consentSessions",
            title: "Number and Length of Sessions",
            content: "The number of sessions required varies according to your unique goals and progress; this will be discussed openly with you. Each session is scheduled for 45 minutes of active care plus 15 minutes for documentation and planning (60 minutes total). A minimum commitment of 7 sessions is recommended for all new clients to allow meaningful lifestyle transformation. Session length and frequency may be adjusted as your needs evolve.",
        },
        {
            id: "consentProfessionalRelationship",
            title: "Professional Relationship",
            content: "Your relationship with your Practitioner is strictly professional and therapeutic. To protect the integrity and effectiveness of care, no social, business, or intimate relationship is permitted while you are receiving services. Bartering or exchanging services is not appropriate. You are encouraged to share openly and sensitively, knowing that complete confidentiality and professional boundaries are maintained at all times.",
        },
        {
            id: "consentGoals",
            title: "Goals, Purposes, and Techniques of Care",
            content: "Multiple holistic health approaches (nutrition, movement, sleep optimization, stress reduction, mindfulness, supplements where appropriate, and behavioral change strategies) and Medical or Integrative medicine may be used to address your goals. You are encouraged to ask questions and actively participate in setting and refining your wellness goals. Goals may evolve naturally as you progress.",
        },
        {
            id: "consentConfidentiality",
            title: "Confidentiality",
            content: "All discussions and records are strictly confidential. No information will be released without your written consent (via email, SMS, or signed form) unless required by law. Exceptions include situations where there is a duty to protect life or prevent serious harm, fee disputes, or legal proceedings initiated by you. Your Practitioner adheres to the Ethical Codes and standards of Ghana (or the country of operation), the World Health Organization's International Code of Medical Ethics, the Ghana Data Protection Act 2012 (Act 843), and any applicable HIPAA-equivalent standards for telehealth. By signing this form, you consent to the sharing of necessary information with your approved referring agency, employer-sponsored wellness program, or insurance carrier (if applicable) for coordination of care and payment.",
        },
        {
            id: "consentDutyToWarn",
            title: "Duty to Warn / Safety",
            content: "If your Practitioner reasonably believes you are at risk of harm to yourself or others, you consent to the Practitioner contacting appropriate individuals (including emergency contacts, family, law enforcement, or medical personnel) to prevent harm. This authorization ends upon termination of services. You may revoke this authorization in writing at any time, subject to legal limitations.",
        },
        {
            id: "consentRisks",
            title: "Risks of Treatment",
            content: "True healthy change involves examining habits, beliefs, and patterns that may feel uncomfortable. Clients sometimes experience temporary emotional discomfort, fatigue, or adjustment reactions as old patterns are released and new healthier ones are formed. Success depends on the collaborative effort between you and your Practitioner and on your willingness to implement lifestyle changes or effect treatment outcome.",
        },
        {
            id: "consentFees",
            title: "Fees & Payment for Services",
            content: "Fee for service/care shall be issued based on invoice. A minimum of one preliminary or first-aid visit applies to all new cases. You agree to pay the agreed fee for care, treatment, or intervention plan. The same rate applies to both in-person and telehealth sessions. Payment may be covered directly by you or your employer/institution (if applicable). If your employer or insurance does not cover services, you are fully responsible for the fee. You are expected to be available at the scheduled time. If you miss a session without 24-hour notice, you remain responsible for the full fee.",
        },
        {
            id: "consentEmergencies",
            title: "After-Hour Emergencies and General Emergencies",
            content: "We notify that for now, MedNova Ghana does not provide emergency services. For psychiatric, medical, or life-threatening emergencies outside business hours, please contact your local emergency services, National Ambulance Service, National Suicide Prevention line (where available), or immediately visit the nearest hospital. During telehealth sessions, your Practitioner will confirm your location and emergency contact at the start of each session. If the telehealth connection fails during a crisis, do not attempt to reconnect with your Practitioner—contact emergency services immediately.",
        },
        {
            id: "consentMinors",
            title: "Therapy / Care for Minors (under 18 years)",
            content: "If the client is under 18, written permission and contact information from a parent or legal guardian are required.",
        },
        {
            id: "consentGeneral",
            title: "General Consent for Care",
            content: "You have the right to be fully informed about your recommended holistic medical or lifestyle plan and to ask questions before any procedure or intervention. No specific treatment plan has yet been finalized—this consent allows us to perform the necessary evaluation and initial care. By signing below, you confirm that: (1) this consent remains in effect throughout your care unless revoked in writing, and (2) you consent to treatment at MedNova's main location, satellite offices, or via telehealth. You retain the right to discontinue services or discuss any recommended test, procedure, or lifestyle intervention with your Practitioner at any time.",
        },
    ];

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
            doc.setFontSize(10);
            doc.setTextColor(19, 162, 183);
            doc.text("DISCLOSURE STATEMENT AND GENERAL", pageWidth - 20, yPos, { align: "right" });
            doc.text("INFORMED CONSENT FOR HEALTHCARE", pageWidth - 20, yPos + 5, { align: "right" });
            doc.text("Doc No.: MN/03/26", pageWidth - 20, yPos + 10, { align: "right" });

            yPos += 20;
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 8;

            // Client Info
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(`Client: ${formData.clientName || "N/A"}`, 20, yPos);
            doc.text(`Email: ${formData.email || "N/A"}`, pageWidth / 2, yPos);
            yPos += 6;
            doc.text(`Phone: ${formData.phone || "N/A"}`, 20, yPos);
            doc.text(`Date: ${currentDate}`, pageWidth / 2, yPos);
            yPos += 10;

            // Disclosure Sections
            disclosureSections.forEach((section) => {
                if (yPos > 250) { doc.addPage(); yPos = 20; }
                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);
                doc.setTextColor(12, 43, 75);
                doc.text(section.title, 20, yPos);
                yPos += 6;

                doc.setFont("helvetica", "normal");
                doc.setFontSize(8);
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(section.content, pageWidth - 40);
                lines.forEach((line: string) => {
                    if (yPos > 278) { doc.addPage(); yPos = 20; }
                    doc.text(line, 20, yPos);
                    yPos += 4;
                });

                const checked = formData[section.id as keyof typeof formData] as boolean;
                const checkMark = checked ? "☑ Acknowledged" : "☐ Not acknowledged";
                doc.setFont("helvetica", "bold");
                doc.setFontSize(8);
                doc.setTextColor(19, 162, 183);
                doc.text(checkMark, 20, yPos + 2);
                yPos += 8;
            });

            // Emergency Contact
            if (yPos > 240) { doc.addPage(); yPos = 20; }
            yPos += 5;
            doc.setDrawColor(220, 220, 220);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 8;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(12, 43, 75);
            doc.text("In the Event of a Crisis/Emergency", 20, yPos);
            yPos += 8;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(`Emergency Contact: ${formData.emergencyContactName || "N/A"}`, 20, yPos);
            yPos += 6;
            doc.text(`Phone: ${formData.emergencyContactPhone || "N/A"}`, 20, yPos);
            yPos += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(60, 60, 60);
            const authText = "My signature below indicates my consent for MedNova and/or the assigned health provider to contact the individual noted above only in the event of a crisis or emergency.";
            const authLines = doc.splitTextToSize(authText, pageWidth - 40);
            doc.text(authLines, 20, yPos);
            yPos += authLines.length * 4 + 8;

            // Signatures
            if (yPos > 250) { doc.addPage(); yPos = 20; }
            doc.setDrawColor(220, 220, 220);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 8;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(12, 43, 75);
            doc.text("Client Acknowledgment and Signature", 20, yPos);
            yPos += 8;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(60, 60, 60);
            const ackText = `I, ${formData.clientName || "_______________"}, voluntarily request a Holistic Practitioner or medical practitioner to perform reasonable and necessary holistic assessments, lifestyle coaching, integrative interventions, and treatment for the concerns that have brought me to MedNova Health. I have read, understood, and consent fully and voluntarily to all statements, procedures, and policies outlined in this document (Doc No.: MN/03/26).`;
            const ackLines = doc.splitTextToSize(ackText, pageWidth - 40);
            doc.text(ackLines, 20, yPos);
            yPos += ackLines.length * 4 + 10;

            if (yPos > 260) { doc.addPage(); yPos = 20; }
            doc.setDrawColor(0, 0, 0);
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            if (formData.signatureText) {
                doc.setFont("helvetica", "italic");
                doc.text(`Client Signature: ${formData.signatureText}`, 20, yPos);
                yPos += 8;
            }
            doc.setFont("helvetica", "normal");
            doc.line(20, yPos, 80, yPos);
            doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
            yPos += 5;
            doc.text("Client Signature", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            yPos += 12;
            if (yPos > 265) { doc.addPage(); yPos = 20; }
            doc.line(20, yPos, 80, yPos);
            doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
            yPos += 5;
            doc.text("Practitioner Signature", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            if (formData.isMinor && formData.guardianSignature) {
                yPos += 12;
                if (yPos > 265) { doc.addPage(); yPos = 20; }
                doc.setFont("helvetica", "italic");
                doc.text(`Guardian: ${formData.guardianSignature}`, 20, yPos);
                yPos += 8;
                doc.setFont("helvetica", "normal");
                doc.line(20, yPos, 80, yPos);
                doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
                yPos += 5;
                doc.text("Guardian/Legal Representative Signature", 20, yPos);
                doc.text("Date", pageWidth - 80, yPos);
            }

            const pageCount = (doc.internal as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Generated on: ${currentDate}`, 20, 287);
                doc.text(`Ref: ${formRefID} | Doc No.: MN/03/26 | Page ${i} of ${pageCount}`, pageWidth - 20, 287, { align: "right" });
            }

            doc.save(`Health_Wellness_Consent_${formData.clientName.replace(/\s+/g, "_") || "Submission"}.pdf`);
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

        if (!formData.consentGeneral) {
            setSubmitError("You must acknowledge the General Consent for Care section to submit.");
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
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    "Form Type": "Disclosure Statement & General Informed Consent (Doc No.: MN/03/26)",
                    "Reference ID": formRefID,
                    "Generated Date": currentDate,
                    "Client Name": formData.clientName,
                    "Email": formData.email,
                    "Phone": formData.phone,
                    "Consent - Holistic Care": formData.consentHolisticCare ? "Yes" : "No",
                    "Consent - Professional Statement": formData.consentProfessionalStatement ? "Yes" : "No",
                    "Consent - Practitioner": formData.consentPractitioner ? "Yes" : "No",
                    "Consent - Appointments": formData.consentAppointments ? "Yes" : "No",
                    "Consent - Sessions": formData.consentSessions ? "Yes" : "No",
                    "Consent - Professional Relationship": formData.consentProfessionalRelationship ? "Yes" : "No",
                    "Consent - Goals & Techniques": formData.consentGoals ? "Yes" : "No",
                    "Consent - Confidentiality": formData.consentConfidentiality ? "Yes" : "No",
                    "Consent - Duty to Warn": formData.consentDutyToWarn ? "Yes" : "No",
                    "Consent - Risks": formData.consentRisks ? "Yes" : "No",
                    "Consent - Fees": formData.consentFees ? "Yes" : "No",
                    "Consent - Emergencies": formData.consentEmergencies ? "Yes" : "No",
                    "Consent - Minors": formData.consentMinors ? "Yes" : "No",
                    "Consent - General": formData.consentGeneral ? "Yes" : "No",
                    "Emergency Contact Name": formData.emergencyContactName,
                    "Emergency Contact Phone": formData.emergencyContactPhone,
                    "Client Signature": formData.signatureText,
                    "Practitioner Name": formData.practitionerName,
                    "Is Minor": formData.isMinor ? "Yes" : "No",
                    "Guardian Name": formData.guardianName,
                    "Guardian Signature": formData.guardianSignature,
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
                        <h1 className="text-xl sm:text-2xl font-bold text-secondary uppercase tracking-tight">
                            Informed Consent &amp; Disclosure
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Healthcare/Treatment Service(s) — Doc No.: MN/03/26
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">Revised 01/2026</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Intro Banner */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-6">
                        <div className="flex items-start gap-3">
                            <HeartPulse className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-secondary mb-2">Informed Consent and Disclosure</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    This Informed Consent forms the general &ldquo;informed consent and disclosure&rdquo; document for
                                    MedNova Health and contains important information concerning the utilization of in-person and/or
                                    hybrid (in-person + remote telehealth) services. Please read each section carefully, acknowledge
                                    your understanding, and provide your signature at the bottom.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Client Information */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-primary pl-3">
                            <User className="w-5 h-5 text-primary" /> Client Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Printed Name of Client <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleInputChange}
                                    placeholder="Full legal name"
                                    required
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
                        </div>
                    </div>

                    {/* Disclosure Sections with Consent Checkboxes */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-mednova-green pl-3">
                            <BookOpen className="w-5 h-5 text-mednova-green" /> Disclosure &amp; Consent Sections
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Please read each section and check the box to acknowledge your understanding.
                        </p>

                        <div className="space-y-4">
                            {disclosureSections.map((section) => (
                                <div key={section.id} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                                    <div className="p-4 sm:p-5">
                                        <h4 className="font-semibold text-secondary text-sm mb-3">{section.title}</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                                            {section.content}
                                        </p>
                                        <label className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-lg border border-gray-100">
                                            <input
                                                type="checkbox"
                                                name={section.id}
                                                checked={formData[section.id as keyof typeof formData] as boolean}
                                                onChange={handleInputChange}
                                                className="accent-primary w-4 h-4 flex-shrink-0"
                                            />
                                            <span className="text-sm font-medium text-secondary">
                                                I have read and understand this section
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-red-400 pl-3">
                            <AlertCircle className="w-5 h-5 text-red-400" /> In the Event of a Crisis/Emergency
                        </h3>

                        <div className="bg-red-50 border border-red-100 rounded-xl p-4 sm:p-5">
                            <p className="text-sm text-secondary leading-relaxed">
                                My signature below indicates my consent for MedNova and/or the assigned health provider or
                                Dr. P. Edem Nukunu to contact the individual noted below <strong>only in the event of a crisis or emergency</strong>.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Emergency Contact Name &amp; Cell Phone Number</label>
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleInputChange}
                                    placeholder="Full name of emergency contact"
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
                        </div>
                    </div>

                    {/* Client Acknowledgment and Signature */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-secondary pl-3">
                            <FileText className="w-5 h-5 text-secondary" /> Client Acknowledgment &amp; Signature
                        </h3>

                        <div className="bg-emerald-50 rounded-xl p-4 sm:p-5 border border-emerald-200">
                            <p className="text-sm text-secondary leading-relaxed">
                                I, <strong>{formData.clientName || "_______________"}</strong>, voluntarily request a Holistic Practitioner
                                or medical practitioner (and any supporting mid-level providers or team members as needed) to perform
                                reasonable and necessary holistic assessments, lifestyle coaching, integrative interventions, and treatment
                                for the concerns that have brought me to MedNova Health. I have read, understood, and consent fully and
                                voluntarily to all statements, procedures, and policies outlined in this document (Doc No.: MN/03/26).
                                I understand that additional consent forms may be required for specific interventions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">
                                    Client Signature (type full name) <span className="text-red-500">*</span>
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
                                    Name of Designated Practitioner
                                </label>
                                <input
                                    type="text"
                                    name="practitionerName"
                                    value={formData.practitionerName}
                                    onChange={handleInputChange}
                                    placeholder="Practitioner's full name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Minor section */}
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
                            <label className="flex items-center gap-3 cursor-pointer mb-4">
                                <input
                                    type="checkbox"
                                    name="isMinor"
                                    checked={formData.isMinor}
                                    onChange={handleInputChange}
                                    className="accent-primary w-4 h-4"
                                />
                                <span className="text-sm font-medium text-secondary">
                                    The client is a minor (under 18 years)
                                </span>
                            </label>

                            {formData.isMinor && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">
                                            Guardian/Legal Representative Name
                                        </label>
                                        <input
                                            type="text"
                                            name="guardianName"
                                            value={formData.guardianName}
                                            onChange={handleInputChange}
                                            placeholder="Full name of parent/guardian"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">
                                            Guardian Signature (type full name)
                                        </label>
                                        <input
                                            type="text"
                                            name="guardianSignature"
                                            value={formData.guardianSignature}
                                            onChange={handleInputChange}
                                            placeholder="Type guardian's full legal name"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all italic"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between text-[10px] text-muted-foreground uppercase tracking-widest gap-4">
                    <div>Generated on: {isMounted ? currentDate : "---"}</div>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Doc No.: MN/03/26
                    </div>
                    <div>Ref: {isMounted ? formRefID : "---"}</div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">
                        Review all sections and provide your signature before submitting.
                    </p>
                    <p className="text-xs text-amber-600 font-medium">
                        A copy of this signed form will be provided to you for your records.
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

export default HealthWellnessConsentForm;

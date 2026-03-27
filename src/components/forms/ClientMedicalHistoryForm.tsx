"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, User, MapPin, ClipboardList, History, Pill, AlertCircle, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

const ClientMedicalHistoryForm = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        takeDrugs: "No",
        drugDetails: "",
        smokeOrDrink: "No",
        smokeDrinkDetails: "",
        frequency: "",
        underTreatment: "No",
        treatmentDetails: "",
        systemicDiseases: "No",
        systemicDiseasesDetails: "",
        psychologicalDisorder: "No",
        psychologicalDisorderDetails: "",
        surgicalHistory: "No",
        sexuallyActive: "No",
        sexualDysfunction: "",
        labTestLast5Years: "No",
        labTestDetails: "",
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
        setFormRefID(`MN-MH-${Math.random().toString(36).substring(7).toUpperCase()}`);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked ? "Yes" : "No" }));
        } else if (type === 'radio') {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
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

            // Header Content
            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.setTextColor(12, 43, 75); // Secondary color
            doc.text("MEDNOVA+", 20, yPos);

            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("Healthcare Excellence", 20, yPos + 6);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(19, 162, 183); // Primary color
            doc.text("CLIENT MEDICAL HISTORY SHEET", pageWidth - 20, yPos, { align: "right" });

            yPos += 15;

            // Draw a horizontal line
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            // Section: Personal Details
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(12, 43, 75);
            doc.text("Personal Details", 20, yPos);
            yPos += 10;

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            const leftColX = 20;
            const rightColX = pageWidth / 2 + 10;

            const addField = (label: string, value: string, x: number, y: number, valueOffsetX = 35) => {
                doc.setFont("helvetica", "bold");
                doc.text(label, x, y);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                doc.text(value || "N/A", x + valueOffsetX, y);
                doc.setTextColor(0, 0, 0);
            };

            addField("Full Name:", formData.fullName, leftColX, yPos);
            addField("Date of Birth:", formData.dateOfBirth, rightColX, yPos);
            yPos += 8;

            addField("Gender:", formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : "", leftColX, yPos);
            addField("Phone:", formData.phone, rightColX, yPos);
            yPos += 8;

            addField("Email:", formData.email, leftColX, yPos);
            yPos += 8;

            doc.setFont("helvetica", "bold");
            doc.text("Address:", leftColX, yPos);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(60, 60, 60);
            const addressLines = doc.splitTextToSize(formData.address || "N/A", pageWidth - leftColX - 35 - 20);
            doc.text(addressLines, leftColX + 35, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += (addressLines.length * 5) + 5;

            doc.setDrawColor(230, 230, 230);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            // Section: Medical History
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(12, 43, 75);
            doc.text("Medical History Analysis", 20, yPos);
            yPos += 10;

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);

            const addQuestion = (question: string, answer: string, details?: string) => {
                if (yPos > 260) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFont("helvetica", "bold");
                const qLines = doc.splitTextToSize(question, pageWidth - 40);
                doc.text(qLines, 20, yPos);
                yPos += (qLines.length * 5);
                
                doc.setFont("helvetica", "normal");
                doc.setTextColor(19, 162, 183);
                doc.text(`Answer: ${answer}`, 20, yPos);
                doc.setTextColor(0, 0, 0);
                yPos += 5;

                if (details) {
                    doc.setTextColor(60, 60, 60);
                    const dLines = doc.splitTextToSize(`Details: ${details}`, pageWidth - 40);
                    doc.text(dLines, 20, yPos);
                    yPos += (dLines.length * 5);
                    doc.setTextColor(0, 0, 0);
                }
                yPos += 3;
            };

            addQuestion("1. Do you take any form of drug or substance (including narcotics) currently?", formData.takeDrugs, formData.takeDrugs === "Yes" ? formData.drugDetails : "");
            addQuestion("2. Do you smoke or Drink alcohol?", formData.smokeOrDrink, formData.smokeOrDrink === "Yes" ? formData.smokeDrinkDetails : "");
            addQuestion("3. How many times or how often do you engage in such behavior?", formData.frequency || "N/A");
            addQuestion("4. Are you currently under any treatment for any medical condition other than psychological condition?", formData.underTreatment, formData.underTreatment === "Yes" ? formData.treatmentDetails : "");
            addQuestion("5. Are you currently diagnosed of any systemic diseases/medical condition?", formData.systemicDiseases, formData.systemicDiseases === "Yes" ? formData.systemicDiseasesDetails : "");
            addQuestion("6. Have you been diagnosed previously of any Psychological disorder?", formData.psychologicalDisorder, formData.psychologicalDisorder === "Yes" ? formData.psychologicalDisorderDetails : "");
            addQuestion("7. Do you have any surgical history?", formData.surgicalHistory);
            addQuestion("8. Are you sexually Active?", formData.sexuallyActive, formData.sexuallyActive === "No" ? `Sexual dysfunction details: ${formData.sexualDysfunction}` : "");
            addQuestion("9. Have you carried out any laboratory or diagnostic test for the last 5 years?", formData.labTestLast5Years, formData.labTestLast5Years === "Yes" ? formData.labTestDetails : "");

            if (yPos > 240) {
                doc.addPage();
                yPos = 20;
            } else {
                yPos += 10;
            }
            doc.setDrawColor(220, 220, 220);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Declaration:", 20, yPos);
            yPos += 6;
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            const decLines = doc.splitTextToSize("I hereby declare that the information provided above is true and accurate to the best of my knowledge. I understand that this information will be used solely for medical evaluation.", pageWidth - 40);
            doc.text(decLines, 20, yPos);
            yPos += (decLines.length * 5) + 20;

            if (yPos > 260) {
                doc.addPage();
                yPos = 20;
            }

            doc.setDrawColor(0, 0, 0);
            doc.line(20, yPos, 80, yPos);
            doc.line(pageWidth - 80, yPos, pageWidth - 20, yPos);
            yPos += 5;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text("Client Signature", 20, yPos);
            doc.text("Date", pageWidth - 80, yPos);

            const pageCount = (doc.internal as any).getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(`Generated on: ${currentDate}`, 20, 287);
                doc.text(`Ref: ${formRefID} | Page ${i} of ${pageCount}`, pageWidth - 20, 287, { align: "right" });
            }

            doc.save(`Medical_History_${formData.fullName.replace(/\s+/g, "_") || "Submission"}.pdf`);

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
        const requiredFields = ['fullName', 'email', 'phone'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            setSubmitError(`Please fill in all required fields: ${missingFields.join(', ')}`);
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        const lastSubmitTime = localStorage.getItem('mhFormLastSubmit');
        if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < 300000) {
            setSubmitError("Please wait 5 minutes before submitting again.");
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const formspreeEndpoint = process.env.NEXT_PUBLIC_CLIENTHISTORY_ENDPOINT || "https://formspree.io/f/example";

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "Form Type": "Client Medical History",
                    "Reference ID": formRefID,
                    "Generated Date": currentDate,
                    "Full Name": formData.fullName,
                    "Date of Birth": formData.dateOfBirth,
                    "Gender": formData.gender,
                    "Email": formData.email,
                    "Phone": formData.phone,
                    "Address": formData.address,
                    "Take Drugs/Substance": formData.takeDrugs,
                    "Drug Details": formData.drugDetails,
                    "Smoke/Drink": formData.smokeOrDrink,
                    "Smoke/Drink Details": formData.smokeDrinkDetails,
                    "Frequency": formData.frequency,
                    "Under Treatment": formData.underTreatment,
                    "Treatment Details": formData.treatmentDetails,
                    "Systemic Diseases": formData.systemicDiseases,
                    "Systemic Diseases Details": formData.systemicDiseasesDetails,
                    "Psychological Disorder": formData.psychologicalDisorder,
                    "Psychological Disorder Details": formData.psychologicalDisorderDetails,
                    "Surgical History": formData.surgicalHistory,
                    "Sexually Active": formData.sexuallyActive,
                    "Sexual Dysfunction": formData.sexualDysfunction,
                    "Lab Test Last 5 Years": formData.labTestLast5Years,
                    "Lab Test Details": formData.labTestDetails,
                })
            });

            if (response.ok) {
                setSubmitSuccess(true);
                localStorage.setItem('mhFormLastSubmit', Date.now().toString());
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
                        <h1 className="text-2xl font-bold text-secondary uppercase tracking-tight">Client Medical History</h1>
                        <p className="text-sm text-muted-foreground mt-1">Please fill in the details below accurately.</p>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Personal Details */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-primary pl-3">
                            <User className="w-5 h-5 text-primary" /> Personal Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Full Name <span className="text-red-500">*</span></label>
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
                                <label className="text-sm font-medium text-secondary ml-1">Email Address <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    < Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                                <label className="text-sm font-medium text-secondary ml-1">Phone Number <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    < Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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

                    {/* Medical Details */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-mednova-green pl-3">
                            <ClipboardList className="w-5 h-5 text-mednova-green" /> Medical History Analysis
                        </h3>

                        <div className="space-y-6">
                            {/* Question 1 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    1. Do you take any form of drug or substance (including narcotics) currently?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="takeDrugs" value="Yes" checked={formData.takeDrugs === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="takeDrugs" value="No" checked={formData.takeDrugs === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                                {formData.takeDrugs === "Yes" && (
                                    <input type="text" name="drugDetails" value={formData.drugDetails} onChange={handleInputChange} placeholder="If Yes, State..." className="w-full px-4 py-2 mt-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                )}
                            </div>

                            {/* Question 2 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    2. Do you smoke or Drink alcohol?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="smokeOrDrink" value="Yes" checked={formData.smokeOrDrink === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="smokeOrDrink" value="No" checked={formData.smokeOrDrink === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                                {formData.smokeOrDrink === "Yes" && (
                                    <input type="text" name="smokeDrinkDetails" value={formData.smokeDrinkDetails} onChange={handleInputChange} placeholder="If yes, state all that is applicable..." className="w-full px-4 py-2 mt-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                )}
                            </div>

                            {/* Question 3 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    3. How many times or how often do you engage in such behavior? (If applicable)
                                </label>
                                <input type="text" name="frequency" value={formData.frequency} onChange={handleInputChange} placeholder="Kindly state..." className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            {/* Question 4 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    4. Are you currently under any treatment for any medical condition other than psychological condition?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="underTreatment" value="Yes" checked={formData.underTreatment === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="underTreatment" value="No" checked={formData.underTreatment === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                                {formData.underTreatment === "Yes" && (
                                    <input type="text" name="treatmentDetails" value={formData.treatmentDetails} onChange={handleInputChange} placeholder="If Yes, State..." className="w-full px-4 py-2 mt-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                )}
                            </div>

                            {/* Question 5 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    5. Are you currently diagnosed of any systemic diseases/medical condition?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="systemicDiseases" value="Yes" checked={formData.systemicDiseases === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="systemicDiseases" value="No" checked={formData.systemicDiseases === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                                {formData.systemicDiseases === "Yes" && (
                                    <input type="text" name="systemicDiseasesDetails" value={formData.systemicDiseasesDetails} onChange={handleInputChange} placeholder="If yes, Please state..." className="w-full px-4 py-2 mt-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                )}
                            </div>

                            {/* Question 6 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    6. Have you been diagnosed previously of any Psychological disorder?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="psychologicalDisorder" value="Yes" checked={formData.psychologicalDisorder === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="psychologicalDisorder" value="No" checked={formData.psychologicalDisorder === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                                {formData.psychologicalDisorder === "Yes" && (
                                    <input type="text" name="psychologicalDisorderDetails" value={formData.psychologicalDisorderDetails} onChange={handleInputChange} placeholder="If Yes, State..." className="w-full px-4 py-2 mt-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                )}
                            </div>

                            {/* Question 7 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    7. Do you have any surgical history?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="surgicalHistory" value="Yes" checked={formData.surgicalHistory === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="surgicalHistory" value="No" checked={formData.surgicalHistory === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                            </div>

                            {/* Question 8 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    8. Are you sexually Active?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="sexuallyActive" value="Yes" checked={formData.sexuallyActive === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="sexuallyActive" value="No" checked={formData.sexuallyActive === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                                {formData.sexuallyActive === "No" && (
                                    <input type="text" name="sexualDysfunction" value={formData.sexualDysfunction} onChange={handleInputChange} placeholder="If No, Any known sexual dysfunction? Kindly state..." className="w-full px-4 py-2 mt-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                )}
                            </div>

                            {/* Question 9 */}
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <label className="text-sm font-medium text-secondary block">
                                    9. Have you carried out any laboratory or diagnostic test for the last 5 years?
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="labTestLast5Years" value="Yes" checked={formData.labTestLast5Years === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input type="radio" name="labTestLast5Years" value="No" checked={formData.labTestLast5Years === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                                {formData.labTestLast5Years === "Yes" && (
                                    <textarea name="labTestDetails" value={formData.labTestDetails} onChange={handleInputChange} placeholder="If Yes, state the year, type of diagnostics/lab and purpose of the diagnostic request..." rows={3} className="w-full px-4 py-2 mt-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Footer Info (Internal Use) */}
                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between text-[10px] text-muted-foreground uppercase tracking-widest gap-4">
                    <div>Generated on: {isMounted ? currentDate : "---"}</div>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Confirmed by Client Signature (Original)
                    </div>
                    <div>Ref: {isMounted ? formRefID : "---"}</div>
                </div>
            </div>

            {/* Action Bar */}
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
                            (isSubmitting || submitSuccess) ? "opacity-70 cursor-not-allowed" : "hover:bg-transparent hover:text-primary"
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

export default ClientMedicalHistoryForm;

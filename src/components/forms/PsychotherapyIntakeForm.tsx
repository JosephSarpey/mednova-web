"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Download, AlertCircle, User, Phone, Mail, FileText, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

const PsychotherapyIntakeForm = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        canWriteToAddress: "Yes",
        personalPhone: "",
        businessPhone: "",
        canCallPhones: "Yes",
        email: "",
        reachableTime: "",
        age: "",
        birthday: "",
        gender: "",
        birthplace: "",
        foreignBornArrival: "",
        foreignBornCitizen: "",
        timeInCurrentCity: "",
        maritalStatus: "",
        marriedHowLong: "",
        separatedDivorcedWhen: "",
        marriedMoreThanOnceDetails: "",
        romanticRelationship: "",
        relationshipHealth: "",
        childrenDetails: "",
        occupation: "",
        yearlySalary: "",
        timeInPresentWork: "",
        unemployedIncomeSource: "",
        educationLevel: "",
        nearestRelativeDetails: "",
        treatmentCondition: "",
        livingWith: "",
        referredBy: "",
        treatmentDesire: "",
        preferredTherapyOption: "",
        availability: "",
        objectToTests: "",
        knowWhatPsychotherapyIs: "",
        sessionExpectation: "",
        feePerSession: "200.00",
        totalFee: "",
        paymentPlan: "",
        envisageStartDate: "",
        importantIssues: "",
        hopeToAchieve: "",
        describeMyselfAs: "",
        othersDescribeMeAs: "",
        hobbiesInterests: "",
        likeToAccomplish: "",
        wishToChange: "",
        mostImportantThing: "",
        interestedBecause: "",
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
        setFormRefID(`MN-PI-${Math.random().toString(36).substring(7).toUpperCase()}`);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'radio') {
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
            doc.text("PSYCHOTHERAPY INTAKE FORM", pageWidth - 20, yPos, { align: "right" });

            yPos += 15;
            doc.setDrawColor(220, 220, 220);
            doc.setLineWidth(0.5);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 10;

            const addSectionHeader = (title: string) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(12, 43, 75);
                doc.text(title, 20, yPos);
                yPos += 10;
            };

            const addField = (label: string, value: string) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);
                doc.text(label, 20, yPos);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(60, 60, 60);
                const lines = doc.splitTextToSize(value || "N/A", pageWidth - 40);
                doc.text(lines, 20, yPos + 5);
                doc.setTextColor(0, 0, 0);
                yPos += (lines.length * 5) + 8;
            };

            addSectionHeader("Personal Data");
            addField("Name:", formData.fullName);
            addField("Address:", `${formData.address} (Ok to write: ${formData.canWriteToAddress})`);
            addField("Personal Phone / Business Phone:", `${formData.personalPhone} / ${formData.businessPhone} (Ok to call: ${formData.canCallPhones})`);
            addField("Email:", formData.email);
            addField("Reachable Time:", formData.reachableTime);
            addField("Age / Birthday / Sex:", `${formData.age} / ${formData.birthday} / ${formData.gender}`);
            addField("Birthplace:", formData.birthplace);
            addField("For Foreign Born:", `Arrival: ${formData.foreignBornArrival} | Citizen: ${formData.foreignBornCitizen}`);
            addField("Time in Current City:", formData.timeInCurrentCity);
            addField("Marital Status:", formData.maritalStatus);
            addField("Marriage/Divorce/Separation details:", `Length/When: ${formData.marriedHowLong} / ${formData.separatedDivorcedWhen}`);
            addField("Married more than once details:", formData.marriedMoreThanOnceDetails);
            addField("Romantic Relationship (if single/divorced):", `Yes/No: ${formData.romanticRelationship} | Health: ${formData.relationshipHealth}`);
            addField("Children (number and ages):", formData.childrenDetails);
            addField("Occupation & Salary:", `${formData.occupation} | GH¢ ${formData.yearlySalary}`);
            addField("Time in Present Work:", formData.timeInPresentWork);
            addField("Unemployed Income Source:", formData.unemployedIncomeSource);
            addField("Education Level:", formData.educationLevel);
            addField("Nearest Relative or Friend (Name & Address):", formData.nearestRelativeDetails);

            addSectionHeader("Treatment Needs & History");
            addField("Condition/Purpose for treatment:", formData.treatmentCondition);
            addField("Whom are you living with at present:", formData.livingWith);
            addField("Who referred you here:", formData.referredBy);
            addField("How strongly do you want treatment:", formData.treatmentDesire);
            addField("Preferred Therapy Option:", formData.preferredTherapyOption);
            addField("Availability Days & Times:", formData.availability);
            addField("Object to tests if necessary?:", formData.objectToTests);
            addField("Do you know what psychotherapy is?:", formData.knowWhatPsychotherapyIs);
            addField("Expectation for this session:", formData.sessionExpectation);

            addSectionHeader("Fees and Payment Plan");
            addField("Fee per session:", `GH¢ ${formData.feePerSession}`);
            addField("Total Fee:", `GH¢ ${formData.totalFee}`);
            addField("Payment Plan:", formData.paymentPlan);
            addField("Envisage start date:", formData.envisageStartDate);

            addSectionHeader("Important Issues");
            addField("Issues to deal with:", formData.importantIssues);
            addField("What you hope to achieve:", formData.hopeToAchieve);

            addSectionHeader("Personal Profile");
            addField("1. I would describe myself as:", formData.describeMyselfAs);
            addField("2. Others would describe me as:", formData.othersDescribeMeAs);
            addField("3. Some of my hobbies/interests are:", formData.hobbiesInterests);
            addField("4. The one thing I would like most to accomplish is:", formData.likeToAccomplish);
            addField("5. The one thing I wish I could change in the short-term is:", formData.wishToChange);
            addField("6. I think that the most important thing in life is:", formData.mostImportantThing);
            addField("7. I am interested in working with a Psychotherapist because:", formData.interestedBecause);

            if (yPos > 240) {
                doc.addPage();
                yPos = 20;
            }
            doc.setDrawColor(220, 220, 220);
            doc.line(20, yPos, pageWidth - 20, yPos);
            yPos += 15;

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

            doc.save(`Psychotherapy_Intake_${formData.fullName.replace(/\s+/g, "_") || "Submission"}.pdf`);

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
        const requiredFields = ['fullName', 'email', 'personalPhone', 'address'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
        
        if (missingFields.length > 0) {
            setSubmitError(`Please fill in all required fields: ${missingFields.join(', ')}`);
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        const lastSubmitTime = localStorage.getItem('piFormLastSubmit');
        if (lastSubmitTime && Date.now() - parseInt(lastSubmitTime) < 300000) {
            setSubmitError("Please wait 5 minutes before submitting again.");
            setTimeout(() => setSubmitError(""), 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const formspreeEndpoint = process.env.NEXT_PUBLIC_PSYCHOTHERAPY_ENDPOINT || "https://formspree.io/f/example";

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "Form Type": "Psychotherapy Intake Form",
                    "Reference ID": formRefID,
                    "Generated Date": currentDate,
                    ...formData
                })
            });

            if (response.ok) {
                setSubmitSuccess(true);
                localStorage.setItem('piFormLastSubmit', Date.now().toString());
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
            className="bg-background rounded-2xl text-black shadow-xl overflow-hidden border border-gray-100"
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
                        <h1 className="text-2xl font-bold text-secondary uppercase tracking-tight">Psychotherapy Intake Form</h1>
                        <p className="text-sm text-muted-foreground mt-1">Please fill out the following completely as possible. All material is confidential.</p>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Personal Data */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-primary pl-3">
                            <User className="w-5 h-5 text-primary" /> Personal Data Sheet
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">Name <span className="text-red-500">*</span></label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">Address <span className="text-red-500">*</span></label>
                                <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                                <div className="flex items-center gap-4 mt-2 ml-1">
                                    <span className="text-xs text-muted-foreground">Ok to write to you at this address?</span>
                                    <label className="flex items-center gap-1.5 text-xs text-secondary">
                                        <input type="radio" name="canWriteToAddress" value="Yes" checked={formData.canWriteToAddress === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-1.5 text-xs text-secondary">
                                        <input type="radio" name="canWriteToAddress" value="No" checked={formData.canWriteToAddress === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Personal Phone <span className="text-red-500">*</span></label>
                                <input type="tel" name="personalPhone" value={formData.personalPhone} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Business Phone (Optional)</label>
                                <input type="tel" name="businessPhone" value={formData.businessPhone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <div className="flex items-center gap-4 ml-1">
                                    <span className="text-xs text-muted-foreground">Ok to call you at either of these?</span>
                                    <label className="flex items-center gap-1.5 text-xs text-secondary">
                                        <input type="radio" name="canCallPhones" value="Yes" checked={formData.canCallPhones === "Yes"} onChange={handleInputChange} className="text-primary accent-primary" /> Yes
                                    </label>
                                    <label className="flex items-center gap-1.5 text-xs text-secondary">
                                        <input type="radio" name="canCallPhones" value="No" checked={formData.canCallPhones === "No"} onChange={handleInputChange} className="text-primary accent-primary" /> No
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">Client E-mail <span className="text-red-500">*</span></label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">At what time can we reach you at either of these phones?</label>
                                <input type="text" name="reachableTime" value={formData.reachableTime} onChange={handleInputChange} placeholder="e.g. Evenings after 6 PM" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            <div className="grid grid-cols-3 gap-4 md:col-span-2">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Birthday</label>
                                    <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Sex</label>
                                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2 bg-slate-50 p-4 rounded-xl">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Foreign-born arrival date (if applicable)</label>
                                    <input type="text" name="foreignBornArrival" value={formData.foreignBornArrival} onChange={handleInputChange} placeholder="e.g. June 2022" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Are you a citizen?</label>
                                    <select name="foreignBornCitizen" value={formData.foreignBornCitizen} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Birthplace</label>
                                <input type="text" name="birthplace" value={formData.birthplace} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">Time in Current City</label>
                                <input type="text" name="timeInCurrentCity" value={formData.timeInCurrentCity} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            {/* ... Include many of the long textual fields for intake here */}
                            <div className="space-y-4 md:col-span-2 border-t pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">Marital Status</label>
                                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                            <option value="">Select</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Separated">Separated</option>
                                            <option value="Divorced">Divorced</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">How long ago?</label>
                                        <input type="text" name="marriedHowLong" value={formData.marriedHowLong} onChange={handleInputChange} placeholder="For marital status" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">If separated or divorced, when?</label>
                                    <input type="text" name="separatedDivorcedWhen" value={formData.separatedDivorcedWhen} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">If married more than once, list dates and details:</label>
                                    <textarea name="marriedMoreThanOnceDetails" value={formData.marriedMoreThanOnceDetails} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2 bg-slate-50 p-4 rounded-xl">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Are you in any romantic relationship? (if single/divorced)</label>
                                    <select name="romanticRelationship" value={formData.romanticRelationship} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">How healthy is the relation?</label>
                                    <select name="relationshipHealth" value={formData.relationshipHealth} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                        <option value="">Select</option>
                                        <option value="Bad">Bad</option>
                                        <option value="Somewhat Good">Somewhat Good</option>
                                        <option value="Good">Good</option>
                                        <option value="Very Good">Very Good</option>
                                        <option value="Excellent">Excellent</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">List number and ages of children, if any</label>
                                <textarea name="childrenDetails" value={formData.childrenDetails} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Occupation</label>
                                    <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Approximate gross yearly salary</label>
                                    <input type="text" name="yearlySalary" value={formData.yearlySalary} onChange={handleInputChange} placeholder="GH¢ or USD" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">How long have you been doing present kind of work?</label>
                                    <input type="text" name="timeInPresentWork" value={formData.timeInPresentWork} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">If unemployed, source of income:</label>
                                    <input type="text" name="unemployedIncomeSource" value={formData.unemployedIncomeSource} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">How far through school did you go?</label>
                                <input type="text" name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">Name and address of nearest relative or friend</label>
                                <textarea name="nearestRelativeDetails" value={formData.nearestRelativeDetails} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>

                            <div className="space-y-1.5 md:col-span-2 border-t pt-4">
                                <label className="text-sm font-medium text-secondary ml-1">Condition/Purpose for treatment</label>
                                <textarea name="treatmentCondition" value={formData.treatmentCondition} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Whom are you living with at present?</label>
                                    <input type="text" name="livingWith" value={formData.livingWith} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Who referred you here?</label>
                                    <input type="text" name="referredBy" value={formData.referredBy} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">How strongly do you want treatment for your problem?</label>
                                <select name="treatmentDesire" value={formData.treatmentDesire} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                    <option value="">Select</option>
                                    <option value="Very much">Very much</option>
                                    <option value="Much">Much</option>
                                    <option value="Moderately">Moderately</option>
                                    <option value="Could do without it, if necessary">Could do without it, if necessary</option>
                                    <option value="Do not want treatment">Do not want treatment</option>
                                </select>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">Preferred Therapy Option</label>
                                <div className="flex flex-wrap gap-4 mt-1">
                                    {['Online', 'In-person office', 'Hybrid'].map((opt) => (
                                        <label key={opt} className="flex items-center gap-2 text-sm text-secondary bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                                            <input type="radio" name="preferredTherapyOption" value={opt} checked={formData.preferredTherapyOption === opt} onChange={handleInputChange} className="text-primary accent-primary" /> {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">What days and times can you come here/be available?</label>
                                <textarea name="availability" value={formData.availability} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2 bg-gray-50 p-4 rounded-xl">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Object to psychologic tests if necessary?</label>
                                    <select name="objectToTests" value={formData.objectToTests} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                        <option value="">Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-secondary ml-1">Do you know what psychotherapy is?</label>
                                    <input type="text" name="knowWhatPsychotherapyIs" value={formData.knowWhatPsychotherapyIs} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white" />
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">What is your expectation for this therapy session?</label>
                                <textarea name="sessionExpectation" value={formData.sessionExpectation} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>

                            {/* Fees Section */}
                            <div className="space-y-6 md:col-span-2 border-t pt-8">
                                <h3 className="text-lg font-semibold text-heading flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" /> Fees and Payment Plan
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">Fee per session</label>
                                        <input type="text" value="GH₵200.00" disabled className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-muted-foreground outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">Total Fee (to be filled by therapist/planned)</label>
                                        <input type="text" name="totalFee" value={formData.totalFee} onChange={handleInputChange} placeholder="GH¢" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">Payment Plan</label>
                                        <select name="paymentPlan" value={formData.paymentPlan} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                            <option value="">Select Plan</option>
                                            <option value="Full Payment">Full Payment</option>
                                            <option value="70/30 (Part payment)">70/30 (Part payment)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-secondary ml-1">Date envisage to start session</label>
                                        <input type="date" name="envisageStartDate" value={formData.envisageStartDate} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic mt-2">
                                    NOTE: The client shall have two sessions per week with each session lasting 60 minutes.
                                </p>
                            </div>

                            <div className="space-y-1.5 md:col-span-2 border-t pt-8">
                                <label className="text-sm font-medium text-secondary ml-1">Important Issues</label>
                                <textarea name="importantIssues" value={formData.importantIssues} onChange={handleInputChange} placeholder="Briefly outline any issues you would like to deal with" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-sm font-medium text-secondary ml-1">What you hope to achieve</label>
                                <textarea name="hopeToAchieve" value={formData.hopeToAchieve} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>

                        </div>
                    </div>

                    {/* Personal Profile */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-heading flex items-center gap-2 border-l-4 border-mednova-green pl-3">
                            <ClipboardList className="w-5 h-5 text-mednova-green" /> Personal Profile
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">1. I would describe myself as:</label>
                                <textarea name="describeMyselfAs" value={formData.describeMyselfAs} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">2. Others would describe me as:</label>
                                <textarea name="othersDescribeMeAs" value={formData.othersDescribeMeAs} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">3. Some of my hobbies/interests are:</label>
                                <textarea name="hobbiesInterests" value={formData.hobbiesInterests} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">4. The one thing I would like most to accomplish (but haven't yet) is:</label>
                                <textarea name="likeToAccomplish" value={formData.likeToAccomplish} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">5. The one thing I wish I could change in the short-term is:</label>
                                <textarea name="wishToChange" value={formData.wishToChange} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">6. I think that the most important thing in life is:</label>
                                <textarea name="mostImportantThing" value={formData.mostImportantThing} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-secondary ml-1">7. I am interested in working with a Psychotherapist because:</label>
                                <textarea name="interestedBecause" value={formData.interestedBecause} onChange={handleInputChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none resize-none" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between text-[10px] text-muted-foreground uppercase tracking-widest gap-4">
                    <div>Generated on: {isMounted ? currentDate : "---"}</div>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" /> Confirmed by Client Signature (Original)
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

export default PsychotherapyIntakeForm;

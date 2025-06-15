"use client";

import Input from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useTranslations } from "next-intl";
const formSchema = z.object({
    name: z.string().min(3, { message: "Name is required." }),
    specialties: z.string().min(1, { message: "Please select a specialty." }),
    city: z.string().min(1, { message: "City is required." }),
    email: z.string().email({ message: "Invalid email address." }).min(1, { message: "Email is required." }),
    mobileNumber: z.string()
        .regex(/^\+?[0-9]{11,15}$/, { message: "Enter a valid mobile number" }),
    bestTimeForCall: z.string().optional(),
    message: z.string().optional(),
});

const specialties = [
    "cardiology",
    "chest",
    "dermatology",
    "dentistry",
    "diabetology",
    "ENT",
    "gynecology",
    "internalMedicine",
    "nutrition",
    "ophthalmology",
    "orthopedicSurgery",
    "physiotherapy",
    "pediatrics",
    "surgery",
    "urology",

];

export default function ContactForm() {
    const t = useTranslations();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    console.log(submitSuccess, submitError)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            specialties: "",
            city: "",
            email: "",
            mobileNumber: "",
            bestTimeForCall: "",
            message: "",
        },
    });

    const handleFormSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);
            setSubmitSuccess(false);

            const params = new URLSearchParams({
                Subject: 'Email',
                Name: values.name,
                Speciality: values.specialties,
                City: values.city,
                Email: values.email,
                MobileNumber: values.mobileNumber,
                BestTimeForCall: values.bestTimeForCall || '',
                Message: values.message || ''
            });

            const response = await fetch(`http://cswf.azurewebsites.net/Functions/ContactUs?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });

            const data = await response.text();


            if (!response.ok) {
                throw new Error(data || 'Failed to submit form');
            }

            setSubmitSuccess(true);
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitError(error instanceof Error ? error.message : 'An error occurred while submitting the form');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (<div className="bg-white rounded-[20px] p-8 border-2 border-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="mb-4 space-y-3">
            <h2 className="fs-var-3xl font-semibold text-textTeal">Let Us Help You Run a Smarter Clinic</h2>
            <p className="fs-var-2xl text-textTeal font-semibold">Fill in your details and our team will contact you within 24 hours.</p>
        </div>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="text"
                    label={t("contactUs.name")}
                    form={form.register("name")}
                    error={form.formState.errors.name?.message}
                    isRequired={true}
                />
                <div className="form-group">
                    <label htmlFor="specialties" className="font-bold">{t("contactUs.specialty")} <span className="text-red-500 font-medium">*</span></label>
                    <select
                        {...form.register("specialties")}
                        className={`w-full p-2 bg-[#F1F1F180] border-1 border-[#D3D3D3] rounded-2xl mt-2
                                  ${form.watch("specialties") === "" ? "text-[#9CA3AF]" : "text-black"}`}
                        id="specialties" >
                        <option value="" hidden disabled className="text-[#9CA3AF]">
                            {t("contactUs.selectSpecialty")}
                        </option>
                        {specialties.map((specialty) => (
                            <option key={specialty} value={specialty}>
                                {t("specialtyNames." + specialty)}
                            </option>
                        ))}
                    </select>

                    {form.formState.errors.specialties && <p className="text-red-500 fs-var-sm">{form.formState.errors.specialties.message}</p>}
                </div>
            </div>
            <Input
                type="text"
                label={t("contactUs.city")}
                form={form.register("city")}
                error={form.formState.errors.city?.message}
                isRequired={true}
            />
            <Input
                type="email"
                label={t("contactUs.email")}
                form={form.register("email")}
                error={form.formState.errors.email?.message}
                isRequired={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="text"
                    label={t("contactUs.mobileNumber")}
                    form={form.register("mobileNumber")}
                    error={form.formState.errors.mobileNumber?.message}
                    isRequired={true}
                />
                <Input
                    type="text"
                    label={t("contactUs.bestTimeForCall")}
                    form={form.register("bestTimeForCall")}
                    error={form.formState.errors.bestTimeForCall?.message}
                />
            </div>
            <div className="form-group">
                <label htmlFor="message" className="font-bold">{t("contactUs.comment")}</label>
                <textarea
                    {...form.register("message")}
                    id="message"
                    className="w-full p-2 bg-[#F1F1F180] border-1 border-[#D3D3D3] rounded-2xl mt-2 placeholder:text-[#e9e9e9]"
                    rows={4}
                />
                {form.formState.errors.message && <p className="text-red-500 fs-var-sm">{form.formState.errors.message.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-teal text-white p-4 rounded-full cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? t("contactUs.submitting") : t("contactUs.submit")}
            </button>
        </form>
    </div>
    );
} 
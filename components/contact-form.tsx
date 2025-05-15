"use client";

import Input from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

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
    "Cardiology",
    "Chest",
    "Dermatology",
    "Dentistry",
    "Diabetology",
    "E.N.T.",
    "Gynecology",
    "Internal Medicine",
    "Nutrition",
    "Ophthalmology",
    "Orthopedic Surgery",
    "Physiotherapy",
    "Pediatrics",
    "Surgery",
    "Urology",
];

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    console.log({ submitSuccess, submitError });

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

    return (<div className="bg-[#F4F3F6] rounded-[20px] p-8 border-2 border-white">
        <div className="mb-4 space-y-3">
            <h2 className="text-3xl font-semibold text-[#203e71]">Contact Us</h2>
            <p className="text-2xl text-[#203e71] font-semibold">Please fill this form and we will contact you shortly</p>
        </div>



        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="text"
                    label="Name"
                    form={form.register("name")}
                    error={form.formState.errors.name?.message}
                    isRequired={true}
                />
                <div className="form-group">
                    <label htmlFor="specialties" className="font-bold">Specialty <span className="text-red-500 font-medium">*</span></label>
                    <select
                        {...form.register("specialties")}
                        className="w-full p-2 bg-white border border-[#94949440] rounded-lg mt-4"
                        id="specialties"
                    >
                        <option value="" className="text-gray-500" hidden>Select a specialty</option>
                        {specialties.map((specialty) => (
                            <option key={specialty} value={specialty}>
                                {specialty}
                            </option>
                        ))}
                    </select>
                    {form.formState.errors.specialties && <p className="text-red-500 text-sm">{form.formState.errors.specialties.message}</p>}
                </div>
            </div>
            <Input
                type="text"
                label="City"
                form={form.register("city")}
                error={form.formState.errors.city?.message}
                isRequired={true}
            />
            <Input
                type="email"
                label="Email"
                form={form.register("email")}
                error={form.formState.errors.email?.message}
                isRequired={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="number"
                    label="Mobile Number"
                    form={form.register("mobileNumber")}
                    error={form.formState.errors.mobileNumber?.message}
                    placeholder="+201234567890"
                    isRequired={true}
                />
                <Input
                    type="text"
                    label="Best Time for Call"
                    form={form.register("bestTimeForCall")}
                    error={form.formState.errors.bestTimeForCall?.message}
                />
            </div>
            <div className="form-group">
                <label htmlFor="message" className="font-bold">Comment or Message</label>
                <textarea
                    {...form.register("message")}
                    id="message"
                    className="w-full p-2 bg-white border border-[#94949440] rounded-lg mt-4"
                    rows={4}
                    placeholder="Enter your message here..."
                />
                {form.formState.errors.message && <p className="text-red-500 text-sm">{form.formState.errors.message.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-teal text-white py-2 px-4 rounded-full cursor-pointer ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    </div>
    );
} 
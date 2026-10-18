
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FoodDetails from "@/components/Dashboard/Donor/New/FoodDetails";
import Header from "@/components/Dashboard/Donor/New/Header";
import Timing from "@/components/Dashboard/Donor/New/Timing";
import Location from "@/components/Dashboard/Donor/New/Location";
import Notes from "@/components/Dashboard/Donor/New/Notes";
import TipCard from "@/components/Dashboard/Donor/New/TipCard";
import Impact from "@/components/Dashboard/Donor/New/Impact";
import { toast, ToastContainer } from "react-toastify";

export default function DonateFood() {
    const router = useRouter();
    const [foodImage, setFoodImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        image: null,
        foodName: "",
        category: "",
        quantity: "",
        unit: "servings",
        availableDate: "",
        availableTime: "",
        bestBeforeDate: "",
        bestBeforeTime: "",
        notes: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const requiredFields = [
        ["foodName", "Enter food name"],
        ["category", "Choose category"],
        ["quantity", "Enter quantity"],
        ["unit", "Choose unit"],
        ["availableDate", "Enter available date"],
        ["availableTime", "Enter available time"],
        ["bestBeforeDate", "Enter best-before date"],
        ["bestBeforeTime", "Enter best-before time"],
    ];

    async function handleSubmit() {
        
        for (const [field, message] of requiredFields) {
            if (form[field] === "") {
                toast(message);
                return;
            }
        }
        
        if (isSubmitting) return;
        setIsSubmitting(true);
        const formData = new FormData();

        formData.append("foodName", form.foodName);
        formData.append("category", form.category);
        formData.append("quantity", form.quantity);
        formData.append("unit", form.unit);
        formData.append("availableDate", form.availableDate);
        formData.append("availableTime", form.availableTime);
        formData.append("bestBeforeDate", form.bestBeforeDate);
        formData.append("bestBeforeTime", form.bestBeforeTime);
        formData.append("notes", form.notes);

        formData.append("image", foodImage);

        try {
            const response = await fetch("/api/donations", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Failed to publish donation");
                return;
            }

            toast.success("Donation published successfully");

            setTimeout(() => {
                router.push("/dashboard/donor");
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <main className="min-h-screen bg-[#F7FAF7] px-5 py-8 sm:px-8">
            <ToastContainer />
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <Header />

                <div className="grid gap-7 lg:grid-cols-[1fr_300px]">

                    {/* Main Form */}
                    <form className="space-y-6">

                        {/* Food Details */}
                        <FoodDetails form={form} handleChange={handleChange} foodImage={foodImage} setFoodImage={setFoodImage} />

                        {/* Timing */}
                        <Timing form={form} handleChange={handleChange} />

                        {/* Location */}
                        <Location />

                        {/* Notes */}
                        <Notes form={form} handleChange={handleChange} />

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                disabled={isSubmitting}
                                className="rounded-xl bg-[#16A34A] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-[#16A34A] disabled:hover:shadow-sm hover:cursor-pointer"
                            >
                                {isSubmitting ? "Publishing..." : "Publish Donation →"}
                            </button>
                        </div>

                    </form>

                    {/* Right Sidebar */}
                    <aside className="space-y-5 lg:sticky lg:top-8 lg:self-start">

                        {/* Impact Card */}
                        <Impact />

                        {/* Tip Card */}
                        <TipCard />

                    </aside>
                </div>
            </div>
        </main>
    );
}

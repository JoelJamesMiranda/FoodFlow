"use client"
import Link from "next/link";
import AuthLayout from "@/components/Auth/AuthLayout";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const response = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Signup failed");
                return;
            }

            toast.success(result.message);

            setForm({
                name: "",
                email: "",
                password: ""
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    console.log(form)

    return (
        <AuthLayout
            title="Join FoodFlow"
            subtitle="Create an account and become part of the food-sharing network."
        >
            <ToastContainer />

            <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Name */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Full name
                    </label>

                    <input
                        type="text"
                        value={form.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                </div>


                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Email address
                    </label>

                    <input
                        type="email"
                        value={form.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                </div>


                {/* Password */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        value={form.password}
                        name="password"
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                </div>

                {/* Signup */}

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] py-3.5 font-semibold text-white shadow-lg shadow-green-100 transition hover:bg-[#15803D] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading && (
                        <svg
                            className="h-5 w-5 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />

                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                    )}

                    {loading ? "Signing up..." : "Create account"}
                </button>


            </form>


            {/* Login */}
            <p className="mt-7 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-semibold text-[#16A34A] hover:underline"
                >
                    Log in
                </Link>
            </p>

        </AuthLayout>
    );
}
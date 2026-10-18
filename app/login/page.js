"use client"

import React from 'react'
import Link from "next/link";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AuthLayout from '@/components/Auth/AuthLayout';
import { useRouter } from 'next/navigation';

export default function Login() {

    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const response = await fetch("/api/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            }
        )
        const result = await response.json()

        if (!response.ok) {
            toast(result.error)
            return
        }

        if (response.ok) {
            toast(result.message)
            setForm({
                email: "",
                password: ""
            })

            setTimeout(() => {
                router.push("/dashboard")
            }, 1500);
        }
    }

    console.log("Login - ", form)

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Log in to continue making every meal count."
        >
            <ToastContainer />

            <form className="space-y-5">

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Email address
                    </label>

                    <input
                        type="email"
                        value={form.email}
                        name='email'
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                </div>


                {/* Password */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>

                        <button
                            type="button"
                            className="text-xs font-semibold text-[#16A34A] hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <input
                        type="password"
                        value={form.password}
                        name='password'
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                </div>


                {/* Login */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="hover:cursor-pointer w-full rounded-xl bg-[#16A34A] py-3.5 font-semibold text-white shadow-lg shadow-green-100 transition hover:bg-[#15803D] hover:shadow-xl"
                >
                    Log in
                </button>

            </form>


            {/* Signup */}
            <p className="mt-7 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-semibold text-[#16A34A] hover:underline"
                >
                    Create one
                </Link>
            </p>

        </AuthLayout>
    );
}
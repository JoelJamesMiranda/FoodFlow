"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = ({ userDetails }) => {
    const router = useRouter();

    const handleConnect = () => {
        toast("Connecting...");
        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200/70 bg-[#F7FAF7]/85 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 min-[416px]:h-20 min-[416px]:px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-1.5 min-[416px]:gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#16A34A] text-base text-white min-[416px]:h-9 min-[416px]:w-9 min-[416px]:rounded-xl min-[416px]:text-lg">
                        F
                    </div>

                    <span className="text-lg font-bold tracking-tight min-[416px]:text-xl">
                        Food<span className="text-[#16A34A]">Flow</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
                    <a href="#how-it-works" className="transition hover:text-[#16A34A]">
                        How it works
                    </a>
                    <a href="#impact" className="transition hover:text-[#16A34A]">
                        Our impact
                    </a>
                    <a href="#about" className="transition hover:text-[#16A34A]">
                        About us
                    </a>
                </div>

                {/* Auth Buttons */}
                {userDetails ? (
                    <button
                        onClick={handleConnect}
                        className="shrink-0 rounded-full bg-[#16A34A] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#15803D] min-[416px]:px-5 min-[416px]:py-2.5"
                    >
                        Connect
                    </button>
                ) : (
                    <div className="flex shrink-0 items-center gap-1 min-[416px]:gap-3">
                        <Link
                            href="/login"
                            className="rounded-full px-2.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-white min-[416px]:px-5 min-[416px]:py-2.5 min-[416px]:text-sm"
                        >
                            Log in
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-full bg-[#16A34A] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#15803D] hover:shadow-md min-[416px]:px-5 min-[416px]:py-2.5 min-[416px]:text-sm"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
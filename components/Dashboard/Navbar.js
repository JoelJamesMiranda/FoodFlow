"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const Navbar = ({ userDetails }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [profileDropDown, setProfileDropDown] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Logout failed");
                return;
            }

            toast("Logging out...");

            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    const navLinks = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Donate", href: "/dashboard/donor" },
        { label: "Find Food", href: "/dashboard/receiver" },
        { label: "Volunteer", href: "/dashboard/volunteer" },
        { label: "My Orders", href: "/dashboard/orders" },
    ];

    return (
        <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/60 backdrop-blur-xl ">
            <ToastContainer />

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 min-[360px]:px-4 min-[416px]:h-20 min-[416px]:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-1.5 min-[360px]:gap-2"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#16A34A] text-base font-bold text-white min-[416px]:h-9 min-[416px]:w-9 min-[416px]:rounded-xl min-[416px]:text-lg">
                        F
                    </div>

                    <span className="text-lg font-bold tracking-tight min-[360px]:text-xl">
                        Food<span className="text-[#16A34A]">Flow</span>
                    </span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-5 text-sm font-medium lg:flex xl:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`whitespace-nowrap transition hover:text-[#16A34A] ${
                                pathname === link.href
                                    ? "text-[#16A34A]"
                                    : "text-gray-600"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Profile button */}
                <button
                    type="button"
                    onClick={() => setProfileDropDown((prev) => !prev)}
                    aria-expanded={profileDropDown}
                    aria-label="Toggle profile menu"
                    className=" hover:cursor-pointer flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-2 transition hover:border-green-200 min-[360px]:gap-3 min-[360px]:pr-3 min-[416px]:pl-1.5 min-[416px]:pr-4"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700 min-[416px]:h-9 min-[416px]:w-9">
                        {userDetails?.name?.[0]?.toUpperCase() || "U"}
                    </div>

                    <span className="hidden max-w-28 truncate text-sm font-semibold text-gray-700 sm:block">
                        {userDetails?.name}
                    </span>

                    <span className="text-xs text-gray-500" aria-hidden="true">
                        {profileDropDown ? "▲" : "▼"}
                    </span>
                </button>
            </div>

            {/* Mobile navigation */}
            <div className="grid grid-cols-5 border-t border-gray-100 lg:hidden">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex min-w-0 items-center justify-center px-0.5 py-3 text-center text-[10px] font-medium leading-tight transition min-[360px]:text-xs ${
                            pathname === link.href
                                ? "border-b-2 border-[#16A34A] text-[#16A34A]"
                                : "text-gray-500 hover:text-[#16A34A]"
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Profile dropdown */}
            {profileDropDown && (
                <>
                    <button
                        type="button"
                        aria-label="Close profile menu"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setProfileDropDown(false)}
                    />

                    <div className="absolute right-3 top-[calc(100%-1px)] z-50 w-64 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl min-[416px]:right-6 lg:right-8">

                        <div className="border-b border-gray-100 px-5 py-4">
                            <p className="truncate text-sm font-semibold text-gray-900">
                                {userDetails?.name}
                            </p>
                            <p className="mt-1 truncate text-xs text-gray-500">
                                {userDetails?.email}
                            </p>
                        </div>

                        <ul className="p-2">
                            <li>
                                <Link
                                    href="/"
                                    onClick={() => setProfileDropDown(false)}
                                    className="block rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-[#16A34A]"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/profile"
                                    onClick={() => setProfileDropDown(false)}
                                    className="block rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-[#16A34A]"
                                >
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProfileDropDown(false);
                                        router.push("/myorders");
                                    }}
                                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-green-50 hover:text-[#16A34A]"
                                >
                                    My Activity
                                </button>
                            </li>

                            <li className="mt-1 border-t border-gray-100 pt-1">
                                <button
                                    onClick={handleLogout}
                                    type="button"
                                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16A34A] text-lg font-bold text-white">
                        F
                    </div>

                    <span className="text-xl font-bold tracking-tight">
                        Food<span className="text-[#16A34A]">Flow</span>
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-8 text-sm font-medium text-gray-500 md:flex">

                    <Link
                        href="/dashboard"
                        className="transition hover:text-[#16A34A]"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/dashboard/donor"
                        className="font-semibold text-[#16A34A]"
                    >
                        Donate
                    </Link>

                    <Link
                        href="/dashboard/receiver"
                        className="transition hover:text-[#16A34A]"
                    >
                        Find Food
                    </Link>

                    <Link
                        href="/dashboard/volunteer"
                        className="transition hover:text-[#16A34A]"
                    >
                        Volunteer
                    </Link>

                    <Link
                        href="/dashboard/orders"
                        className="transition hover:text-[#16A34A]"
                    >
                        My orders
                    </Link>

                </div>

                {/* Profile */}
                <button className="flex items-center gap-3 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                        J
                    </div>

                    <span className="hidden text-sm font-semibold text-gray-700 sm:block">
                        Joel
                    </span>

                    <span className="text-xs text-gray-400">
                        ▼
                    </span>

                </button>

            </div>
        </nav>
    )
}

export default Navbar

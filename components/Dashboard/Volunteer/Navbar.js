import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 md:px-12">

        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold">
            F
          </div>

          <span className="text-xl font-bold tracking-tight">
            Food<span className="text-green-600">Flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">

          <Link
            href="/dashboard"
            className="hover:text-green-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/donor"
            className="hover:text-green-600 transition"
          >
            Donate
          </Link>

          <Link
            href="/dashboard/receiver"
            className="hover:text-green-600 transition"
          >
            Find Food
          </Link>

          <Link
            href="/dashboard/volunteer"
            className="text-green-600"
          >
            Volunteer
          </Link>

        </div>

        <div className="flex items-center gap-3 hover:cursor-pointer">

          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold">Joel</p>
            <p className="text-xs text-gray-500">
              FoodFlow Member
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
            J
          </div>

        </div>

      </nav>
  )
}

export default Navbar

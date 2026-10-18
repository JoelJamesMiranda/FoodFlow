import React from 'react'
import Link from 'next/link'

const Action = () => {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-3">

          {/* DONATE */}
          <Link
            href="/dashboard/donor"
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-100/50"
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl transition group-hover:scale-110">
              🍱
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-orange-500">
              Donate
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Have extra food?
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              List your surplus food and connect it with someone who
              can use it instead of letting it go to waste.
            </p>

            <div className="mt-8 flex items-center gap-2 font-semibold text-orange-600">
              Donate food
              <span className="transition group-hover:translate-x-1">
                →
              </span>
            </div>

          </Link>


          {/* RECEIVER */}
          <Link
            href="/dashboard/receiver"
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-2xl hover:shadow-green-100/50"
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl transition group-hover:scale-110">
              🤝
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-[#16A34A]">
              Find food
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Looking for food?
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Discover available food donations near you and request
              meals that are currently available.
            </p>

            <div className="mt-8 flex items-center gap-2 font-semibold text-[#16A34A]">
              Find available food
              <span className="transition group-hover:translate-x-1">
                →
              </span>
            </div>

          </Link>


          {/* VOLUNTEER */}
          <Link
            href="/dashboard/volunteer"
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50"
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition group-hover:scale-110">
              🚴
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Volunteer
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Help deliver food
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              Pick up available food and help deliver it to people
              or organizations that need it.
            </p>

            <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600">
              Start volunteering
              <span className="transition group-hover:translate-x-1">
                →
              </span>
            </div>

          </Link>

        </section>
  )
}

export default Action

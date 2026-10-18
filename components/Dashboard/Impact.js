import React from 'react'
import Link from 'next/link'

const Impact = () => {
  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

          {/* Personal impact */}
          <div className="rounded-3xl bg-[#17211A] p-8 text-white sm:p-10">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-green-400">
                  YOUR IMPACT
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Every action counts.
                </h2>
              </div>

              <div className="text-3xl">
                🌱
              </div>
            </div>


            <div className="mt-10 grid grid-cols-3 gap-4">

              <div>
                <p className="text-3xl font-bold">
                  0
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Donations
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  0
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Meals shared
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  0
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Deliveries
                </p>
              </div>

            </div>

          </div>


          {/* Nearby */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400">
                  NEAR YOU
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Food available
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                📍
              </div>
            </div>


            <div className="mt-6 rounded-2xl bg-[#F7FAF7] p-5">

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    12 meals available
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Within your area
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Available
                </span>
              </div>

              <Link
                href="/dashboard/receiver"
                className="mt-5 block rounded-xl bg-[#16A34A] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#15803D]"
              >
                View available food
              </Link>

            </div>

          </div>

        </section>
  )
}

export default Impact

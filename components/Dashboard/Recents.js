import React from 'react'

const Recents = () => {
  return (
    <section className="mt-12">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                ACTIVITY
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Recent activity
              </h2>
            </div>

            <button className="text-sm font-semibold text-[#16A34A] hover:underline">
              View all
            </button>
          </div>


          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
              📋
            </div>

            <h3 className="mt-4 font-semibold">
              No activity yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Your donations, food requests, and volunteer deliveries
              will appear here once you start using FoodFlow.
            </p>

          </div>

        </section>

  )
}

export default Recents

import React from 'react'

const Impact = () => {
  return (
    <div className="mt-10 bg-[#17211A] rounded-3xl p-8 md:p-10 text-white">

          <div className="max-w-2xl">

            <p className="text-green-400 font-semibold text-sm">
              YOUR IMPACT
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Every delivery keeps good food moving.
            </h2>

            <p className="text-gray-400 mt-3">
              Your time helps connect surplus food with people who need it.
              Even one delivery can make a difference.
            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">

            <div>
              <p className="text-3xl font-bold">
                0
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Deliveries
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">
                0
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Meals delivered
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">
                0 km
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Distance covered
              </p>
            </div>

          </div>

        </div>
  )
}

export default Impact

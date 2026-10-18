import React from 'react'

const Stats = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

            <div className="bg-white border border-gray-100 rounded-2xl p-5">

                <p className="text-sm text-gray-500">
                    Deliveries completed
                </p>

                <p className="text-3xl font-bold mt-2">
                    0
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    Successful deliveries
                </p>

            </div>


            <div className="bg-white border border-gray-100 rounded-2xl p-5">

                <p className="text-sm text-gray-500">
                    Meals delivered
                </p>

                <p className="text-3xl font-bold mt-2">
                    0
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    Food delivered to receivers
                </p>

            </div>


            <div className="bg-white border border-gray-100 rounded-2xl p-5">

                <p className="text-sm text-gray-500">
                    Distance covered
                </p>

                <p className="text-3xl font-bold mt-2">
                    0 km
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    Total delivery distance
                </p>

            </div>

        </div>
    )
}

export default Stats

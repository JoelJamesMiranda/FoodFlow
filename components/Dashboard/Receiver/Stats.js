import React from 'react'

const Stats = ({availableFood}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

            <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <p className="text-sm text-gray-500">Food received</p>
                <p className="text-3xl font-bold mt-2">0</p>
                <p className="text-xs text-gray-400 mt-1">
                    Meals received so far
                </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <p className="text-sm text-gray-500">Active requests</p>
                <p className="text-3xl font-bold mt-2">0</p>
                <p className="text-xs text-gray-400 mt-1">
                    Requests waiting for delivery
                </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <p className="text-sm text-gray-500">Nearby food</p>
                <p className="text-3xl font-bold mt-2">{availableFood.length}</p>
                <p className="text-xs text-gray-400 mt-1">
                    Available around you
                </p>
            </div>

        </div>
    )
}

export default Stats

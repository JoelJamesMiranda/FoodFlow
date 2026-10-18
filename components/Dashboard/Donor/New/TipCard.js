import React from 'react'

const TipCard = () => {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-[#17211A]">
                💡 Donation tip
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                Please make sure the food is safe to consume
                and provide an accurate best-before time.
            </p>
        </div>
    )
}

export default TipCard

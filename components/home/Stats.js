import React from 'react'

const Stats = () => {
    return (
        <section id="" className="border-y border-gray-200 bg-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-10 md:grid-cols-4 lg:px-8">

                <div className="border-r border-gray-200 text-center">
                    <p className="text-3xl font-bold">2,480+</p>
                    <p className="mt-1 text-sm text-gray-500">Meals shared</p>
                </div>

                <div className="border-r-0 text-center md:border-r md:border-gray-200">
                    <p className="text-3xl font-bold">186+</p>
                    <p className="mt-1 text-sm text-gray-500">Food donations</p>
                </div>

                <div className="mt-8 border-r border-gray-200 text-center md:mt-0">
                    <p className="text-3xl font-bold">94+</p>
                    <p className="mt-1 text-sm text-gray-500">Deliveries</p>
                </div>

                <div className="mt-8 text-center md:mt-0">
                    <p className="text-3xl font-bold">100%</p>
                    <p className="mt-1 text-sm text-gray-500">Community driven</p>
                </div>

            </div>
        </section>

    )
}

export default Stats

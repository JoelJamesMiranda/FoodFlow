import React from 'react'

const Working = () => {
    return (
        <section
            id="how-it-works"
            className="mx-auto max-w-7xl px-4 py-16 min-[416px]:px-6 min-[416px]:py-24 lg:px-8"
        >
            {/* Heading */}
            <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[#16A34A] min-[416px]:text-sm">
                    How FoodFlow works
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight min-[360px]:text-4xl min-[416px]:text-5xl">
                    One platform.
                    <br />
                    Three ways to make a difference.
                </h2>

                <p className="mt-4 text-base leading-7 text-gray-600 min-[416px]:mt-5 min-[416px]:text-lg min-[416px]:leading-8">
                    FoodFlow brings donors, people looking for food, and volunteers
                    together in one simple network.
                </p>
            </div>

            {/* Steps */}
            <div className="mt-10 grid gap-4 min-[416px]:mt-14 min-[416px]:gap-6 md:grid-cols-3">

                {/* Donate */}
                <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50 min-[416px]:rounded-3xl min-[416px]:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl min-[416px]:h-14 min-[416px]:w-14 min-[416px]:rounded-2xl min-[416px]:text-2xl">
                        🍱
                    </div>

                    <p className="mt-6 text-sm font-semibold text-gray-400 min-[416px]:mt-8">
                        01
                    </p>

                    <h3 className="mt-2 text-xl font-bold min-[416px]:text-2xl">
                        Donate surplus
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600 min-[416px]:mt-4 min-[416px]:text-base min-[416px]:leading-7">
                        Have extra meals from a restaurant, event, hostel, or home?
                        List the food and let someone nearby put it to good use.
                    </p>
                </div>

                {/* Find */}
                <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50 min-[416px]:rounded-3xl min-[416px]:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl min-[416px]:h-14 min-[416px]:w-14 min-[416px]:rounded-2xl min-[416px]:text-2xl">
                        🤝
                    </div>

                    <p className="mt-6 text-sm font-semibold text-gray-400 min-[416px]:mt-8">
                        02
                    </p>

                    <h3 className="mt-2 text-xl font-bold min-[416px]:text-2xl">
                        Find available food
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600 min-[416px]:mt-4 min-[416px]:text-base min-[416px]:leading-7">
                        Discover nearby food donations and request what you need.
                        Location-based listings make finding available meals simple.
                    </p>
                </div>

                {/* Volunteer */}
                <div className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50 min-[416px]:rounded-3xl min-[416px]:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl min-[416px]:h-14 min-[416px]:w-14 min-[416px]:rounded-2xl min-[416px]:text-2xl">
                        🚴
                    </div>

                    <p className="mt-6 text-sm font-semibold text-gray-400 min-[416px]:mt-8">
                        03
                    </p>

                    <h3 className="mt-2 text-xl font-bold min-[416px]:text-2xl">
                        Volunteer to deliver
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-600 min-[416px]:mt-4 min-[416px]:text-base min-[416px]:leading-7">
                        Help move food from donors to people who need it. Pick up,
                        follow the route, and deliver — every trip matters.
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Working
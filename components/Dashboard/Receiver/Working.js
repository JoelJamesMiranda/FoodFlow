
import React from 'react'

const Working = () => {
    return (
        <section className="mt-12 rounded-3xl bg-[#17211A] p-8 text-white sm:p-10">

            <div className="max-w-xl">

                <p className="text-sm font-semibold uppercase tracking-widest text-green-400">
                    How receiving works
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                    From available food to your table.
                </h2>

            </div>


            <div className="mt-10 grid gap-6 md:grid-cols-4">

                {/* Step 1 */}
                <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg">
                        1
                    </div>

                    <h3 className="mt-4 font-semibold">
                        Find available food
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        Browse surplus food available near your location and choose what you need.
                    </p>
                </div>


                {/* Step 2 */}
                <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg">
                        2
                    </div>

                    <h3 className="mt-4 font-semibold">
                        Request the food
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        Select a food listing and send a request to receive the available meals.
                    </p>
                </div>


                {/* Step 3 */}
                <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg">
                        3
                    </div>

                    <h3 className="mt-4 font-semibold">
                        Volunteer delivers it
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        A nearby volunteer picks up the food from the donor and brings it to you.
                    </p>
                </div>


                {/* Step 4 */}
                <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg">
                        ✓
                    </div>

                    <h3 className="mt-4 font-semibold">
                        Receive your food
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        Receive the food safely and help turn surplus meals into something meaningful.
                    </p>
                </div>

            </div>

        </section>
    )
}

export default Working

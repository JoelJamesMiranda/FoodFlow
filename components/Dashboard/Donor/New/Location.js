import React from 'react'

const Location = () => {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCFCE7] text-xl">
                    📍
                </div>

                <h2 className="text-xl font-bold text-[#17211A]">
                    Pickup Location
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Your saved profile address will be used for pickup.
                </p>
            </div>

            <div className="rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-5">
                <div className="flex items-start gap-4">
                    <div className="mt-1 text-xl">
                        📍
                    </div>

                    <div>
                        <p className="font-semibold text-[#166534]">
                            Your saved address
                        </p>

                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Your FoodFlow profile address will be
                            automatically used for this donation.
                        </p>

                        <button
                            type="button"
                            onClick={() => router.push("/profile")}
                            className="mt-3 text-sm font-semibold text-[#16A34A] hover:underline"
                        >
                            Edit address →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Location

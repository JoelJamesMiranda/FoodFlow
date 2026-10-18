import React from 'react'

const Timing = ({form , handleChange}) => {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCFCE7] text-xl">
                    🕐
                </div>

                <h2 className="text-xl font-bold text-[#17211A]">
                    Pickup Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Let volunteers know when the food can be collected.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

                {/* Available */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Available from
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="date"
                            name="availableDate"
                            value={form.availableDate}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16A34A]"
                        />

                        <input
                            type="time"
                            name="availableTime"
                            value={form.availableTime}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16A34A]"
                        />
                    </div>
                </div>

                {/* Best Before */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Best before
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="date"
                            name="bestBeforeDate"
                            value={form.bestBeforeDate}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16A34A]"
                        />

                        <input
                            type="time"
                            name="bestBeforeTime"
                            value={form.bestBeforeTime}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#16A34A]"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Timing

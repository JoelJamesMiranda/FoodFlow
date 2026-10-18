import React from 'react'

const Notes = ({form , handleChange}) => {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCFCE7] text-xl">
                    📝
                </div>

                <h2 className="text-xl font-bold text-[#17211A]">
                    Additional Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Add anything that might help the receiver or volunteer.
                </p>
            </div>

            <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. Vegetarian food, packed in separate containers..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
            />
        </section>
    )
}

export default Notes

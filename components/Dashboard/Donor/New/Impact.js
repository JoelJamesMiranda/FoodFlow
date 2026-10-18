import React from 'react'

const Impact = () => {
    return (
        <div className="rounded-3xl bg-[#17211A] p-6 text-white">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl">
                🌱
            </div>

            <h2 className="text-xl font-bold">
                Your Impact
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-300">
                Every donation helps reduce food waste and
                makes surplus food available to someone who
                needs it.
            </p>

            <div className="my-6 h-px bg-white/10" />

            <div className="space-y-5">
                <div>
                    <p className="text-2xl font-bold">
                        🍽️ 0
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Meals donated today
                    </p>
                </div>

                <div>
                    <p className="text-2xl font-bold">
                        🌍 0 kg
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Food saved from waste
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Impact

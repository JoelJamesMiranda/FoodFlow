import Link from "next/link";

export default function MissingAddress() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="w-full max-w-2xl rounded-2xl border border-green-100 bg-white p-8 shadow-sm">

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 mb-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="h-7 w-7 text-green-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 10.5-7.5 10.5s-7.5-3.358-7.5-10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                    </svg>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-[#17211A]">
                    Add your address
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                    Add your delivery or pickup address to discover surplus food
                    available near you. We’ll use your location to show nearby
                    food listings and calculate the distance from donors.
                </p>

                {/* Benefits */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3">

                    <div className="rounded-xl bg-[#F7FAF7] p-4">
                        <div className="text-lg">📍</div>
                        <p className="mt-2 text-sm font-semibold">
                            Find nearby food
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            See listings closest to you
                        </p>
                    </div>

                    <div className="rounded-xl bg-[#F7FAF7] p-4">
                        <div className="text-lg">📏</div>
                        <p className="mt-2 text-sm font-semibold">
                            Know the distance
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Compare donor locations easily
                        </p>
                    </div>

                    <div className="rounded-xl bg-[#F7FAF7] p-4">
                        <div className="text-lg">🚚</div>
                        <p className="mt-2 text-sm font-semibold">
                            Easier delivery
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Help volunteers find you
                        </p>
                    </div>

                </div>

                {/* Button */}
                <Link
                    href="/profile"
                    className="mt-7 inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    Add Address
                    <span className="ml-2">→</span>
                </Link>

            </div>
        </div>
    );
}
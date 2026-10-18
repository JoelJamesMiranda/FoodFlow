import React from "react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-24 min-[416px]:pt-28 lg:pt-32">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 -top-40 h-72 w-72 rounded-full bg-green-200/30 blur-3xl sm:h-96 sm:w-96" />
            <div className="pointer-events-none absolute -left-40 top-[28rem] h-72 w-72 rounded-full bg-orange-100/40 blur-3xl sm:h-96 sm:w-96" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-10 min-[416px]:gap-14 min-[416px]:px-6 min-[416px]:py-14 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">

                {/* Hero text */}
                <div className="min-w-0">

                    <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-700 min-[416px]:mb-6 min-[416px]:px-4 min-[416px]:text-sm">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                        <span>Building a world with less food waste</span>
                    </div>

                    <h1 className="text-[2.55rem] font-bold leading-[1.08] tracking-tight min-[360px]:text-5xl min-[416px]:text-5xl sm:text-6xl lg:max-w-3xl lg:text-7xl">
                        Turn surplus food
                        <span className="block text-[#16A34A]">
                            into shared meals.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 min-[416px]:mt-7 min-[416px]:text-lg min-[416px]:leading-8">
                        FoodFlow connects people with surplus food to those who need it.
                        Donate extra meals, discover available food nearby, or volunteer
                        to help move food where it matters most.
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-7 flex flex-col gap-3 min-[416px]:mt-9 min-[416px]:flex-row min-[416px]:flex-wrap min-[416px]:gap-4">
                        <Link
                            href="/signup"
                            className="flex w-full items-center justify-center rounded-full bg-[#16A34A] px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-green-200 transition hover:-translate-y-0.5 hover:bg-[#15803D] min-[416px]:w-auto min-[416px]:px-7"
                        >
                            Get started →
                        </Link>

                        <a
                            href="#how-it-works"
                            className="flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3.5 text-center font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50 min-[416px]:w-auto min-[416px]:px-7"
                        >
                            See how it works
                        </a>
                    </div>

                    {/* Trust statement */}
                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-gray-500 min-[416px]:mt-10">
                        <div className="flex shrink-0 -space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-green-100">
                                🍱
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-100">
                                🤝
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100">
                                🚴
                            </div>
                        </div>

                        <span id="impact">Donate. Connect. Deliver.</span>
                    </div>
                </div>

                {/* Hero visual */}
                <div className="relative min-w-0 w-full">

                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-2.5 shadow-xl shadow-gray-200/60 min-[416px]:rounded-[2rem] min-[416px]:p-4 sm:p-5">

                        {/* Map */}
                        <div className="relative h-[310px] overflow-hidden rounded-xl bg-[#EAF3E8] min-[360px]:h-[340px] min-[416px]:h-[380px] sm:h-[430px] min-[1024px]:h-[430px] min-[1024px]:rounded-[1.5rem]">

                            {/* Map lines */}
                            <div className="pointer-events-none absolute left-1/4 top-0 h-full w-px rotate-[18deg] bg-white/80" />
                            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -rotate-[12deg] bg-white/80" />
                            <div className="pointer-events-none absolute left-3/4 top-0 h-full w-px rotate-[25deg] bg-white/80" />
                            <div className="pointer-events-none absolute left-0 top-1/3 h-px w-full rotate-[8deg] bg-white/80" />
                            <div className="pointer-events-none absolute left-0 top-2/3 h-px w-full -rotate-[6deg] bg-white/80" />

                            {/* Map label */}
                            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-2 text-[10px] font-semibold text-gray-600 shadow-sm backdrop-blur min-[416px]:left-5 min-[416px]:top-5 min-[416px]:px-4 min-[416px]:text-xs">
                                FoodFlow Network
                            </div>

                            {/* Pickup marker */}
                            <div className="absolute left-[18%] top-[30%]">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-base shadow-lg ring-4 ring-orange-100/70 min-[416px]:h-12 min-[416px]:w-12 min-[416px]:text-xl min-[416px]:ring-8">
                                    🍱
                                </div>
                            </div>

                            {/* Destination marker */}
                            <div className="absolute bottom-[36%] right-[15%] min-[416px]:bottom-[30%] min-[416px]:right-[20%]">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16A34A] text-base shadow-lg ring-4 ring-green-100/70 min-[416px]:h-12 min-[416px]:w-12 min-[416px]:text-xl min-[416px]:ring-8">
                                    📍
                                </div>
                            </div>

                            {/* Route */}
                            <svg
                                className="pointer-events-none absolute inset-0 h-full w-full"
                                viewBox="0 0 500 430"
                                preserveAspectRatio="none"
                                fill="none"
                            >
                                <path
                                    d="M105 135 C170 175, 225 125, 280 195 C325 250, 350 275, 410 290"
                                    stroke="#16A34A"
                                    strokeWidth="4"
                                    strokeDasharray="8 9"
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Delivery card */}
                            <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur min-[416px]:bottom-5 min-[416px]:left-5 min-[416px]:right-5 min-[416px]:rounded-2xl min-[416px]:p-5">

                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-medium tracking-wide text-gray-400 min-[416px]:text-xs">
                                            ACTIVE DELIVERY
                                        </p>
                                        <h3 className="mt-1 text-sm font-bold leading-snug text-gray-800 min-[416px]:text-base">
                                            24 meals on the move
                                        </h3>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-600 min-[416px]:px-3 min-[416px]:text-xs">
                                        On route
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center gap-2 text-xs min-[416px]:mt-4 min-[416px]:gap-3 min-[416px]:text-sm">
                                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500 min-[416px]:h-3 min-[416px]:w-3" />
                                    <span className="min-w-0 truncate text-gray-500">
                                        Community Kitchen
                                    </span>

                                    <div className="h-px min-w-2 flex-1 bg-gray-200" />

                                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 min-[416px]:h-3 min-[416px]:w-3" />
                                    <span className="min-w-0 truncate text-gray-500">
                                        Local Shelter
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
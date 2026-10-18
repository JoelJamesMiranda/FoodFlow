import React from 'react'
import Link from 'next/link'

const About = () => {
    return (
        <section
            id="about"
            className="overflow-hidden bg-[#17211A] text-white"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 min-[416px]:gap-16 min-[416px]:px-6 min-[416px]:py-24 lg:grid-cols-2 lg:px-8">

                {/* Text content */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-green-400 min-[416px]:text-sm">
                        Why FoodFlow?
                    </p>

                    <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight min-[360px]:text-4xl min-[416px]:mt-5 min-[416px]:text-5xl">
                        Good food shouldn't become waste.
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-300 min-[416px]:mt-6 min-[416px]:max-w-xl min-[416px]:text-lg min-[416px]:leading-8">
                        Every day, perfectly edible food can go unused while people
                        around us struggle to access a meal. The problem isn't always
                        a lack of food — sometimes it's simply a lack of connection.
                    </p>

                    <p className="mt-4 text-base leading-7 text-gray-300 min-[416px]:mt-5 min-[416px]:max-w-xl min-[416px]:text-lg min-[416px]:leading-8">
                        FoodFlow creates that connection by bringing surplus food,
                        people who need it, and volunteers together through one
                        coordinated platform.
                    </p>

                    <Link
                        href="/signup"
                        className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-green-50 min-[416px]:mt-8 min-[416px]:px-7 min-[416px]:text-base"
                    >
                        Join FoodFlow →
                    </Link>
                </div>

                {/* Idea visual */}
                <div className="relative min-w-0">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur min-[360px]:p-5 min-[416px]:rounded-[2rem] min-[416px]:p-8">

                        <div className="grid gap-3 min-[416px]:gap-4">

                            {/* Surplus food */}
                            <div className="rounded-xl bg-white/10 p-4 min-[416px]:rounded-2xl min-[416px]:p-5">
                                <div className="flex items-center gap-3 min-[416px]:gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-400/20 text-lg min-[416px]:h-12 min-[416px]:w-12 min-[416px]:text-xl">
                                        🍱
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold min-[416px]:text-base">
                                            Surplus food
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400 min-[416px]:text-sm">
                                            Waiting to be shared
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center text-xl text-green-400 min-[416px]:text-2xl">
                                ↓
                            </div>

                            {/* Volunteer */}
                            <div className="rounded-xl bg-white/10 p-4 min-[416px]:rounded-2xl min-[416px]:p-5">
                                <div className="flex items-center gap-3 min-[416px]:gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-400/20 text-lg min-[416px]:h-12 min-[416px]:w-12 min-[416px]:text-xl">
                                        🚴
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold min-[416px]:text-base">
                                            Community volunteer
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400 min-[416px]:text-sm">
                                            Moving food where it matters
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center text-xl text-green-400 min-[416px]:text-2xl">
                                ↓
                            </div>

                            {/* Receiver */}
                            <div className="rounded-xl bg-white/10 p-4 min-[416px]:rounded-2xl min-[416px]:p-5">
                                <div className="flex items-center gap-3 min-[416px]:gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/20 text-lg min-[416px]:h-12 min-[416px]:w-12 min-[416px]:text-xl">
                                        🤝
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold min-[416px]:text-base">
                                            Someone who needs it
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400 min-[416px]:text-sm">
                                            Food reaches its destination
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default About
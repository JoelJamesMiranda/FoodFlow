import React from 'react'
import Link from 'next/link'

const Cta = () => {
    return (
        <section className="px-4 py-16 min-[416px]:px-6 min-[416px]:py-24">
            <div className="mx-auto max-w-4xl rounded-3xl bg-[#E8F5E9] px-5 py-12 text-center min-[360px]:px-6 min-[416px]:rounded-[2rem] min-[416px]:px-12 min-[416px]:py-16">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A34A] min-[416px]:text-sm">
                    Be part of the flow
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight min-[360px]:text-4xl min-[416px]:text-5xl">
                    Let's make every meal count.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 min-[416px]:text-lg min-[416px]:leading-8">
                    Whether you have food to give, need a meal, or simply want to
                    help — there's a place for you on FoodFlow.
                </p>

                <div className="mt-8">
                    <Link
                        href="/signup"
                        className="inline-flex w-full items-center justify-center rounded-full bg-[#16A34A] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-green-200 transition hover:bg-[#15803D] min-[360px]:text-base min-[416px]:w-auto min-[416px]:px-8"
                    >
                        Get started with FoodFlow →
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default Cta
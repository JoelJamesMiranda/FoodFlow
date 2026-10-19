import React from "react";
import Link from "next/link";

const Impact = ({ data }) => {

  const stats = [
    {
      label: "Meals shared",
      value: data?.mealsShared ?? 0,
      description: "Meals made available",
    },
    {
      label: "Meals received",
      value: data?.mealsReceived ?? 0,
      description: "Meals reaching people",
    },
    {
      label: "Deliveries completed",
      value: data?.deliveriesCompleted ?? 0,
      description: "Successful deliveries",
    },
  ];

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Personal impact */}
      <div className="rounded-3xl bg-[#17211A] p-8 text-white sm:p-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wider text-green-400">
              YOUR IMPACT
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Every meal makes a difference.
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              Together, we're turning surplus food into meaningful change.
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
            🌱
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >

              <p className="mt-4 text-3xl font-bold tabular-nums">
                {stat.value.toLocaleString()}
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {stat.label}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby food */}
      <div className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-125" />

        {/* Header */}
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                Food nearby
              </p>
            </div>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#17211A]">
              Ready to make a difference?
            </h2>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-2xl">
            📍
          </div>
        </div>

        {/* Availability */}
        <div className="relative mt-8 rounded-2xl bg-[#F7FAF7] p-5 sm:p-6">
          <p className="text-sm font-medium text-gray-500">
            Available food donations
          </p>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold tracking-tight text-[#17211A]">
              {data?.totalDonations ?? 0}
            </span>
            <span className="text-sm font-medium text-gray-500">
              donations
            </span>
          </div>

          <p className="mt-3 flex items-center gap-2 text-xs font-medium text-green-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
              ✓
            </span>
            Surplus food is waiting to reach people who need it. Every donation counts.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard/receiver"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15803D] active:scale-[0.98]"
        >
          Explore available food
          <span className="text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Impact;
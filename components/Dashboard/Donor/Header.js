
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <section className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] sm:text-sm">
          Donor Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:mt-3 sm:text-4xl lg:text-5xl">
          Share what you have.
        </h1>

        <p className="mt-3 max-w-xl text-base leading-7 text-gray-500 sm:mt-4 sm:text-lg sm:leading-8">
          Turn surplus food into a meal for someone who needs it.
        </p>
      </div>

      <Link
        href="/dashboard/donor/new"
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#16A34A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-100 transition hover:bg-[#15803D] active:scale-[0.98] sm:w-auto sm:px-6 sm:py-3.5 sm:text-base md:shrink-0"
      >
        + Donate food
      </Link>
    </section>
  );
};

export default Header;

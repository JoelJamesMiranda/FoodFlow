import React from "react";

const Header = () => {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:gap-5 md:flex-row md:items-end md:justify-between">

            <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold tracking-widest text-green-600 sm:text-sm">
                    FIND FOOD
                </p>

                <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    Find food near you.
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                    Discover available surplus food from restaurants, homes,
                    hostels and organizations around you.
                </p>
            </div>

            <button
                type="button"
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:w-fit sm:text-base"
            >
                <span aria-hidden="true">📍</span>
                <span>Use my location</span>
            </button>

        </div>
    );
};

export default Header;
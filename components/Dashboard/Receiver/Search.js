import React from "react";

const Search = () => {
    return (
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:mb-8 sm:p-4">

            <div className="flex flex-col gap-3 md:flex-row">

                {/* Search input */}
                <div className="relative min-w-0 flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search for food..."
                        aria-label="Search for food"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:text-base"
                    />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:flex">

                    <select
                        aria-label="Filter by food type"
                        defaultValue="all"
                        className="h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:px-4 sm:text-base md:w-auto"
                    >
                        <option value="all">All food types</option>
                        <option value="prepared">Prepared Food</option>
                        <option value="home-cooked">Home Cooked</option>
                        <option value="packaged">Packaged Food</option>
                    </select>

                    <select
                        aria-label="Filter by distance"
                        defaultValue="5"
                        className="h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:px-4 sm:text-base md:w-auto"
                    >
                        <option value="5">Within 5 km</option>
                        <option value="2">Within 2 km</option>
                        <option value="10">Within 10 km</option>
                    </select>

                </div>
            </div>
        </div>
    );
};

export default Search;
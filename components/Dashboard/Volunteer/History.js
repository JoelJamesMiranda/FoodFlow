"use client";

import React, { useState } from "react";

const INITIAL_VISIBLE = 5;

const History = ({ deliveries = [], setActiveTab }) => {
    const [imageErrors, setImageErrors] = useState({});
    const [showAll, setShowAll] = useState(false);

    const visibleDeliveries = showAll
        ? deliveries
        : deliveries.slice(0, INITIAL_VISIBLE);

    if (deliveries.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center sm:py-16">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                    🚴
                </div>

                <h2 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
                    No deliveries yet
                </h2>

                <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-gray-500">
                    Your completed deliveries will show up here, along with
                    the impact you make.
                </p>

                <button
                    type="button"
                    onClick={() => setActiveTab?.("available")}
                    className="mt-5 cursor-pointer rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-green-700 active:scale-[0.98]"
                >
                    Find a delivery
                </button>
            </div>
        );
    }
    console.log(deliveries)

    return (
        <section className="min-w-0 space-y-5">
            {/* Heading */}
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">
                        Delivery history
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                        A record of the meals you've delivered.
                    </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />

                    <span className="text-sm font-semibold tabular-nums text-gray-900">
                        {deliveries.length}
                    </span>

                    <span className="text-sm font-medium text-gray-600">
                        completed
                    </span>
                </div>
            </div>

            {/* Delivery table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                {/* Desktop column headings: 1024px and above */}
                <div className="hidden grid-cols-[minmax(180px,1.7fr)_minmax(100px,0.9fr)_minmax(100px,0.9fr)_minmax(90px,0.8fr)_minmax(95px,0.7fr)] gap-3 border-b border-gray-200 bg-gray-50/80 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 xl:grid-cols-[minmax(200px,1.7fr)_minmax(110px,0.9fr)_minmax(110px,0.9fr)_minmax(100px,0.8fr)_minmax(100px,0.7fr)] xl:gap-4 xl:px-5 lg:grid">
                    <span>Food donation</span>
                    <span className="text-center">Picked up from</span>
                    <span className="text-center">Delivered to</span>
                    <span className="text-center">Date</span>
                    <span className="text-center">Status</span>
                </div>

                <div className="divide-y divide-gray-100">
                    {visibleDeliveries.map((delivery) => {
                        const image = delivery.image;
                        const showImage =
                            image && !imageErrors[delivery.id];

                        const date = delivery.created_at
                            ? new Date(delivery.created_at)
                            : null;

                        const validDate =
                            date && !Number.isNaN(date.getTime());

                        const formattedDate = validDate
                            ? date.toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                              })
                            : "Date unavailable";

                        return (
                            <div
                                key={delivery.id}
                                className="group px-4 py-4 transition-colors duration-200 hover:bg-green-50/40 xl:px-5"
                            >
                                {/* Desktop row */}
                                <div className="hidden grid-cols-[minmax(180px,1.7fr)_minmax(100px,0.9fr)_minmax(100px,0.9fr)_minmax(90px,0.8fr)_minmax(95px,0.7fr)] items-center gap-3 xl:grid-cols-[minmax(200px,1.7fr)_minmax(110px,0.9fr)_minmax(110px,0.9fr)_minmax(100px,0.8fr)_minmax(100px,0.7fr)] xl:gap-4 lg:grid">
                                    {/* Food */}
                                    <div className="flex min-w-0 items-center gap-2.5 xl:gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-orange-50 text-xl ring-1 ring-black/[0.03] xl:h-11 xl:w-11">
                                            {showImage ? (
                                                <img
                                                    src={image}
                                                    alt={
                                                        delivery.foodName ||
                                                        "Delivered food"
                                                    }
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    onError={() =>
                                                        setImageErrors((prev) => ({
                                                            ...prev,
                                                            [delivery.id]: true,
                                                        }))
                                                    }
                                                />
                                            ) : (
                                                "🍱"
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold tracking-[-0.01em] text-gray-900 transition-colors duration-200 group-hover:text-green-800">
                                                {delivery.foodName ||
                                                    "Food donation"}
                                            </p>

                                            <p className="mt-1 text-xs font-medium text-gray-500">
                                                {delivery.category || "Food"}
                                                {delivery.quantity != null && (
                                                    <>
                                                        {" · "}
                                                        {delivery.quantity}{" "}
                                                        {delivery.unit ||
                                                            "servings"}
                                                    </>
                                                )}
                                            </p>

                                            {delivery.id != null && (
                                                <p className="mt-1 text-[11px] font-medium text-gray-400">
                                                    #{delivery.id}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Donor */}
                                    <p
                                        title={delivery.donorName || "Donor"}
                                        className="truncate text-center text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900 "
                                    >
                                        {delivery.donorName || "Donor"}
                                    </p>

                                    {/* Receiver */}
                                    <p
                                        title={
                                            delivery.receiverName || "Receiver"
                                        }
                                        className="truncate text-center text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900"
                                    >
                                        {delivery.receiverName || "Receiver"}
                                    </p>

                                    {/* Centered date */}
                                    <p className="text-center text-sm font-semibold tabular-nums text-gray-600">
                                        {validDate ? formattedDate : "—"}
                                    </p>

                                    {/* Status */}
                                    <div className="flex justify-center">
                                        <span className=" inline-flex items-center gap-1.5 rounded-md border border-green-200/80 bg-green-50 px-2 py-1.5 text-xs font-semibold text-green-700 xl:px-2.5">
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                                            {delivery.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Mobile and tablet layout: below 1024px */}
                                <div className="flex items-start gap-3 lg:hidden">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-orange-50 text-xl ring-1 ring-black/[0.03]">
                                        {showImage ? (
                                            <img
                                                src={image}
                                                alt={
                                                    delivery.foodName ||
                                                    "Delivered food"
                                                }
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                onError={() =>
                                                    setImageErrors((prev) => ({
                                                        ...prev,
                                                        [delivery.id]: true,
                                                    }))
                                                }
                                            />
                                        ) : (
                                            "🍱"
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-start justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-sm font-semibold tracking-[-0.01em] text-gray-900 transition-colors duration-200 group-hover:text-green-800">
                                                    {delivery.foodName ||
                                                        "Food donation"}
                                                </h3>

                                                <p className="mt-1 text-xs font-medium text-gray-500">
                                                    {delivery.category || "Food"}
                                                    {delivery.quantity != null && (
                                                        <>
                                                            {" · "}
                                                            {delivery.quantity}{" "}
                                                            {delivery.unit ||
                                                                "servings"}
                                                        </>
                                                    )}
                                                </p>
                                            </div>

                                            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-green-200/80 bg-green-50 px-2 py-1 text-[11px] font-semibold text-green-700">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                Delivered
                                            </span>
                                        </div>

                                        {/* Donor and receiver */}
                                        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                                                    Picked up from
                                                </p>

                                                <p className="mt-1 truncate text-xs font-semibold text-gray-700">
                                                    {delivery.donorName ||
                                                        "Donor"}
                                                </p>
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
                                                    Delivered to
                                                </p>

                                                <p className="mt-1 truncate text-xs font-semibold text-gray-700">
                                                    {delivery.receiverName ||
                                                        "Receiver"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Date and ID */}
                                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2.5">
                                            <span className="text-xs font-medium text-gray-500">
                                                {formattedDate}
                                            </span>

                                            {delivery.id != null && (
                                                <span className="text-[11px] font-medium text-gray-400">
                                                    ID: #{delivery.id}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View more / View less */}
                {deliveries.length > INITIAL_VISIBLE && (
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-gray-50/60 px-4 py-3 sm:px-5">
                        <p className="text-xs font-medium text-gray-500">
                            Showing{" "}
                            <span className="font-bold tabular-nums text-gray-800">
                                {visibleDeliveries.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-gray-700">
                                {deliveries.length}
                            </span>{" "}
                            deliveries
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowAll((prev) => !prev)}
                            aria-expanded={showAll}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-green-700 transition duration-200 hover:bg-green-100/70 hover:text-green-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-1"
                        >
                            {showAll ? "View less" : "View more"}

                            <svg
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    showAll ? "rotate-180" : ""
                                }`}
                                viewBox="0 0 20 20"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="m5 7.5 5 5 5-5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default History;
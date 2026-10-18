"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const FoodCard = ({ availableFood = [] }) => {
    const [selectedFood, setSelectedFood] = useState(null);
    const [imageErrors, setImageErrors] = useState({});
    const [requesting, setRequesting] = useState(false);

    const handleRequest = async () => {
        if (!selectedFood || requesting) return;

        setRequesting(true);

        try {
            const response = await fetch(`/api/claims/${selectedFood.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    distance: selectedFood.distance.toFixed(1),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Unable to place your request.");
                return;
            }

            toast.success("Order placed successfully!");
            setSelectedFood(null);
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setRequesting(false);
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* FOOD CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {availableFood.map((food) => (
                    <div
                        key={food.id}
                        className="group flex min-w-0 h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                    >
                        {/* IMAGE */}
                        <div className="relative h-44 shrink-0 overflow-hidden bg-gradient-to-br from-green-100 to-orange-50 sm:h-48">
                            {food.image && !imageErrors[food.id] ? (
                                <img
                                    src={food.image}
                                    alt={food.foodName}
                                    onError={() =>
                                        setImageErrors((prev) => ({
                                            ...prev,
                                            [food.id]: true,
                                        }))
                                    }
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-5xl sm:text-6xl">
                                    🍛
                                </div>
                            )}

                            <span className="absolute left-3 top-3 max-w-[60%] truncate rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-green-700 shadow-sm">
                                {food.category}
                            </span>

                            <span className="absolute right-3 top-3 max-w-[55%] truncate rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-white">
                                {food.quantity} {food.unit || "meals"}
                            </span>
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-1 flex-col p-4 sm:p-5">
                            <div className="min-w-0">
                                <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-900 sm:text-lg">
                                    {food.foodName}
                                </h3>

                                <p className="mt-1.5 truncate text-sm text-gray-500">
                                    Donated by{" "}
                                    <span className="font-medium text-gray-700">
                                        {food.donor}
                                    </span>
                                </p>
                            </div>

                            {/* DETAILS */}
                            <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                                <div className="min-w-0 rounded-xl bg-gray-50 px-3 py-3">
                                    <p className="text-xs text-gray-400">
                                        📍 Distance
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {Number(food.distance).toFixed(1)} km away
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-xl bg-gray-50 px-3 py-3">
                                    <p className="text-xs text-gray-400">
                                        ⏰ Best before
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {formatDate(food.bestBeforeDate)}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedFood(food)}
                                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 hover:cursor-pointer"
                            >
                                Request Food <span>→</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY STATE */}
            {availableFood.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-12 text-center sm:py-16">
                    <div className="text-4xl">🍱</div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                        No food available right now
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        Check back soon for new donations near you.
                    </p>
                </div>
            )}

            {/* CONFIRMATION MODAL */}
            {selectedFood && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/50 px-0 py-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
                    onClick={() => !requesting && setSelectedFood(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="food-modal-title"
                        className="flex max-h-[92dvh] w-full min-w-0 flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[88dvh] sm:max-w-lg sm:rounded-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* HEADER */}
                        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-green-600">
                                    Food Request
                                </p>
                                <h2
                                    id="food-modal-title"
                                    className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl"
                                >
                                    Request this food?
                                </h2>
                            </div>

                            <button
                                type="button"
                                aria-label="Close dialog"
                                disabled={requesting}
                                onClick={() => setSelectedFood(null)}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                            >
                                ✕
                            </button>
                        </div>

                        {/* SCROLLABLE CONTENT */}
                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
                            {/* FOOD PREVIEW */}
                            <div className="flex min-w-0 gap-3 rounded-2xl bg-gray-50 p-3 sm:gap-4 sm:p-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-green-100 to-orange-50 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
                                    {selectedFood.image &&
                                    !imageErrors[selectedFood.id] ? (
                                        <img
                                            src={selectedFood.image}
                                            alt={selectedFood.foodName}
                                            onError={() =>
                                                setImageErrors((prev) => ({
                                                    ...prev,
                                                    [selectedFood.id]: true,
                                                }))
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        "🍛"
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="break-words text-base font-bold text-gray-900 sm:text-lg">
                                        {selectedFood.foodName}
                                    </h3>

                                    <span className="mt-1 inline-block max-w-full truncate rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                                        {selectedFood.category}
                                    </span>

                                    <p className="mt-2 break-words text-sm text-gray-500">
                                        Donated by{" "}
                                        <span className="font-medium text-gray-700">
                                            {selectedFood.donor}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* DETAILS */}
                            <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5">
                                <div className="min-w-0 rounded-2xl border border-gray-100 p-3 sm:p-4">
                                    <p className="text-xs text-gray-400">
                                        Quantity
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold text-gray-900 sm:text-base">
                                        {selectedFood.quantity}{" "}
                                        {selectedFood.unit || "meals"}
                                    </p>
                                </div>

                                <div className="min-w-0 rounded-2xl border border-gray-100 p-3 sm:p-4">
                                    <p className="text-xs text-gray-400">
                                        Distance
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold text-gray-900 sm:text-base">
                                        {Number(selectedFood.distance).toFixed(1)} km
                                    </p>
                                </div>

                                <div className="col-span-2 min-w-0 rounded-2xl border border-orange-100 bg-orange-50 p-3 sm:p-4">
                                    <p className="text-xs text-orange-600">
                                        Best Before
                                    </p>
                                    <p className="mt-1 break-words text-sm font-semibold text-orange-900 sm:text-base">
                                        {formatDate(selectedFood.bestBeforeDate)}
                                        {selectedFood.bestBeforeTime && (
                                            <span className="block text-sm font-medium sm:ml-2 sm:inline">
                                                at {selectedFood.bestBeforeTime}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* DONOR NOTE */}
                            {selectedFood.notes && (
                                <div className="mt-4 min-w-0 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                                    <p className="text-xs font-medium text-gray-400">
                                        Donor's Note
                                    </p>
                                    <p className="mt-1.5 break-words text-sm leading-6 text-gray-700">
                                        {selectedFood.notes}
                                    </p>
                                </div>
                            )}

                            {/* MESSAGE */}
                            <div className="mt-4 rounded-2xl bg-green-50 p-3 sm:mt-5 sm:p-4">
                                <div className="flex gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                                        ✓
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-green-900">
                                            Ready to request?
                                        </p>
                                        <p className="mt-1 text-sm leading-5 text-green-700">
                                            By confirming, you submit a request
                                            for this food. Availability is
                                            subject to confirmation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STICKY ACTIONS */}
                        <div className="flex shrink-0 gap-3 border-t border-gray-100 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:py-4">
                            <button
                                type="button"
                                disabled={requesting}
                                onClick={() => setSelectedFood(null)}
                                className="min-h-11 min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={requesting}
                                onClick={handleRequest}
                                className="min-h-11 min-w-0 flex-1 rounded-xl bg-green-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 hover:cursor-pointer"
                            >
                                {requesting ? "Requesting..." : "Confirm Request"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FoodCard;
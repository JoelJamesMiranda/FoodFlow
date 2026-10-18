
"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";

const Available = ({ availableDeliveries = [], activeDelivery }) => {
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [imageErrors, setImageErrors] = useState({});
    const [showAllDeliveries, setShowAllDeliveries] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const INITIAL_DELIVERIES = 4;

    const visibleDeliveries = showAllDeliveries
        ? availableDeliveries
        : availableDeliveries.slice(0, INITIAL_DELIVERIES);

    const handleDelivery = async () => {
        if (!selectedDelivery || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/delivery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedDelivery),
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.error || "Failed to accept delivery");
                return;
            }

            toast.success(
                result.message || "Delivery accepted successfully"
            );
            setSelectedDelivery(null);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return "—";

        return parsedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <section className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-6xl space-y-6 bg-[#F7FAF7] text-[#17211A] sm:space-y-8">
            <ToastContainer />

            {/* Page heading */}
            <header className="flex flex-col gap-4 border-b border-[#E3E8E1] pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
                        <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                        Volunteer opportunities
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Available deliveries
                        <span className="text-[#16A34A]">.</span>
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                        Find nearby food pickups and help get surplus food
                        to people who need it.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span className="text-sm text-gray-500">
                        {activeDelivery
                            ? "Your current delivery"
                            : "Ready to deliver"}
                    </span>

                    <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            activeDelivery
                                ? "bg-orange-50 text-orange-700"
                                : "bg-green-100 text-green-800"
                        }`}
                    >
                        {activeDelivery
                            ? "1 active"
                            : `${availableDeliveries.length} available`}
                    </span>
                </div>
            </header>

            {/* Active delivery notice */}
            {activeDelivery && (
                <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50/70 p-4 sm:p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl">
                        🚚
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#17211A]">
                            You have a delivery in progress
                        </p>

                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Complete your current delivery before accepting
                            another one.
                        </p>

                        <p className="mt-2 text-sm font-semibold text-orange-800">
                            {activeDelivery.foodName}
                            {activeDelivery.donorName
                                ? ` · Pickup from ${activeDelivery.donorName}`
                                : ""}
                        </p>
                    </div>
                </div>
            )}

            {/* Empty state */}
            {availableDeliveries.length === 0 ? (
                <div className="flex min-h-[35vh] flex-col items-center justify-center rounded-2xl border border-[#E3E8E1] bg-white px-5 py-12 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F3EE] text-3xl">
                        🚴
                    </div>

                    <h2 className="text-lg font-bold text-[#17211A]">
                        No deliveries available
                    </h2>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        There are no food deliveries available around you
                        right now. Check back soon to help make a difference.
                    </p>
                </div>
            ) : (
                <div>
                    {/* List heading */}
                    <div className="mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-sm font-bold text-[#17211A] sm:text-base">
                            Nearby opportunities
                        </h2>

                        <p className="text-xs text-gray-400 sm:text-sm">
                            Showing {visibleDeliveries.length} of{" "}
                            {availableDeliveries.length}
                        </p>
                    </div>

                    {/* Delivery list */}
                    <div
                        className={`divide-y divide-[#E3E8E1] overflow-hidden rounded-2xl border border-[#E3E8E1] bg-white transition-opacity ${
                            activeDelivery ? "opacity-60" : ""
                        }`}
                    >
                        {visibleDeliveries.map((delivery) => (
                            <article
                                key={delivery.donation_id}
                                className="px-4 py-4 transition-colors hover:bg-[#FCFDFC] sm:px-5 sm:py-5"
                            >
                                <div className="flex min-w-0 flex-col gap-3.5 sm:flex-row sm:items-start sm:gap-4">
                                    {/* Food image */}
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F7FAF7] text-2xl sm:h-20 sm:w-20 sm:rounded-2xl">
                                        {delivery.image &&
                                        !imageErrors[delivery.donation_id] ? (
                                            <img
                                                src={delivery.image}
                                                alt={
                                                    delivery.foodName ||
                                                    "Available food"
                                                }
                                                onError={() =>
                                                    setImageErrors((prev) => ({
                                                        ...prev,
                                                        [delivery.donation_id]:
                                                            true,
                                                    }))
                                                }
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            "🍛"
                                        )}
                                    </div>

                                    {/* Main information */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-green-700">
                                                    {delivery.quantity}{" "}
                                                    {delivery.unit}
                                                </p>

                                                <h3 className="mt-1 break-words text-base font-bold tracking-tight text-[#17211A] sm:text-lg">
                                                    {delivery.foodName}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Donated by{" "}
                                                    <span className="font-medium text-gray-700">
                                                        {delivery.donorName ||
                                                            "Food donor"}
                                                    </span>
                                                </p>
                                            </div>

                                            <span className="w-fit shrink-0 rounded-full bg-[#F0F3EE] px-2.5 py-1 text-xs font-medium text-gray-600">
                                                Available for pickup
                                            </span>
                                        </div>

                                        {/* Route details */}
                                        <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl bg-[#F7FAF7] p-3.5 min-[420px]:grid-cols-2 sm:max-w-lg sm:bg-transparent sm:p-0">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                        Pickup distance
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-[#17211A]">
                                                        {delivery.volunteerToDonorDistance ??
                                                            "—"}{" "}
                                                        km away
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                                                    <span className="h-2.5 w-2.5 rounded-full bg-[#16A34A]" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                        Delivery distance
                                                    </p>

                                                    <p className="mt-1 text-sm font-semibold text-[#17211A]">
                                                        {delivery.donorToReceiverDistance ??
                                                            "—"}{" "}
                                                        km
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Deadline and action */}
                                        <div className="mt-4 flex flex-col gap-3 border-t border-[#EEF1EB] pt-3.5 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                    Best before
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-green-800">
                                                    <span className="mr-1">
                                                        ⏱
                                                    </span>
                                                    {formatDate(
                                                        delivery.bestBeforeDate
                                                    )}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedDelivery(
                                                        delivery
                                                    )
                                                }
                                                disabled={
                                                    !!activeDelivery ||
                                                    isSubmitting
                                                }
                                                className={`cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors min-[420px]:w-auto ${
                                                    activeDelivery ||
                                                    isSubmitting
                                                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                                        : "bg-[#16A34A] text-white hover:bg-green-700 active:bg-green-800"
                                                }`}
                                            >
                                                {activeDelivery
                                                    ? "Delivery in progress"
                                                    : "Accept delivery"}

                                                {!activeDelivery && (
                                                    <span aria-hidden="true">
                                                        →
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* View more / View less */}
                    {availableDeliveries.length > INITIAL_DELIVERIES && (
                        <div className="mt-4 flex justify-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAllDeliveries((prev) => {
                                        const next = !prev;

                                        if (prev) {
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            });
                                        }

                                        return next;
                                    });
                                }}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#E3E8E1] bg-white px-5 py-2.5 text-sm font-semibold text-[#17211A] transition-colors hover:border-green-200 hover:bg-[#F7FAF7] hover:text-green-700"
                            >
                                {showAllDeliveries
                                    ? "View less"
                                    : `View more (${
                                          availableDeliveries.length -
                                          INITIAL_DELIVERIES
                                      })`}

                                <span
                                    className={`transition-transform duration-200 ${
                                        showAllDeliveries ? "rotate-180" : ""
                                    }`}
                                >
                                    ↓
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Confirmation modal */}
            {selectedDelivery && (
                <ConfirmationModal
                    selectedDelivery={selectedDelivery}
                    setSelectedDelivery={setSelectedDelivery}
                    handleDelivery={handleDelivery}
                />
            )}
        </section>
    );
};

export default Available;

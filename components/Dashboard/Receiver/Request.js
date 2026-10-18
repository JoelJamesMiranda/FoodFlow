
"use client";

import { useState } from "react";

const Request = ({ requests = [], setActiveTab }) => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [imageErrors, setImageErrors] = useState({});
    const [showAllRequests, setShowAllRequests] = useState(false);

    const INITIAL_REQUESTS = 5;

    const visibleRequests = showAllRequests
        ? requests
        : requests.slice(0, INITIAL_REQUESTS);

    const deliverySteps = [
        {
            status: "PENDING",
            title: "Food claimed",
            description: "Your request has been placed.",
        },
        {
            status: "VOLUNTEER_ASSIGNED",
            title: "Volunteer assigned",
            description: "A volunteer is ready to collect your food.",
        },
        {
            status: "PICKED_UP",
            title: "Food picked up",
            description: "Your food has been collected.",
        },
        {
            status: "ON_THE_WAY",
            title: "On the way",
            description: "Your food is on its way to you.",
        },
        {
            status: "DELIVERED",
            title: "Delivered",
            description: "Your delivery has been completed.",
        },
    ];

    const currentStatus = selectedRequest?.status?.toUpperCase();

    const currentStep = deliverySteps.findIndex(
        (step) => step.status === currentStatus
    );

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

    const statusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case "DELIVERED":
                return "bg-green-50 text-green-700";
            case "CANCELLED":
                return "bg-red-50 text-red-600";
            case "ON_THE_WAY":
                return "bg-blue-50 text-blue-700";
            case "PICKED_UP":
            case "VOLUNTEER_ASSIGNED":
                return "bg-emerald-50 text-emerald-700";
            default:
                return "bg-amber-50 text-amber-700";
        }
    };

    const closeModal = () => setSelectedRequest(null);

    return (
        <section className="mx-auto min-h-[calc(100vh-5rem)] w-full max-w-6xl space-y-8 text-[#17211A] sm:space-y-10">

            {/* Page heading */}
            <header className="flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Your FoodFlow activity
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        My requests<span className="text-green-600">.</span>
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                        Follow your food requests from claim to delivery, all in one place.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="text-sm text-gray-500">
                        Total requests
                    </p>

                    <span className="rounded-full bg-green-100 px-3.5 py-1.5 text-sm font-bold text-green-800">
                        {requests.length}
                    </span>
                </div>
            </header>

            {/* Empty state */}
            {requests.length === 0 ? (
                <div className="flex min-h-[45vh] flex-col items-center justify-center py-12 text-center sm:py-20">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                        🍱
                    </div>

                    <h2 className="text-xl font-bold">
                        Nothing on your list yet
                    </h2>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        When you claim available food, your requests and their delivery progress will appear here.
                    </p>

                    <button
                        type="button"
                        onClick={() => setActiveTab("available")}
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                        Explore available food
                        <span className="ml-2">→</span>
                    </button>
                </div>
            ) : (
                <div>
                    {/* List heading */}
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h2 className="text-sm font-bold text-gray-800 sm:text-base">
                            Recent activity
                        </h2>

                        <span className="text-xs text-gray-400 sm:text-sm">
                            Showing {visibleRequests.length} of {requests.length}
                        </span>
                    </div>

                    {/* Continuous request list */}
                    <div className="divide-y divide-gray-200">
                        {visibleRequests.map((request) => {
                            const status = request.status?.toUpperCase();

                            return (
                                <article
                                    key={request.id}
                                    className="group py-5 first:pt-3 last:pb-3 sm:py-6"
                                >
                                    <div className="flex min-w-0 items-start gap-3 sm:gap-5">

                                        {/* Food thumbnail */}
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-50 text-2xl sm:h-20 sm:w-20 sm:rounded-2xl">
                                            {request.image && !imageErrors[request.id] ? (
                                                <img
                                                    src={request.image}
                                                    alt={request.foodName || "Requested food"}
                                                    onError={() =>
                                                        setImageErrors((prev) => ({
                                                            ...prev,
                                                            [request.id]: true,
                                                        }))
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                "🍱"
                                            )}
                                        </div>

                                        {/* Request details */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0">
                                                    <h3 className="break-words text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                                                        {request.foodName}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                                        {request.category}
                                                        <span className="mx-1.5 text-gray-300">/</span>
                                                        {request.quantity} {request.unit}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold sm:text-xs ${statusStyle(status)}`}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                    {status?.replaceAll("_", " ") || "PENDING"}
                                                </span>
                                            </div>

                                            {/* Supporting details */}
                                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 sm:mt-4 sm:text-sm">
                                                <span>
                                                    Donor:{" "}
                                                    <span className="font-medium text-gray-700">
                                                        {request.donorName || "Food donor"}
                                                    </span>
                                                </span>

                                                <span className="text-gray-300">•</span>

                                                <span>
                                                    {formatDate(request.requestedAt)}
                                                </span>

                                                {request.distance != null && (
                                                    <>
                                                        <span className="text-gray-300">•</span>
                                                        <span>
                                                            {request.distance} km away
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Track button */}
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedRequest(request)}
                                                    className="inline-flex items-center gap-2 rounded-lg py-1 text-sm font-semibold text-green-700 transition hover:text-green-800"
                                                >
                                                    Track delivery
                                                    <span className="transition-transform group-hover:translate-x-1">
                                                        →
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* View more / view less */}
                    {requests.length > INITIAL_REQUESTS && (
                        <div className="mt-5 flex justify-center border-t border-gray-200 pt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAllRequests((prev) => !prev);

                                    if (showAllRequests) {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 hover:cursor-pointer"
                            >
                                {showAllRequests ? "View less" : `View more (${requests.length - INITIAL_REQUESTS})`}

                                <span
                                    className={`transition-transform duration-200 ${
                                        showAllRequests ? "rotate-180" : ""
                                    }`}
                                >
                                    ↓
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Tracking modal */}
            {selectedRequest && (
                <div
                    className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
                    onClick={closeModal}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tracking-title"
                        className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[88vh] sm:max-w-xl sm:rounded-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-5 sm:px-7">
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
                                    FoodFlow tracking
                                </p>

                                <h2
                                    id="tracking-title"
                                    className="mt-1 break-words text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
                                >
                                    {selectedRequest.foodName}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {selectedRequest.category} · {selectedRequest.quantity} {selectedRequest.unit}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close delivery tracking"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Scrollable modal body */}
                        <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">

                            {/* Status overview */}
                            <div className="rounded-2xl bg-[#F7FAF7] p-4 sm:p-5">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">
                                            Current status
                                        </p>

                                        <p className="mt-1 text-lg font-bold text-gray-900">
                                            {currentStatus?.replaceAll("_", " ") || "PENDING"}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusStyle(currentStatus)}`}
                                    >
                                        {currentStatus === "DELIVERED"
                                            ? "Completed"
                                            : currentStatus === "CANCELLED"
                                                ? "Cancelled"
                                                : "In progress"}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Requested on
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {formatDate(selectedRequest.requestedAt)}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Distance
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {selectedRequest.distance != null
                                                ? `${selectedRequest.distance} km`
                                                : "—"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 border-t border-gray-200 pt-3">
                                    <p className="text-xs text-gray-500">
                                        Donated by
                                    </p>

                                    <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                                        {selectedRequest.donorName || "Food donor"}
                                    </p>
                                </div>
                            </div>

                            {/* Delivery timeline */}
                            <div className="mt-7">
                                <div className="mb-5 flex items-center justify-between gap-3">
                                    <h3 className="font-bold text-gray-900">
                                        Delivery progress
                                    </h3>

                                    {currentStatus !== "CANCELLED" &&
                                        currentStep >= 0 && (
                                            <span className="text-xs text-gray-500">
                                                Step {currentStep + 1} of {deliverySteps.length}
                                            </span>
                                        )}
                                </div>

                                {currentStatus === "CANCELLED" ? (
                                    <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                                        <p className="font-semibold text-red-800">
                                            This request was cancelled
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-red-700">
                                            The delivery could not be completed. Please check your request details or explore available food.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                closeModal();
                                                setActiveTab("available");
                                            }}
                                            className="mt-3 text-sm font-semibold text-red-800 underline underline-offset-4"
                                        >
                                            Find available food
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        {deliverySteps.map((step, index) => {
                                            const completed =
                                                currentStep >= 0 && index < currentStep;
                                            const active = index === currentStep;
                                            const future =
                                                currentStep < 0 || index > currentStep;

                                            return (
                                                <div
                                                    key={step.status}
                                                    className="relative flex gap-4 pb-6 last:pb-0"
                                                >
                                                    {/* Connecting line */}
                                                    {index < deliverySteps.length - 1 && (
                                                        <div
                                                            className={`absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px ${
                                                                completed
                                                                    ? "bg-green-400"
                                                                    : "bg-gray-200"
                                                            }`}
                                                        />
                                                    )}

                                                    {/* Step marker */}
                                                    <div
                                                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                            completed
                                                                ? "bg-green-600 text-white"
                                                                : active
                                                                    ? "bg-green-600 text-white ring-4 ring-green-100"
                                                                    : "border border-gray-200 bg-white text-gray-400"
                                                        }`}
                                                    >
                                                        {completed ? "✓" : index + 1}
                                                    </div>

                                                    {/* Step information */}
                                                    <div className="min-w-0 flex-1 pt-0.5">
                                                        <p
                                                            className={`text-sm font-semibold ${
                                                                active || completed
                                                                    ? "text-gray-900"
                                                                    : "text-gray-400"
                                                            }`}
                                                        >
                                                            {step.title}
                                                        </p>

                                                        <p
                                                            className={`mt-1 text-xs leading-5 sm:text-sm ${
                                                                future
                                                                    ? "text-gray-400"
                                                                    : "text-gray-500"
                                                            }`}
                                                        >
                                                            {step.description}
                                                        </p>
                                                    </div>

                                                    {active && (
                                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Persistent modal footer */}
                        <div className="border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Close tracking
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </section>
    );
};

export default Request;

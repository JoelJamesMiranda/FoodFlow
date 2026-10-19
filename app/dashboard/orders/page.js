
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function StatusBadge({ status }) {
    const styles = {
        DELIVERED: "bg-green-50 text-green-700 ring-green-600/15",
        CANCELLED: "bg-red-50 text-red-700 ring-red-600/15",
        CLAIMED: "bg-blue-50 text-blue-700 ring-blue-600/15",
        VOLUNTEER_ASSIGNED:
            "bg-amber-50 text-amber-700 ring-amber-600/15",
        PICKED_UP: "bg-amber-50 text-amber-700 ring-amber-600/15",
        ON_THE_WAY: "bg-blue-50 text-blue-700 ring-blue-600/15",
    };

    const labels = {
        DELIVERED: "Delivered",
        CANCELLED: "Cancelled",
        CLAIMED: "Volunteer assigned",
        VOLUNTEER_ASSIGNED: "Volunteer assigned",
        PICKED_UP: "Picked up",
        ON_THE_WAY: "On the way",
    };

    const dotStyles = {
        DELIVERED: "bg-green-500",
        CANCELLED: "bg-red-500",
        CLAIMED: "bg-blue-500",
        VOLUNTEER_ASSIGNED: "bg-amber-500",
        PICKED_UP: "bg-amber-500",
        ON_THE_WAY: "bg-blue-500",
    };

    return (
        <span
            className={`inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ring-inset sm:px-2.5 sm:py-1.5 sm:text-xs ${
                styles[status] ||
                "bg-gray-50 text-gray-600 ring-gray-200"
            }`}
        >
            <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    dotStyles[status] || "bg-gray-400"
                }`}
            />
            {labels[status] || status}
        </span>
    );
}

function FoodImage({
    image,
    foodName,
    imageErrors,
    setImageErrors,
    orderId,
    size = "h-14 w-14",
}) {
    const hasImage = image && !imageErrors[orderId];

    return (
        <div
            className={`flex ${size} shrink-0 items-center justify-center overflow-hidden bg-green-50`}
        >
            {hasImage ? (
                <img
                    src={image}
                    alt={foodName || "Food"}
                    onError={() =>
                        setImageErrors((prev) => ({
                            ...prev,
                            [orderId]: true,
                        }))
                    }
                    className="h-full w-full object-cover"
                />
            ) : (
                <span
                    className="text-2xl"
                    role="img"
                    aria-label="Food"
                >
                    🍱
                </span>
            )}
        </div>
    );
}

function formatDate(value, includeYear = false) {
    if (!value) return "--";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "--";

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        ...(includeYear ? { year: "numeric" } : {}),
    });
}

function formatTime(value) {
    if (!value) return "--";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "--";

    return date.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

function DeliveryProgress({ status }) {
    const steps = [
        { label: "Assigned", icon: "1" },
        { label: "Picked up", icon: "2" },
        { label: "On the way", icon: "3" },
        { label: "Delivered", icon: "4" },
    ];

    const stage = {
        CLAIMED: 0,
        VOLUNTEER_ASSIGNED: 0,
        PICKED_UP: 1,
        ON_THE_WAY: 2,
        DELIVERED: 3,
    }[status] ?? 0;

    return (
        <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-[#17211A]">
                    Delivery progress
                </h3>

                <span className="text-xs font-medium text-gray-500">
                    Step {stage + 1} of 4
                </span>
            </div>

            <div className="flex items-start">
                {steps.map((step, index) => {
                    const completed = index <= stage;

                    return (
                        <div
                            key={step.label}
                            className="relative flex min-w-0 flex-1 flex-col items-center"
                        >
                            {index !== 0 && (
                                <div
                                    className={`absolute right-1/2 top-4 h-0.5 w-full ${
                                        index <= stage
                                            ? "bg-green-500"
                                            : "bg-gray-200"
                                    }`}
                                />
                            )}

                            <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                    completed
                                        ? "bg-green-600 text-white"
                                        : "border border-gray-200 bg-white text-gray-400"
                                }`}
                            >
                                {index < stage ? "✓" : step.icon}
                            </div>

                            <p
                                className={`mt-2 text-center text-[10px] leading-4 sm:text-xs ${
                                    completed
                                        ? "font-semibold text-green-800"
                                        : "text-gray-400"
                                }`}
                            >
                                {step.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ActiveOrderCard({
    order,
    imageErrors,
    setImageErrors,
}) {
    const isDelivered = order.status === "DELIVERED";

    return (
        <article className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm sm:rounded-3xl">
            <div className="p-4 sm:p-6">
                {/* Order summary */}
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <FoodImage
                        image={order.image}
                        foodName={order.foodName}
                        imageErrors={imageErrors}
                        setImageErrors={setImageErrors}
                        orderId={`active-${order.id}`}
                        size="h-16 w-16 rounded-xl sm:h-20 sm:w-20 sm:rounded-2xl"
                    />

                    <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                            Order #{order.id}
                        </p>

                        <h3 className="mt-1 break-words text-base font-bold tracking-tight text-[#17211A] sm:text-xl">
                            {order.foodName}
                        </h3>

                        <p className="mt-1 break-words text-sm leading-5 text-gray-500">
                            {order.quantity} {order.unit}
                            {order.donorName
                                ? ` · ${order.donorName}`
                                : ""}
                        </p>

                        <div className="mt-3">
                            <StatusBadge status={order.status} />
                        </div>
                    </div>
                </div>

                {/* Delivery statistics */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3">
                    <div className="min-w-0 rounded-xl bg-green-50/80 p-3 sm:rounded-2xl sm:p-4">
                        <div className="flex items-center gap-2 text-green-700">
                            <span className="text-base">◷</span>
                            <p className="text-xs font-medium">
                                Estimated arrival
                            </p>
                        </div>

                        <p className="mt-3 text-2xl font-bold tracking-tight text-green-900 sm:text-3xl">
                            {order.eta ?? "--"}
                            <span className="ml-1 text-sm font-medium">
                                min
                            </span>
                        </p>
                    </div>

                    <div className="min-w-0 rounded-xl bg-[#F7FAF7] p-3 sm:rounded-2xl sm:p-4">
                        <div className="flex items-center gap-2 text-gray-500">
                            <span className="text-base">↗</span>
                            <p className="text-xs font-medium">
                                Distance left
                            </p>
                        </div>

                        <p className="mt-3 break-words text-2xl font-bold tracking-tight text-[#17211A] sm:text-3xl">
                            {order.distance ?? "--"}
                            <span className="ml-1 text-sm font-medium text-gray-500">
                                km
                            </span>
                        </p>
                    </div>

                    <div className="col-span-2 min-w-0 rounded-xl border border-gray-100 p-3 sm:col-span-1 sm:rounded-2xl sm:p-4">
                        <p className="text-xs font-medium text-gray-500">
                            Requested on
                        </p>

                        <p className="mt-2 text-lg font-bold text-[#17211A] sm:mt-3">
                            {formatTime(order.requestedAt)}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            {formatDate(order.requestedAt, true)}
                        </p>
                    </div>
                </div>

                {/* Delivery progress */}
                <DeliveryProgress status={order.status} />

                {/* Route preview */}
                <div className="relative mt-6 overflow-hidden rounded-2xl border border-green-100 bg-[#F1F7F0] p-4 sm:p-6">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-50"
                        aria-hidden="true"
                    >
                        <div className="absolute left-[22%] top-0 h-full w-px rotate-12 bg-green-200" />
                        <div className="absolute left-[70%] top-0 h-full w-px -rotate-12 bg-green-200" />
                        <div className="absolute left-0 top-1/3 h-px w-full rotate-3 bg-green-200" />
                        <div className="absolute left-0 top-2/3 h-px w-full -rotate-6 bg-green-200" />
                    </div>

                    <div className="relative flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                            {isDelivered ? "✓" : "🗺️"}
                        </div>

                        <div className="min-w-0">
                            <p className="break-words text-sm font-semibold text-[#17211A] sm:text-base">
                                {isDelivered
                                    ? "Delivery completed"
                                    : "Your food is on its way"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                                {isDelivered
                                    ? "Thank you for being part of FoodFlow."
                                    : "Your delivery status is updated automatically."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Volunteer details */}
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-xl">
                            🚴
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">
                                Delivery volunteer
                            </p>

                            <p className="mt-1 truncate text-sm font-bold text-[#17211A]">
                                {order.volunteerName ||
                                    "Volunteer assigned"}
                            </p>
                        </div>
                    </div>

                    <span className="ml-14 inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-800 sm:ml-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        FoodFlow volunteer
                    </span>
                </div>
            </div>
        </article>
    );
}

function OrderHistoryRow({
    order,
    imageErrors,
    setImageErrors,
}) {
    return (
        <article className="p-4 transition-colors hover:bg-[#FAFCFA] sm:p-5">
            {/* Food details */}
            <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <FoodImage
                    image={order.image}
                    foodName={order.foodName}
                    imageErrors={imageErrors}
                    setImageErrors={setImageErrors}
                    orderId={order.id}
                    size="h-14 w-14 rounded-xl sm:h-16 sm:w-16 sm:rounded-2xl"
                />

                <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-bold leading-5 text-[#17211A] sm:text-base">
                        {order.foodName || "Food request"}
                    </h3>

                    <p className="mt-1 break-words text-xs leading-5 text-gray-500 sm:text-sm">
                        {order.quantity} {order.unit}
                        {order.donorName
                            ? ` · ${order.donorName}`
                            : ""}
                    </p>

                    <p className="mt-1.5 text-[11px] text-gray-400 sm:text-xs">
                        Order #{order.id} ·{" "}
                        {formatDate(order.requestedAt, true)}
                    </p>
                </div>

                {/* Desktop status */}
                <div className="hidden shrink-0 sm:block">
                    <StatusBadge status={order.status} />
                </div>
            </div>

            {/* Mobile status and time */}
            <div className="mt-3 flex min-w-0 items-center justify-between gap-2 border-t border-gray-100 pt-3 sm:hidden">
                <StatusBadge status={order.status} />

                <span className="shrink-0 text-[11px] font-medium text-gray-400">
                    {formatTime(order.requestedAt)}
                </span>
            </div>
        </article>
    );
}

function OrderHistorySkeleton() {
    return (
        <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse p-4 sm:p-5">
                    <div className="flex gap-3 sm:gap-4">
                        <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-100 sm:h-16 sm:w-16 sm:rounded-2xl" />

                        <div className="min-w-0 flex-1 py-1">
                            <div className="h-4 w-36 max-w-full rounded bg-gray-100" />
                            <div className="mt-3 h-3 w-44 max-w-full rounded bg-gray-100" />
                            <div className="mt-3 h-3 w-32 max-w-full rounded bg-gray-100" />
                        </div>
                    </div>

                    <div className="mt-4 h-7 w-28 rounded-full bg-gray-100 sm:hidden" />
                </div>
            ))}
        </div>
    );
}

export default function OrdersPage() {
    const [imageErrors, setImageErrors] = useState({});
    const [activeOrder, setActiveOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("ALL");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const response = await fetch("/api/myorders", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const result = await response.json();

                if (isMounted) {
                    setOrders(result.myRequests ?? []);
                    setActiveOrder(result.activeOrders?.[0] ?? null);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching orders:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        getData();

        const interval = setInterval(getData, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    const filteredOrders = orders.filter((order) => {
        if (activeTab === "DELIVERED") {
            return order.status === "DELIVERED";
        }

        if (activeTab === "CANCELLED") {
            return order.status === "CANCELLED";
        }

        return true;
    });

    const tabs = [
        {
            label: "All orders",
            value: "ALL",
            count: orders.length,
        },
        {
            label: "Delivered",
            value: "DELIVERED",
            count: orders.filter(
                (order) => order.status === "DELIVERED"
            ).length,
        },
        {
            label: "Cancelled",
            value: "CANCELLED",
            count: orders.filter(
                (order) => order.status === "CANCELLED"
            ).length,
        },
    ];

    return (
        <main className="min-h-screen overflow-x-clip bg-[#F7FAF7] text-[#17211A]">
            <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-9 lg:px-8">
                {/* Page header */}
                <header className="mb-8">
                    <Link
                        href="/dashboard/receiver"
                        className="mb-5 inline-flex min-h-9 items-center gap-2 rounded-lg text-sm font-medium text-gray-500 transition hover:text-green-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600"
                    >
                        <span aria-hidden="true">←</span>
                        Back to dashboard
                    </Link>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />

                                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-green-700 sm:text-xs sm:tracking-[0.16em]">
                                    Your FoodFlow activity
                                </p>
                            </div>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                                My orders
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                                Follow your deliveries and keep track of
                                every food request in one place.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/receiver"
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#15803D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto"
                        >
                            <span className="text-lg leading-none">+</span>
                            Find food
                        </Link>
                    </div>
                </header>

                {/* Active delivery */}
                <section className="mb-9 sm:mb-10">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h2 className="text-lg font-bold sm:text-xl">
                                Active delivery
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Your current food request
                            </p>
                        </div>

                        {activeOrder && (
                            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-green-100 bg-white px-2.5 py-2 text-[11px] font-semibold text-green-800 sm:px-3 sm:text-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                In progress
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 sm:rounded-3xl sm:p-8">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-100 sm:rounded-2xl" />

                                <div className="min-w-0 flex-1 py-1">
                                    <div className="h-3 w-20 rounded bg-gray-100" />
                                    <div className="mt-3 h-5 w-40 max-w-full rounded bg-gray-100" />
                                    <div className="mt-3 h-4 w-28 max-w-full rounded bg-gray-100" />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <div className="h-24 rounded-xl bg-gray-100 sm:rounded-2xl" />
                                <div className="h-24 rounded-xl bg-gray-100 sm:rounded-2xl" />
                                <div className="col-span-2 h-24 rounded-xl bg-gray-100 sm:col-span-1 sm:rounded-2xl" />
                            </div>
                        </div>
                    ) : activeOrder ? (
                        <ActiveOrderCard
                            order={activeOrder}
                            imageErrors={imageErrors}
                            setImageErrors={setImageErrors}
                        />
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-9 text-center sm:rounded-3xl sm:px-8 sm:py-14">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl sm:h-16 sm:w-16">
                                📦
                            </div>

                            <h3 className="mt-5 text-lg font-bold">
                                No active deliveries
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                When you request food, you can follow its
                                progress here. There is always a chance to
                                make a difference with your next request.
                            </p>

                            <Link
                                href="/dashboard/receiver"
                                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#16A34A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#15803D]"
                            >
                                Explore available food
                            </Link>
                        </div>
                    )}
                </section>

                {/* Order history */}
                <section className="min-w-0">
                    <div className="mb-4 sm:mb-5">
                        <h2 className="text-lg font-bold sm:text-xl">
                            Order history
                        </h2>

                        <p className="mt-1 text-sm leading-5 text-gray-500">
                            Review the status of your previous requests.
                        </p>
                    </div>

                    {/* Responsive filters */}
                    <div
                        className="-mx-4 mb-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
                        aria-label="Filter order history"
                    >
                        <div className="flex w-max gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() =>
                                        setActiveTab(tab.value)
                                    }
                                    aria-pressed={activeTab === tab.value}
                                    className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:px-4 sm:text-sm ${
                                        activeTab === tab.value
                                            ? "bg-[#17211A] text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:border-green-200 hover:bg-green-50"
                                    }`}
                                >
                                    {tab.label}

                                    <span
                                        className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                                            activeTab === tab.value
                                                ? "bg-white/15 text-white"
                                                : "bg-gray-100 text-gray-500"
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* History list */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white sm:rounded-3xl">
                        {isLoading ? (
                            <OrderHistorySkeleton />
                        ) : filteredOrders.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <OrderHistoryRow
                                        key={order.id}
                                        order={order}
                                        imageErrors={imageErrors}
                                        setImageErrors={setImageErrors}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="px-5 py-10 text-center sm:px-8 sm:py-14">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-xl">
                                    🧾
                                </div>

                                <h3 className="mt-4 font-bold">
                                    No orders found
                                </h3>

                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                    {activeTab === "ALL"
                                        ? "Your food requests will appear here once you place an order."
                                        : `You don't have any ${
                                              activeTab === "DELIVERED"
                                                  ? "delivered"
                                                  : "cancelled"
                                          } orders yet.`}
                                </p>

                                {activeTab === "ALL" && (
                                    <Link
                                        href="/dashboard/receiver"
                                        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                    >
                                        Find food →
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-8 border-t border-gray-200 py-6 text-center text-xs text-gray-400 sm:mt-10">
                    FoodFlow · Sharing food, reducing waste.
                </footer>
            </div>
        </main>
    );
}

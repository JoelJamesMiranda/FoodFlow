
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function StatusBadge({ status }) {
    const styles = {
        DELIVERED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
        CLAIMED: "bg-blue-100 text-blue-700",
        VOLUNTEER_ASSIGNED: "bg-amber-100 text-amber-700",
        PICKED_UP: "bg-amber-100 text-amber-700",
        ON_THE_WAY: "bg-blue-100 text-blue-700",
    };

    const labels = {
        DELIVERED: "Delivered",
        CANCELLED: "Cancelled",
        CLAIMED: "Volunteer assigned",
        PICKED_UP: "Picked up",
        ON_THE_WAY: "On the way",
        VOLUNTEER_ASSIGNED: "Volunteer assigned",
    };

    return (
        <span
            className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status] || "bg-gray-100 text-gray-600"
            }`}
        >
            {labels[status] || status}
        </span>
    );
}

function FoodImage({ image, foodName, imageErrors, setImageErrors, orderId, size = "h-14 w-14" }) {
    const hasImage = image && !imageErrors[orderId];

    return (
        <div
            className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-50 text-2xl`}
        >
            {hasImage ? (
                <img
                    src={image}
                    alt={foodName || "Food"}
                    onError={() => {
                        setImageErrors((prev) => ({
                            ...prev,
                            [orderId]: true,
                        }));
                    }}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span role="img" aria-label="Food">
                    🍱
                </span>
            )}
        </div>
    );
}

function ActiveOrderCard({ order, imageErrors, setImageErrors }) {
    
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Order heading */}
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex min-w-0 items-start gap-4">
                    <FoodImage
                        image={order.image}
                        foodName={order.foodName}
                        imageErrors={imageErrors}
                        setImageErrors={setImageErrors}
                        orderId={`active-${order.id}`}
                        size="h-16 w-16"
                    />

                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-400">
                            ORDER #{order.id}
                        </p>

                        <h3 className="mt-1 text-lg font-bold">
                            {order.foodName}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {order.quantity} {order.unit} · {order.donorName}
                        </p>
                    </div>
                </div>

                <StatusBadge status={order.status} />
            </div>

            {/* Delivery progress */}
            <div className="p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-green-50 p-4">
                        <p className="text-xs font-medium text-green-700">
                            Estimated arrival
                        </p>

                        <p className="mt-2 text-2xl font-bold text-green-800">
                            {order.eta ?? "--"} min
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs font-medium text-gray-500">
                            Distance remaining
                        </p>

                        <p className="mt-2 text-2xl font-bold">
                            {order.distance ?? "--"} km
                        </p>
                    </div>

                    <div className="col-span-2 rounded-xl bg-gray-50 p-4 sm:col-span-1">
                        <p className="text-xs font-medium text-gray-500">
                            Requested on
                        </p>

                        <p className="mt-2 text-xl font-bold">
                            {order.requestedAt
                                ? new Date(order.requestedAt).toLocaleTimeString(
                                      "en-IN",
                                      {
                                          hour: "numeric",
                                          minute: "2-digit",
                                          hour12: true,
                                      }
                                  )
                                : "--"}
                        </p>
                    </div>
                </div>

                {/* Map placeholder */}
                <div className="relative mt-5 flex min-h-44 flex-col items-center justify-center overflow-hidden rounded-xl border border-green-100 bg-[#F1F7F0] p-5 text-center">
                    <div className="absolute inset-0 opacity-40">
                        <div className="absolute left-1/4 top-0 h-full w-px rotate-12 bg-green-200" />
                        <div className="absolute left-2/3 top-0 h-full w-px -rotate-12 bg-green-200" />
                        <div className="absolute left-0 top-1/3 h-px w-full rotate-3 bg-green-200" />
                        <div className="absolute left-0 top-2/3 h-px w-full -rotate-6 bg-green-200" />
                    </div>

                    <span className="relative text-3xl">🗺️</span>

                    <p className="relative mt-2 font-semibold">
                        Your delivery is on the way
                    </p>

                    <p className="relative mt-1 text-sm text-gray-500">
                        Live route tracking will appear here
                    </p>
                </div>

                {/* Volunteer details */}
                <div className="mt-5 flex flex-col gap-4 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl">
                            🚴
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Your delivery volunteer
                            </p>

                            <p className="mt-1 font-bold">
                                {order.volunteerName || "Volunteer assigned"}
                            </p>

                            <p className="mt-1 text-xs text-green-700">
                                Assigned to your order
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                        <span className="font-semibold">
                            FoodFlow volunteer
                        </span>

                        <p className="mt-1 text-xs text-green-700">
                            Thank you for choosing food rescue!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrdersPage() {
    const [imageErrors, setImageErrors] = useState({});
    const [activeOrder, setActiveOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("ALL");

    console.log("Active order:", activeOrder);
    console.log("Active order image:", activeOrder?.image);

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const response = await fetch("/api/myorders", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    console.error("Failed to fetch orders");
                    return;
                }

                const result = await response.json();

                if (isMounted) {
                    setOrders(result.myRequests ?? []);
                    setActiveOrder(result.activeOrders?.[0] ?? null);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
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

    return (
        <main className="min-h-screen bg-[#F7FAF7] text-[#17211A]">
            <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
                {/* Header */}
                <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <Link
                            href="/dashboard/receiver"
                            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
                        >
                            <span>←</span> Back to dashboard
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            My Orders
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            Track your food requests and revisit previous deliveries.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/receiver"
                        className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:self-auto"
                    >
                        <span>+</span> Find food
                    </Link>
                </header>

                {/* Active order */}
                <section className="mb-10">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Active delivery</h2>

                        {activeOrder && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                In progress
                            </span>
                        )}
                    </div>

                    {activeOrder ? (
                        <ActiveOrderCard
                            order={activeOrder}
                            imageErrors={imageErrors}
                            setImageErrors={setImageErrors}
                        />
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                                📦
                            </div>

                            <h3 className="text-lg font-bold">
                                No active orders
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                Your current deliveries will appear here. Explore available
                                food and request a donation whenever you need it.
                            </p>

                            <Link
                                href="/dashboard/receiver"
                                className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Explore available food
                            </Link>
                        </div>
                    )}
                </section>

                {/* Order history */}
                <section>
                    <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold">Order history</h2>

                            <p className="mt-1 text-sm text-gray-500">
                                View the status of your previous requests.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {[
                                { label: "All orders", value: "ALL" },
                                { label: "Delivered", value: "DELIVERED" },
                                { label: "Cancelled", value: "CANCELLED" },
                            ].map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setActiveTab(tab.value)}
                                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition hover:cursor-pointer sm:text-sm ${
                                        activeTab === tab.value
                                            ? "bg-green-600 text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:bg-green-50"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                        {filteredOrders.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex flex-col gap-4 p-5 transition hover:bg-gray-50/70 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex min-w-0 items-start gap-4">
                                            <FoodImage
                                                image={order.image}
                                                foodName={order.foodName}
                                                imageErrors={imageErrors}
                                                setImageErrors={setImageErrors}
                                                orderId={order.id}
                                                size="h-14 w-14"
                                            />

                                            <div className="min-w-0">
                                                <h3 className="font-bold">
                                                    {order.foodName}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {order.quantity} {order.unit} · {order.donorName}
                                                </p>

                                                <p className="mt-2 text-xs text-gray-400">
                                                    Order #{order.id} ·{" "}
                                                    {order.requestedAt
                                                        ? new Date(
                                                              order.requestedAt
                                                          ).toLocaleDateString("en-IN", {
                                                              day: "numeric",
                                                              month: "short",
                                                              year: "numeric",
                                                          })
                                                        : "--"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                                            <StatusBadge status={order.status} />
                                            <span className="text-lg text-gray-400">
                                                ›
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <p className="font-semibold">No orders found</p>

                                <p className="mt-2 text-sm text-gray-500">
                                    There are no orders in this category yet.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <footer className="mt-10 border-t border-gray-200 py-6 text-center text-xs text-gray-400">
                    FoodFlow · Sharing food, reducing waste.
                </footer>
            </div>
        </main>
    );
}

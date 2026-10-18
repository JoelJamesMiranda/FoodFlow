"use client";

import React, { useState, useEffect } from "react";

const ActiveDelivery = ({
    currentDeliveryDetials,
    onDeliveryCompleted
}) => {

    const [routeInfo, setRouteInfo] = useState(null);
    const [routeLoading, setRouteLoading] = useState(true);

    const [status, setStatus] = useState(currentDeliveryDetials.status);
    const [loading, setLoading] = useState(false);

    const isPickedUp = status === "PICKED_UP";

    useEffect(() => {
        if (!currentDeliveryDetials?.id) return;

        let isMounted = true;
        let isFetching = false;

        const getRoute = async () => {
            if (isFetching) return;

            isFetching = true;

            try {
                const response = await fetch("/api/volunteer/route", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store",
                    body: JSON.stringify({
                        deliveryId: currentDeliveryDetials.id,
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    // console.error("Route API error:", result.error);
                    return;
                }

                if (isMounted) {
                    setRouteInfo(result);
                    setRouteLoading(false);
                }
            } catch (error) {
                console.error("Failed to get route:", error);
            } finally {
                isFetching = false;
            }
        };

        getRoute(); // Fetch immediately

        const intervalId = setInterval(() => {
            getRoute(); // Fetch every 10 seconds
        }, 10_000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [currentDeliveryDetials?.id]);

    console.log("routeInfo", routeInfo)

    const handlePickedUp = async () => {

        setLoading(true);

        try {

            const response = await fetch("/api/volunteer", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    deliveryId: currentDeliveryDetials.id,
                    claim_id: currentDeliveryDetials.claim_id,
                    donation_id: currentDeliveryDetials.donation_id,
                    status: "PICKED_UP"
                })
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result.error);
                return;
            }

            setStatus("PICKED_UP");

        } catch (error) {

            console.error("Failed to update delivery:", error);

        } finally {

            setLoading(false);

        }
    };

    const handleMarkDelivery = async () => {

        setLoading(true);

        try {

            const response = await fetch("/api/volunteer", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    deliveryId: currentDeliveryDetials.id,
                    claim_id: currentDeliveryDetials.claim_id,
                    donation_id: currentDeliveryDetials.donation_id,
                    status: "DELIVERED"
                })
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(result.error);
                return;
            }

            setStatus("DELIVERED");

        } catch (error) {

            console.error("Failed to complete delivery:", error);

        } finally {

            setLoading(false);

        }
    };


    const formatDistance = (meters) => {
        if (meters == null) return "--";

        if (meters < 1000) {
            return `${Math.round(meters)} m`;
        }

        return `${(meters / 1000).toFixed(1)} km`;
    };

    const formatDuration = (seconds) => {
        if (seconds == null) return "--";

        const minutes = Math.round(seconds / 60);

        if (minutes < 60) {
            return `${minutes} min`;
        }

        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if (remainingMinutes === 0) {
            return `${hours} hr`;
        }

        return `${hours} hr ${remainingMinutes} min`;
    };

    if (status === "DELIVERED") {
        return (
            <div className="bg-white border border-gray-100 rounded-2xl p-10 mb-10 text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center text-3xl">
                    ✓
                </div>

                <h2 className="text-xl font-bold mt-5">
                    Delivery completed!
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    Thank you for helping FoodFlow get this meal where it was needed.
                </p>

                <button
                    onClick={onDeliveryCompleted}
                    className="hover:cursor-pointer mt-6 px-8 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition"
                >
                    Okay
                </button>

            </div>
        );
    }


    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 mb-10">

            {/* ----------------------------------- */}
            {/* HEADER */}
            {/* ----------------------------------- */}

            <div className="flex items-start justify-between mb-7">

                <div>

                    <div className="flex items-center gap-2">

                        <span className="relative flex h-2.5 w-2.5">

                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>

                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>

                        </span>

                        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                            Active Delivery
                        </p>

                    </div>


                    <h2 className="text-xl font-bold mt-1">

                        {isPickedUp
                            ? "On the way to receiver"
                            : "Ready for pickup"
                        }

                    </h2>


                    <p className="text-sm text-gray-500 mt-1">

                        {isPickedUp
                            ? "Food has been picked up. Complete the delivery."
                            : "Head to the pickup location to collect the food."
                        }

                    </p>

                </div>


                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl">
                    🚴
                </div>

            </div>


            {/* ----------------------------------- */}
            {/* PROGRESS */}
            {/* ----------------------------------- */}

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-5">

                <div className="flex items-center justify-between mb-5">

                    <p className="text-sm font-semibold text-gray-700">
                        Delivery progress
                    </p>


                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-600">

                        {isPickedUp
                            ? "On the way"
                            : "Pickup pending"
                        }

                    </span>

                </div>


                <div className="flex items-center">

                    {/* PICKUP */}

                    <div className="flex flex-col items-center shrink-0">

                        <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${isPickedUp
                                ? "bg-green-500 text-white"
                                : "bg-orange-500 text-white"
                                }`}
                        >

                            {isPickedUp ? "✓" : "1"}

                        </div>


                        <span
                            className={`text-xs mt-2 font-medium ${isPickedUp
                                ? "text-green-600"
                                : "text-orange-600"
                                }`}
                        >
                            Pickup
                        </span>

                    </div>


                    {/* PROGRESS LINE */}

                    <div className="h-1 flex-1 mx-3 rounded-full bg-gray-200 overflow-hidden">

                        <div
                            className={`h-full rounded-full transition-all duration-500 ${isPickedUp
                                ? "w-full bg-green-500"
                                : "w-0"
                                }`}
                        />

                    </div>


                    {/* DELIVERY */}

                    <div className="flex flex-col items-center shrink-0">

                        <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${isPickedUp
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-400"
                                }`}
                        >
                            2
                        </div>


                        <span
                            className={`text-xs mt-2 font-medium ${isPickedUp
                                ? "text-orange-600"
                                : "text-gray-400"
                                }`}
                        >
                            Delivery
                        </span>

                    </div>

                </div>

            </div>


            {/* ----------------------------------- */}
            {/* FOOD INFORMATION */}
            {/* ----------------------------------- */}

            <div className="border border-gray-100 rounded-xl p-5 mb-5">

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                            Food to deliver
                        </p>


                        <h3 className="text-lg font-bold mt-1">
                            {currentDeliveryDetials.foodName}
                        </h3>


                        <p className="text-sm text-gray-500 mt-1">
                            {currentDeliveryDetials.category}
                        </p>

                    </div>


                    <span className="shrink-0 px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-xs font-semibold">

                        {currentDeliveryDetials.quantity}{" "}
                        {currentDeliveryDetials.unit}

                    </span>

                </div>

            </div>


            {/* ----------------------------------- */}
            {/* DELIVERY ROUTE */}
            {/* ----------------------------------- */}

            <div className="border border-gray-100 rounded-xl p-5 mb-5">

                <p className="text-xs text-gray-400 uppercase tracking-wide mb-5">
                    Delivery route
                </p>


                {/* PICKUP */}

                <div className="flex gap-4">

                    <div className="flex flex-col items-center">

                        <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center ${isPickedUp
                                ? "bg-green-50 text-green-600"
                                : "bg-orange-50 text-orange-600"
                                }`}
                        >
                            📦
                        </div>


                        <div className="w-px h-12 bg-gray-200"></div>

                    </div>


                    <div className="pb-5">

                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                            Pickup from
                        </p>


                        <h4 className="font-semibold mt-1">
                            {currentDeliveryDetials.donorName}
                        </h4>


                        <p className="text-sm text-gray-500 mt-1">
                            {currentDeliveryDetials.donorAddress}
                        </p>


                        {!isPickedUp && (
                            <button className="hover:cursor-pointer text-sm text-orange-500 font-medium mt-2 hover:text-orange-600">
                                Get directions →
                            </button>
                        )}

                    </div>

                </div>


                {/* RECEIVER */}

                <div className="flex gap-4">

                    <div className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                        📍
                    </div>


                    <div>

                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                            Deliver to
                        </p>


                        <h4 className="font-semibold mt-1">
                            {currentDeliveryDetials.receiverName}
                        </h4>


                        <p className="text-sm text-gray-500 mt-1">
                            {currentDeliveryDetials.receiverAddress}
                        </p>


                        {isPickedUp && (
                            <button className="hover:cursor-pointer text-sm text-green-600 font-medium mt-2 hover:text-green-700">
                                Get directions →
                            </button>
                        )}

                    </div>

                </div>

            </div>


            {/* ----------------------------------- */}
            {/* DISTANCE / ETA */}
            {/* ----------------------------------- */}

            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                        Distance left
                    </p>

                    <p className="text-lg font-bold mt-1">
                        {routeLoading
                            ? "Calculating..."
                            : formatDistance(routeInfo?.distance)
                        }
                    </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                        Est. time
                    </p>

                    <p className="text-lg font-bold mt-1">
                        {routeLoading
                            ? "Calculating..."
                            : formatDuration(routeInfo?.duration)
                        }
                    </p>
                </div>
            </div>


            {/* ----------------------------------- */}
            {/* ACTION */}
            {/* ----------------------------------- */}

            {!isPickedUp ? (

                <button
                    onClick={handlePickedUp}
                    disabled={loading}
                    className="hover:cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition"
                >

                    {loading
                        ? "Updating..."
                        : "Mark as Picked Up"
                    }

                </button>

            ) : (

                <button
                    onClick={handleMarkDelivery}
                    disabled={loading}
                    className="hover:cursor-pointer w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition"
                >

                    {loading
                        ? "Completing..."
                        : "Mark as Delivered"
                    }

                </button>

            )}

        </div>
    );
};

export default ActiveDelivery;
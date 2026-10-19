"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Dashboard/Receiver/Header";
import Search from "@/components/Dashboard/Receiver/Search";
import FoodCard from "@/components/Dashboard/Receiver/FoodCard";
import Request from "@/components/Dashboard/Receiver/Request";
import Working from "@/components/Dashboard/Receiver/Working";
import Footer from "@/components/home/Footer";
import MissingAddress from "@/components/Dashboard/MissingAddress";

export default function ReceiverDashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("available");
    const [address, setaddress] = useState(null);
    const [requests, setRequests] = useState([]);
    const [availableFood, setAvailableFood] = useState([]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 9;

    const getData = useCallback(async () => {
        try {
            const response = await fetch("/api/receiver", {
                cache: "no-store",
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(result.error);
                return;
            }

            setaddress(result.addressPresent);
            setAvailableFood(result.availableFood);
            setRequests(result.myRequests);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const fetchReceverData = async () => {
            try {
                await Promise.all([
                    getData(),
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReceverData();

        const interval = setInterval(() => {
            fetchReceverData();
        }, 20000);

        return () => clearInterval(interval);
    }, []);

    
    // Pagination calculations
    const totalPages = Math.ceil(
        availableFood.length / itemsPerPage
    );
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    
    const currentFood = availableFood.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    
    // Reset to first page when food list changes
    useEffect(() => {
        setCurrentPage(1);
    }, [availableFood.length]);
    
    
    if(isLoading){
        return (<div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-[#16A34A]" />

                    <p className="text-lg font-medium text-[#17211A]">
                        Fetching data...
                    </p>
                </div>)
    }
    

    return (
        <main className="min-h-screen bg-[#F7FAF7] text-[#17211A]">

            {
                address === null ? (

                    <MissingAddress />

                ) : (

                    <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">

                        {/* HEADER */}
                        <Header />


                        {/* SEARCH */}
                        <Search />


                        {/* TABS */}
                        <div className="flex items-center gap-6 border-b border-gray-200 mb-6">

                            <button
                                onClick={() => setActiveTab("available")}
                                className={`hover:cursor-pointer hover:text-green-600 pb-3 text-sm font-semibold border-b-2 transition ${activeTab === "available"
                                    ? "text-green-600 border-green-600"
                                    : "text-gray-500 border-transparent"
                                    }`}
                            >
                                Available Food
                            </button>


                            <button
                                onClick={() => setActiveTab("requests")}
                                className={`hover:cursor-pointer hover:text-green-600 pb-3 text-sm font-semibold border-b-2 transition ${activeTab === "requests"
                                    ? "text-green-600 border-green-600"
                                    : "text-gray-500 border-transparent"
                                    }`}
                            >
                                My Requests
                            </button>

                        </div>


                        {/* AVAILABLE FOOD */}
                        {activeTab === "available" && (
                            <div className="min-w-0">

                                {/* SECTION HEADER */}
                                <div className="mb-7">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                            <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                                            Fresh food available
                                        </span>

                                        <span className="shrink-0 text-sm font-semibold text-blue-600 bg-blue-100 px-2.5 p-1.5 rounded-3xl">
                                            {availableFood.length} listings
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold tracking-tight text-[#17211A] sm:text-3xl">
                                        Available near you
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                                        Food currently available for pickup or delivery
                                    </p>

                                    <div className="mt-6 h-px bg-gradient-to-r from-green-200 via-gray-200 to-transparent" />
                                </div>

                                {/* FOOD CARDS */}
                                {availableFood.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-14 text-center sm:py-16">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                                            🍃
                                        </div>

                                        <h3 className="text-lg font-semibold text-[#17211A]">
                                            Nothing available just yet
                                        </h3>

                                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                            New food donations will appear here when nearby donors
                                            share surplus food.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <FoodCard availableFood={currentFood} />

                                        {/* PAGINATION */}
                                        {totalPages > 1 && (
                                            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        setCurrentPage((prev) => Math.max(1, prev - 1))
                                                    }
                                                    disabled={currentPage === 1}
                                                    aria-label="Previous page"
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-green-300 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    ←
                                                </button>

                                                {Array.from(
                                                    { length: totalPages },
                                                    (_, i) => i + 1
                                                ).map((page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        aria-current={
                                                            currentPage === page ? "page" : undefined
                                                        }
                                                        className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${currentPage === page
                                                                ? "bg-[#17211A] text-white shadow-sm"
                                                                : "border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50"
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}

                                                <button
                                                    onClick={() =>
                                                        setCurrentPage((prev) =>
                                                            Math.min(totalPages, prev + 1)
                                                        )
                                                    }
                                                    disabled={currentPage === totalPages}
                                                    aria-label="Next page"
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-green-300 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    →
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}




                        {/* MY REQUESTS */}
                        {activeTab === "requests" && (
                            <Request
                                requests={requests}
                                setActiveTab={setActiveTab}
                            />
                        )}


                        {/* HOW IT WORKS */}
                        <Working />

                    </section>

                )
            }


            {/* FOOTER */}
            <Footer />

        </main>
    );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Dashboard/Volunteer/Header";
import ActiveDelivery from "@/components/Dashboard/Volunteer/ActiveDelivery";
import Available from "@/components/Dashboard/Volunteer/Available";
import History from "@/components/Dashboard/Volunteer/History";
import Working from "@/components/Dashboard/Volunteer/Working";
import Impact from "@/components/Dashboard/Volunteer/Impact";
import Footer from "@/components/home/Footer";


export default function VolunteerDashboard() {
    const [isLoading, setisLoading] = useState(true)
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [activeTab, setActiveTab] = useState("available");
    const [deliveryHistory, setDeliveryHistory] = useState([])
    const [availableDeliveries, setAvailableDeliveries] = useState([]);
    const [activeDelivery, setActiveDelivery] = useState(false);
    const [currentDeliveryDetials, setCurrentDeliveryDetials] = useState(null);

    const getData = useCallback(async () => {
        try {
            const response = await fetch("/api/volunteer", {
                cache: "no-store",
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(result.error);
                return;
            }

            setAvailableDeliveries(result.availableDeliveries || []);
            setActiveDelivery(result.ActiveDelivery);
            setCurrentDeliveryDetials(
                result.currentDeliveryDetials || null
            );
            setDeliveryHistory(result.deliveryHistory || []);
        } catch (error) {
            console.error("Failed to fetch volunteer data:", error);
        }
    }, []);

    console.log(currentDeliveryDetials)

    const updateVolunteerLocation = useCallback(() => {
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    const response = await fetch(
                        "/api/volunteer/location",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                latitude,
                                longitude,
                            }),
                        }
                    );

                    const result = await response.json();

                    if (!response.ok) {
                        console.error(result.error);
                        return;
                    }

                    // Location was obtained and saved successfully.
                    setLocationEnabled(true);

                    // Refresh distance, ETA and delivery information.
                    await getData();
                } catch (error) {
                    console.error(
                        "Failed to update volunteer location:",
                        error
                    );
                }
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    // Stay silent when permission is denied.
                    setLocationEnabled(false);
                    return;
                }

                // Other errors can still be useful for debugging.
                console.warn("Unable to retrieve location:", error.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000,
            }
        );
    }, [getData]);


    useEffect(() => {
        const fetchVolunteerData = async()=>{
            try{
                await Promise.all([
                    getData()
                ]);
            }finally{
                setisLoading(false)
            }
        }

        fetchVolunteerData();

    }, [getData]);

    useEffect(() => {
        if (!activeDelivery || !locationEnabled) {
            return;
        }

        const interval = setInterval(() => {
            updateVolunteerLocation();
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, [
        activeDelivery,
        locationEnabled,
        updateVolunteerLocation,
    ]);

    const handleDeliveryCompleted = async () => {

        setActiveDelivery(false);
        setCurrentDeliveryDetials(null);

        await getData();
    };

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

            {/* MAIN CONTENT */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">

                {/* HEADER */}
                <Header updateVolunteerLocation={updateVolunteerLocation} locationEnabled={locationEnabled} />


                {/* ACTIVE DELIVERY */}
                {
                    activeDelivery &&
                    <ActiveDelivery
                        currentDeliveryDetials={currentDeliveryDetials}
                        onDeliveryCompleted={handleDeliveryCompleted}
                    />
                }


                {/* TABS */}
                <div className="flex items-center gap-6 border-b border-gray-200 mb-6">

                    <button
                        onClick={() => setActiveTab("available")}
                        className={`hover:cursor-pointer pb-3 text-sm font-semibold border-b-2 transition ${activeTab === "available"
                            ? "text-green-600 border-green-600"
                            : "text-gray-500 border-transparent"
                            }`}
                    >
                        Available Deliveries
                    </button>


                    <button
                        onClick={() => setActiveTab("history")}
                        className={`hover:cursor-pointer pb-3 text-sm font-semibold border-b-2 transition ${activeTab === "history"
                            ? "text-green-600 border-green-600"
                            : "text-gray-500 border-transparent"
                            }`}
                    >
                        Delivery History
                    </button>

                </div>


                {/* AVAILABLE DELIVERIES */}
                {activeTab === "available" && (
                    <Available
                        availableDeliveries={availableDeliveries}
                        activeDelivery={activeDelivery}
                    />
                )}


                {/* DELIVERY HISTORY */}
                {activeTab === "history" && (
                    <History deliveries={deliveryHistory} setActiveTab={setActiveTab} />
                )}


                {/* HOW IT WORKS */}
                <Working />


                {/* IMPACT */}
                {/* <Impact /> */}

            </section>

            <Footer />

        </main>
    );
}
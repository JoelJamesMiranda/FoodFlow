"use client"
import Link from "next/link";
import Navbar from "@/components/Dashboard/Navbar";
import Welcome from "@/components/Dashboard/Welcome";
import Action from "@/components/Dashboard/Action";
import Impact from "@/components/Dashboard/Impact";
import Recents from "@/components/Dashboard/Recents";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = async () => {
        try {
            const response = await fetch('/api/dashboard');
            const result = await response.json();

            if (!response.ok) {
                console.log(result.error);
            }

            setData(result.data);
        } catch (error) {
            console.error("Error in fetching detials : ", error)
        }

    }
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                await getData();
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (<div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-[#16A34A]" />

                    <p className="text-lg font-medium text-[#17211A]">
                        Fetching data...
                    </p>
                </div>)
    }

    return (
        <main className="min-h-screen bg-[#F7FAF7] text-[#17211A]">
            <ToastContainer />


            {/* MAIN CONTENT */}
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* Welcome */}
                <Welcome />


                {/* ACTION CARDS */}
                <Action />


                {/* IMPACT SECTION */}
                <Impact data={data} />


                {/* RECENT ACTIVITY */}
                <Recents />

            </div>

        </main>
    );
}
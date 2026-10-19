"use client"
import Link from "next/link";
import Navbar from "@/components/Dashboard/Donor/Navbar";
import Recents from "@/components/Dashboard/Recents";
import Header from "@/components/Dashboard/Donor/Header";
import Stats from "@/components/Dashboard/Donor/Stats";
import Active from "@/components/Dashboard/Donor/Active";
import Working from "@/components/Dashboard/Donor/Working";
import Footer from "@/components/home/Footer";
import MissingAddress from "@/components/Dashboard/MissingAddress";
import { useEffect, useState } from "react";

export default function DonorDashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [donations, setDonations] = useState([]);
    const [totalDonation, setTotalDonation] = useState()
    const [successfullDeliveries, setSuccessfullDeliveries] = useState()
    const [stats, setStats] = useState()
    const [address, setAddress] = useState(null)


    const getReceiverData = async () => {
        const response = await fetch("/api/receiver")

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error)
            return;
        }

        setAddress(result.addressPresent)
    }

    const getData = async () => {
        const response = await fetch("/api/donations")

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error)
            return;
        }

        setStats(result.stats);
        setSuccessfullDeliveries(result.successfulDeliveries.successfullDeliveries)
        setTotalDonation(result.totalDonation.totolDonations);
        setDonations(result.activeDonations);
    }

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                await Promise.all([
                    getData(),
                    getReceiverData()
                ]);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);


    return (
        <main className="min-h-screen bg-[#F7FAF7] text-[#17211A]">

            {isLoading ? (
                <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-[#16A34A]" />

                    <p className="text-lg font-medium text-[#17211A]">
                        Fetching data...
                    </p>
                </div>
            ) : address === null || address === false ? (
                <MissingAddress />
            ) : (
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <Header />

                    <Stats
                        statsDetails={stats}
                        totalDonation={totalDonation}
                        successfullDeliveries={successfullDeliveries}
                    />

                    <Active
                        donations={donations}
                        refreshDonation={getData}
                    />

                    <Working />

                    <Recents />
                </div>
            )}

            {
                !isLoading && <Footer /> 
            }


        </main >
    );
}
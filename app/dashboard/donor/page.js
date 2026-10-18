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

    const [donations, setDonations] = useState([]);
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

        setStats(result.stats)
        setDonations(result.activeDonations)
    }

    useEffect(() => {
        getData();
        getReceiverData();
    }, [])


    return (
        <main className="min-h-screen bg-[#F7FAF7] text-[#17211A]">

            {address === null ?
                (
                    <MissingAddress />
                ) :

                (<>
                    {/* CONTENT */}
                    < div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                        {/* HEADER */}
                        <Header />


                        {/* STATS */}
                        <Stats statsDetails={stats} />


                        {/* ACTIVE DONATION */}
                        <Active donations={donations} refreshDonation={getData} />


                        {/* HOW IT WORKS */}
                        <Working />


                        {/* DONATION HISTORY */}
                        <Recents />

                    </div>
                </>
                )
            }


            <Footer />

        </main >
    );
}
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/home/Footer";
import Working from "@/components/home/Working";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Cta from "@/components/home/Cta";
import { ToastContainer } from "react-toastify";

export default function Home() {
    const [userDetails, setUserDetails] = useState(null);

    async function getUserDetails() {
        const response = await fetch("/api/Users");

        if (response.ok) {
            const result = await response.json();
            setUserDetails(result.users);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <main className="min-h-screen bg-[#F7FAF7] text-[#17211A]">
            <ToastContainer />

            <Navbar userDetails={userDetails} />

            <Hero />
            <Stats />
            <Working />
            <About />
            <Cta />
            <Footer />
        </main>
    );
}
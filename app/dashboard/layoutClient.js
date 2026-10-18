"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Dashboard/Navbar";

export default function DashboardClient({ children }) {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState(null);

    async function getUserDetails() {
        const response = await fetch("/api/Users");

        const result = await response.json();

        if (!response.ok) {
            router.push("/login")
            return;
        }

        setUserDetails(result.users);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            <Navbar userDetails={userDetails} />

            <main className="pt-28 min-[416px]:pt-32 lg:pt-20">
            {children}
            </main>
        </>
    );
}
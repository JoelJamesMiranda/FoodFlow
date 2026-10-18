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
        <Impact />


        {/* RECENT ACTIVITY */}
        <Recents />

      </div>

    </main>
  );
}
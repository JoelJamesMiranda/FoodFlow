"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        gender: "",
        houseNumber: "",
        street: "",
        area: "",
        city: "",
        state: "",
        landmark: "",
        pincode: ""
    });
    const [editMode, setEditMode] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        gender: "",
        houseNumber: "",
        street: "",
        area: "",
        city: "",
        state: "",
        landmark: "",
        pincode: ""
    });

    async function getUserDetails() {
        const response = await fetch("/api/Users");
        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            return;
        }

        setUserDetails({
            name: result.users.name,
            email: result.users.email,
            gender: result.users.gender,

            houseNumber: result.addresses?.houseNumber || "",
            street: result.addresses?.street || "",
            area: result.addresses?.area || "",
            city: result.addresses?.city || "",
            state: result.addresses?.state || "",
            landmark: result.addresses?.landmark || "",
            pincode: result.addresses?.pincode || ""

        });
        setForm({
            name: result.users.name,
            email: result.users.email,
            gender: result.users.gender,

            houseNumber: result.addresses?.houseNumber || "",
            street: result.addresses?.street || "",
            area: result.addresses?.area || "",
            city: result.addresses?.city || "",
            state: result.addresses?.state || "",
            landmark: result.addresses?.landmark || "",
            pincode: result.addresses?.pincode || ""
        })
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSave() {
        if (!form.houseNumber) {
            toast("Enter HouseNumber")
            return
        }
        if (!form.street) {
            toast("Enter Street")
            return
        }
        if (!form.area) {
            toast("Enter Area")
            return
        }
        if (!form.city) {
            toast("Enter City")
            return
        }
        if (!form.state) {
            toast("Enter State")
            return
        }
        if (!form.pincode) {
            toast("Enter Pincode")
            return
        }


        const response = await fetch("/api/post-details",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    gender: form.gender,
                    houseNumber: form.houseNumber,
                    street: form.street,
                    area: form.area,
                    city: form.city,
                    state: form.state,
                    landmark: form.landmark,
                    pincode: form.pincode
                })
            }
        )

        const result = await response.json();

        if (!response.ok) {
            toast(result.error)
            return
        }

        toast(result.message)
        setUserDetails(form);
        setEditMode(false);
    }

    if (!userDetails) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F7FAF7]">
                <p className="text-sm text-gray-500">
                    Loading profile...
                </p>
            </main>
        );
    }
    console.log("User details : ", userDetails)
    console.log("Form : ", form)

    return (
        <main className="min-h-screen bg-[#F7FAF7] px-6 py-10">
            <ToastContainer />
            <div className="mx-auto max-w-4xl">

                {/* Heading */}
                <div className="mb-8">
                    <p className="text-sm font-medium text-[#16A34A]">
                        ACCOUNT
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-[#17211A]">
                        Your Profile
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your FoodFlow account and personal information.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-[#16A34A] to-[#4ADE80]" />

                    {/* User Info */}
                    <div className="px-7 pb-7">

                        <div className="-mt-12 flex items-end justify-between">

                            {/* Avatar */}
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#DCFCE7] text-3xl font-bold text-[#16A34A] shadow-sm">
                                {userDetails.name?.[0]?.toUpperCase()}
                            </div>

                            {!editMode ? (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#16A34A] hover:text-[#16A34A] hover:cursor-pointer"
                                >
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setForm(userDetails);
                                            setEditMode(false);
                                        }}
                                        className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        className="rounded-xl bg-[#16A34A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#15803D] hover:cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* Name */}
                        <div className="mt-5">
                            <h2 className="text-2xl font-bold text-[#17211A]">
                                {userDetails.name}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {userDetails.email}
                            </p>
                        </div>

                        {/* Personal Information */}
                        <section className="mt-10">

                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-[#17211A]">
                                    Personal Information
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your basic account information.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                {editMode ? (
                                    <>
                                        <ProfileInput
                                            label="Full Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                        />

                                        <InfoCard
                                            label="Email"
                                            value={userDetails.email}
                                        />

                                        <ProfileInput
                                            label="Gender"
                                            name="gender"
                                            value={form.gender || ""}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <InfoCard
                                            label="Full Name"
                                            value={userDetails.name}
                                        />

                                        <InfoCard
                                            label="Email"
                                            value={userDetails.email}
                                        />

                                        <InfoCard
                                            label="Gender"
                                            value={
                                                userDetails.gender ||
                                                "Not specified"
                                            }
                                        />
                                    </>
                                )}

                                <InfoCard
                                    label="Account"
                                    value="Active"
                                    green
                                />

                            </div>
                        </section>

                        {/* Divider */}
                        <div className="my-10 border-t border-gray-300" />

                        {/* Address */}
                        <section>

                            <div className="mb-5 flex items-start justify-between">

                                <div>
                                    <h3 className="text-lg font-semibold text-[#17211A]">
                                        Address & Location
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Used to connect you with nearby food
                                        opportunities.
                                    </p>
                                </div>

                                <div className="hidden rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#16A34A] sm:block">
                                    Location
                                </div>

                            </div>

                            {editMode ? (
                                <div className="grid gap-5 sm:grid-cols-2">

                                    <div className="sm:col-span-2">
                                        <ProfileInput
                                            label="House / Building Number"
                                            name="houseNumber"
                                            placeholder="Eg. 24, 5th Main Road"
                                            value={form.houseNumber || ""}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <ProfileInput
                                        label="Street / Road"
                                        name="street"
                                        placeholder="Eg. Yelahanka New Town"
                                        value={form.street || ""}
                                        onChange={handleChange}
                                    />

                                    <ProfileInput
                                        label="Area / Locality"
                                        name="area"
                                        placeholder="Eg. Yelahanka"
                                        value={form.area || ""}
                                        onChange={handleChange}
                                    />

                                    <ProfileInput
                                        label="City"
                                        name="city"
                                        placeholder="Eg. Bengaluru"
                                        value={form.city || ""}
                                        onChange={handleChange}
                                    />

                                    <ProfileInput
                                        label="State"
                                        name="state"
                                        placeholder="Eg. Karnataka"
                                        value={form.state || ""}
                                        onChange={handleChange}
                                    />

                                    <ProfileInput
                                        label="Pincode"
                                        name="pincode"
                                        placeholder="Eg. 560064"
                                        value={form.pincode || ""}
                                        onChange={handleChange}
                                    />

                                    <ProfileInput
                                        label="Landmark"
                                        name="landmark"
                                        placeholder="Eg. Near BMSIT"
                                        value={form.landmark || ""}
                                        onChange={handleChange}
                                    />

                                </div>
                            ) : (
                                <div className="rounded-2xl bg-[#F7FAF7] p-6">

                                    {userDetails.city ? (
                                        <>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Address
                                            </p>

                                            <p className="mt-2 leading-7 text-gray-800">
                                                {userDetails.houseNumber && (
                                                    <>
                                                        {userDetails.houseNumber},{" "}
                                                    </>
                                                )}

                                                {userDetails.street && (
                                                    <>
                                                        {userDetails.street},{" "}
                                                    </>
                                                )}

                                                {userDetails.area && (
                                                    <>
                                                        {userDetails.areaa},{" "}
                                                    </>
                                                )}

                                                {userDetails.city},{" "}
                                                {userDetails.state} -{" "}
                                                {userDetails.pincode}
                                            </p>

                                            {userDetails.landmark && (
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Landmark:{" "}
                                                    {userDetails.landmark}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-center py-5">
                                            <p className="text-sm text-gray-500">
                                                You haven't added your address
                                                yet.
                                            </p>

                                            <button
                                                onClick={() =>
                                                    setEditMode(true)
                                                }
                                                className="mt-3 text-sm font-medium text-[#16A34A] hover:underline"
                                            >
                                                Add your address →
                                            </button>
                                        </div>
                                    )}

                                </div>
                            )}

                        </section>

                        {/* Location explanation */}
                        <div className="mt-6 rounded-2xl border border-[#DCFCE7] bg-[#F0FDF4] p-5">

                            <div className="flex gap-3">

                                <div className="mt-0.5 text-[#16A34A]">
                                    📍
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#166534]">
                                        Why does FoodFlow need your address?
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-[#4B6351]">
                                        Your location helps FoodFlow find nearby
                                        food donations and calculate distances
                                        between donors, receivers and
                                        volunteers.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}


/* -------------------------------- */
/* Info Card */
/* -------------------------------- */

function InfoCard({ label, value, green = false }) {
    return (
        <div className="rounded-2xl bg-[#F7FAF7] p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                {label}
            </p>

            <p
                className={`mt-2 font-medium ${green ? "text-[#16A34A]" : "text-gray-800"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}


/* -------------------------------- */
/* Input */
/* -------------------------------- */

function ProfileInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-200 bg-[#F7FAF7] px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:bg-white focus:ring-4 focus:ring-[#16A34A]/10"
            />
        </div>
    );
}
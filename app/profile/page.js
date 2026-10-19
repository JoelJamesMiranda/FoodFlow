
"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const emptyProfile = {
    name: "",
    email: "",
    gender: "",
    houseNumber: "",
    street: "",
    area: "",
    city: "",
    state: "",
    landmark: "",
    pincode: "",
};

export default function Profile() {
    const [userDetails, setUserDetails] = useState(emptyProfile);
    const [form, setForm] = useState(emptyProfile);

    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function getUserDetails() {
            try {
                const response = await fetch("/api/Users", {
                    cache: "no-store",
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.error || "Failed to load your profile."
                    );
                }

                if (!mounted) return;

                const profile = {
                    name: result.users?.name || "",
                    email: result.users?.email || "",
                    gender: result.users?.gender || "",
                    houseNumber: result.addresses?.houseNumber || "",
                    street: result.addresses?.street || "",
                    area: result.addresses?.area || "",
                    city: result.addresses?.city || "",
                    state: result.addresses?.state || "",
                    landmark: result.addresses?.landmark || "",
                    pincode: result.addresses?.pincode || "",
                };

                setUserDetails(profile);
                setForm(profile);
            } catch (error) {
                if (mounted) {
                    toast.error(
                        error.message || "Unable to load your profile."
                    );
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        }

        getUserDetails();

        return () => {
            mounted = false;
        };
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleCancel() {
        setForm({ ...userDetails });
        setEditMode(false);
    }

    async function handleSave() {
        const requiredFields = [
            ["houseNumber", "Enter house/building number."],
            ["street", "Enter street/road."],
            ["area", "Enter area/locality."],
            ["city", "Enter city."],
            ["state", "Enter state."],
            ["pincode", "Enter pincode."],
        ];

        for (const [field, message] of requiredFields) {
            if (!String(form[field] || "").trim()) {
                toast.error(message);
                return;
            }
        }

        if (!/^\d{6}$/.test(form.pincode.trim())) {
            toast.error("Enter a valid 6-digit pincode.");
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch("/api/post-details", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
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
                    pincode: form.pincode,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Unable to save your profile."
                );
            }

            const updatedProfile = { ...form };

            setUserDetails(updatedProfile);
            setForm(updatedProfile);
            setEditMode(false);

            toast.success(result.message || "Profile updated successfully.");
        } catch (error) {
            toast.error(
                error.message || "Something went wrong while saving."
            );
        } finally {
            setIsSaving(false);
        }
    }

    const hasAddress = Boolean(
        userDetails.houseNumber ||
        userDetails.street ||
        userDetails.area ||
        userDetails.city ||
        userDetails.state ||
        userDetails.pincode
    );

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#F7FAF7] px-4 py-8 sm:px-6 sm:py-12">
                <div className="mx-auto max-w-4xl animate-pulse">
                    <div className="h-3 w-20 rounded bg-gray-200" />
                    <div className="mt-3 h-8 w-48 rounded bg-gray-200" />
                    <div className="mt-8 flex items-center gap-4 border-b border-gray-200 pb-7">
                        <div className="h-16 w-16 rounded-full bg-gray-200" />
                        <div className="flex-1">
                            <div className="h-5 w-36 rounded bg-gray-200" />
                            <div className="mt-3 h-3 w-48 max-w-full rounded bg-gray-200" />
                        </div>
                    </div>
                    <div className="mt-10 space-y-6">
                        <div className="h-5 w-44 rounded bg-gray-200" />
                        <div className="h-12 rounded-lg bg-gray-200" />
                        <div className="h-12 rounded-lg bg-gray-200" />
                        <div className="h-5 w-44 rounded bg-gray-200" />
                        <div className="h-12 rounded-lg bg-gray-200" />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen overflow-x-clip bg-[#F0F7F0] text-[#17211A]">
            <ToastContainer
                position="top-right"
                autoClose={2500}
                theme="light"
            />

            <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 ">
                {/* Page heading */}
                <header className="mb-7 sm:mb-9">
                    <a
                        href="/dashboard"
                        className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 -ml-3 text-sm font-semibold text-gray-600 transition hover:bg-green-100 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 12H5m7 7-7-7 7-7"
                            />
                        </svg>
                        Back to dashboard
                    </a>

                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#16A34A]">
                        Account settings
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Your profile
                    </h1>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
                        Manage your personal information and delivery address.
                    </p>
                </header>

                {/* Profile identity */}
                <section className="flex flex-col gap-5 border-b border-gray-200 pb-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-8">
                    <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-2xl font-bold text-[#15803D] ring-1 ring-inset ring-green-200 sm:h-20 sm:w-20 sm:text-3xl">
                            {userDetails.name?.trim()?.[0]?.toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                            <h2 className="break-words text-xl font-bold tracking-tight sm:text-2xl">
                                {userDetails.name || "Your account"}
                            </h2>

                            <p className="mt-1 break-all text-sm text-gray-500">
                                {userDetails.email}
                            </p>

                            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                FoodFlow member
                            </p>
                        </div>
                    </div>

                    {!editMode && (
                        <button
                            type="button"
                            onClick={() => setEditMode(true)}
                            className="cursor-pointer inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#17211A] transition hover:border-green-300 hover:text-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:w-auto"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m15.5 5.5 3 3M4 20l4.5-.9L19 8a2.12 2.12 0 0 0-3-3L5.5 15.5 4 20Z"
                                />
                            </svg>
                            Edit profile
                        </button>
                    )}
                </section>

                {/* Personal information */}
                <section className="border-b border-gray-200 py-7 sm:py-9">
                    <SectionHeading
                        number="01"
                        title="Personal information"
                        description="Your basic account details."
                    />

                    {editMode ? (
                        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                            <ProfileInput
                                label="Full name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                autoComplete="name"
                            />

                            <ProfileInput
                                label="Email address"
                                name="email"
                                value={form.email}
                                readOnly
                                type="email"
                                autoComplete="email"
                            />

                            <div className="min-w-0">
                                <label
                                    htmlFor="gender"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Gender
                                </label>

                                <select
                                    id="gender"
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className="min-h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-base text-[#17211A] outline-none transition hover:border-gray-300 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 sm:text-sm"
                                >
                                    <option value="">Select gender (optional)</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="flex items-end pb-1">
                                <p className="text-xs leading-5 text-gray-400">
                                    Your email address is displayed as
                                    registered with your account.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5">
                            <InfoRow
                                label="Full name"
                                value={userDetails.name}
                            />
                            <InfoRow
                                label="Email address"
                                value={userDetails.email}
                            />
                            <InfoRow
                                label="Gender"
                                value={userDetails.gender || "Not specified"}
                            />
                            <InfoRow
                                label="Account status"
                                value={
                                    <span className="inline-flex items-center gap-2 text-green-700">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                        Active
                                    </span>
                                }
                                last
                            />
                        </div>
                    )}
                </section>

                {/* Address */}
                <section className="border-b border-gray-200 py-7 sm:py-9">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <SectionHeading
                            number="02"
                            title="Address & location"
                            description="Used for nearby food requests and delivery coordination."
                        />

                        {!editMode && hasAddress && (
                            <button
                                type="button"
                                onClick={() => setEditMode(true)}
                                className="cursor-pointer inline-flex min-h-9 w-fit items-center gap-1.5 text-sm font-semibold text-green-700 transition hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600"
                            >
                                Edit address
                                <span aria-hidden="true">→</span>
                            </button>
                        )}
                    </div>

                    {editMode ? (
                        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                            <ProfileInput
                                label="House / building number"
                                name="houseNumber"
                                value={form.houseNumber}
                                onChange={handleChange}
                                placeholder="e.g. 24, Building A"
                                autoComplete="address-line1"
                            />

                            <ProfileInput
                                label="Street / road"
                                name="street"
                                value={form.street}
                                onChange={handleChange}
                                placeholder="Enter street or road"
                                autoComplete="address-line2"
                            />

                            <ProfileInput
                                label="Area / locality"
                                name="area"
                                value={form.area}
                                onChange={handleChange}
                                placeholder="Enter your locality"
                                autoComplete="address-level3"
                            />

                            <ProfileInput
                                label="Landmark (optional)"
                                name="landmark"
                                value={form.landmark}
                                onChange={handleChange}
                                placeholder="Nearby landmark"
                                autoComplete="off"
                            />

                            <ProfileInput
                                label="City"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                                autoComplete="address-level2"
                            />

                            <ProfileInput
                                label="State"
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                placeholder="Enter your state"
                                autoComplete="address-level1"
                            />

                            <ProfileInput
                                label="Pincode"
                                name="pincode"
                                value={form.pincode}
                                onChange={handleChange}
                                placeholder="6-digit pincode"
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                autoComplete="postal-code"
                            />
                        </div>
                    ) : hasAddress ? (
                        <div className="mt-5">
                            <p className="text-base font-semibold leading-7 text-[#17211A] sm:text-lg">
                                {[
                                    userDetails.houseNumber,
                                    userDetails.street,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>

                            <p className="mt-1 break-words text-sm leading-6 text-gray-600 sm:text-base">
                                {[
                                    userDetails.area,
                                    userDetails.city,
                                    userDetails.state,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}
                                {userDetails.pincode
                                    ? ` – ${userDetails.pincode}`
                                    : ""}
                            </p>

                            {userDetails.landmark && (
                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    <span className="font-medium text-gray-600">
                                        Landmark:
                                    </span>{" "}
                                    {userDetails.landmark}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="mt-6 border-l-2 border-green-500 pl-4">
                            <p className="text-sm font-semibold text-[#17211A]">
                                No address added yet
                            </p>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Add your address to help coordinate nearby
                                food donations and deliveries.
                            </p>

                            <button
                                type="button"
                                onClick={() => setEditMode(true)}
                                className="mt-3 inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
                            >
                                Add your address
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    )}
                </section>

                {/* Location note: plain text, no nested card */}
                <div className="flex items-start gap-3 py-6 sm:py-7">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                        />
                        <circle cx="12" cy="10" r="2.5" />
                    </svg>

                    <div>
                        <p className="text-sm font-semibold text-[#17211A]">
                            Why your address matters
                        </p>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            FoodFlow uses your address to coordinate nearby
                            food donations and support delivery distance
                            calculations. Keep it up to date for a smoother
                            experience.
                        </p>
                    </div>
                </div>

                {/* Save actions */}
                {editMode && (
                    <div className="sticky bottom-0 z-10 -mx-4 border-t border-gray-200 bg-[#F7FAF7]/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="cursor-pointer inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving}
                                className="cursor-pointer inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#15803D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >
                                {isSaving && (
                                    <svg
                                        className="h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
                                        />
                                    </svg>
                                )}
                                {isSaving ? "Saving changes..." : "Save changes"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="border-t border-gray-200 pt-5 text-center sm:mt-7">
                    <p className="text-xs text-gray-400">
                        FoodFlow · Sharing food, reducing waste.
                    </p>
                </footer>
            </div>
        </main>
    );
}

function SectionHeading({ number, title, description }) {
    return (
        <div className="flex min-w-0 items-start gap-3">
            <span className="mt-0.5 shrink-0 font-mono text-xl font-medium text-green-700 ">
                {number} -
            </span>

            <div className="min-w-0">
                <h3 className="text-base font-bold tracking-tight text-[#17211A] sm:text-lg">
                    {title}
                </h3>

                <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

function InfoRow({ label, value, last = false }) {
    return (
        <div
            className={`flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 ${last ? "" : "border-b border-gray-100"
                }`}
        >
            <p className="shrink-0 text-sm text-gray-500">{label}</p>

            <div className="min-w-0 break-words text-sm font-medium text-[#17211A] sm:text-right">
                {value || "—"}
            </div>
        </div>
    );
}

function ProfileInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    readOnly = false,
    autoComplete,
    inputMode,
    maxLength,
}) {
    return (
        <div className="min-w-0">
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
                value={value ?? ""}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                autoComplete={autoComplete}
                inputMode={inputMode}
                maxLength={maxLength}
                className={`min-h-11 w-full rounded-xl border px-3.5 py-3 text-base text-[#17211A] outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 sm:text-sm ${readOnly
                    ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-500"
                    : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
            />
        </div>
    );
}

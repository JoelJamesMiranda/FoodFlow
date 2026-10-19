import React from "react";

const Stats = ({ statsDetails = {} ,totalDonation ,successfullDeliveries}) => {
    const stats = [
        {
            label: "Total Donations",
            value: totalDonation ?? 0,
            icon: "📦",
            iconBg: "bg-green-100",
            accent: "text-green-700",
        },
        {
            label: "Successful Deliveries",
            value: successfullDeliveries ?? 0,
            icon: "🚚",
            iconBg: "bg-blue-100",
            accent: "text-blue-700",
        },
    ];

    const deliveredUnits = [
        {
            label: "Servings",
            value: statsDetails.Servings ?? 0,
            icon: "🍱",
        },
        {
            label: "Packets",
            value: statsDetails.Packets ?? 0,
            icon: "🥡",
        },
        {
            label: "Kilograms",
            value: statsDetails.Kg ?? 0,
            icon: "⚖️",
        },
        {
            label: "Boxes",
            value: statsDetails.Boxes ?? 0,
            icon: "📦",
        },
        {
            label: "Litres",
            value: statsDetails.Litres ?? 0,
            icon: "🧃",
        },
    ];

    return (
        <section className="mt-6 space-y-8 sm:mt-10">

            {/* Main overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6"
                    >
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-500">
                                {stat.label}
                            </p>

                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {stat.value}
                            </p>
                        </div>

                        <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl ${stat.iconBg} ${stat.accent}`}
                        >
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Unified food impact panel */}
            <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white">

                <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Your Food Impact
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Food successfully delivered, by unit.
                        </p>
                    </div>

                    <span className="mt-2 w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 sm:mt-0">
                        FoodFlow Impact
                    </span>
                </div>

                <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-5 lg:divide-x lg:divide-y-0">
                    {deliveredUnits.map((unit, index) => (
                        <div
                            key={unit.label}
                            className={`flex items-center justify-between gap-3 px-5 py-4 sm:px-4 lg:flex-col lg:items-start lg:gap-3 lg:py-5 ${
                                index > 0
                                    ? "sm:border-t sm:border-gray-100 lg:border-t-0"
                                    : ""
                            }`}
                        >
                            <div className="flex min-w-0 items-center gap-3 lg:flex-col lg:items-start">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-lg">
                                    {unit.icon}
                                </span>

                                <p className="text-sm text-gray-500">
                                    {unit.label}
                                </p>
                            </div>

                            <p className="text-xl font-bold tabular-nums text-gray-900 lg:text-2xl">
                                {unit.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
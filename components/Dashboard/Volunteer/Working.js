import React from "react";

const Working = () => {
    const steps = [
        {
            number: "01",
            icon: "📍",
            title: "Find a delivery",
            description:
                "See food pickups and deliveries available around you.",
        },
        {
            number: "02",
            icon: "🙋",
            title: "Accept it",
            description:
                "Choose a delivery that fits your location and schedule.",
        },
        {
            number: "03",
            icon: "📦",
            title: "Pick up the food",
            description:
                "Navigate to the donor and collect the prepared food.",
        },
        {
            number: "04",
            icon: "❤️",
            title: "Deliver it",
            description:
                "Take the food to the receiver and complete the delivery.",
        },
    ];

    return (
        <section className="mt-14 overflow-hidden rounded-2xl bg-[#17211A] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            {/* Header */}
            <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-400">
                    Make a difference
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    How volunteering works
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400 sm:text-base">
                    A simple way to turn your spare time into real impact.
                </p>
            </div>

            {/* Steps */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="group relative rounded-xl border border-white/[0.08] bg-white/[0.035] p-5 transition-all duration-200 hover:border-green-500/30 hover:bg-white/[0.065] sm:p-6"
                    >
                        {/* Number */}
                        <div className="flex items-center justify-between">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-2xl ring-1 ring-green-400/10 transition-colors duration-200 group-hover:bg-green-500/15">
                                {step.icon}
                            </div>

                            <span className="text-sm font-semibold tabular-nums tracking-wider text-green-400/70">
                                {step.number}
                            </span>
                        </div>

                        {/* Content */}
                        <h3 className="mt-5 text-base font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-green-300">
                            {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            {step.description}
                        </p>

                        {/* Bottom accent */}
                        <div className="mt-5 h-px w-8 bg-green-500/50 transition-all duration-200 group-hover:w-14 group-hover:bg-green-400" />
                    </div>
                ))}
            </div>

            {/* Footer note */}
            <div className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-sm">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                </span>

                <p className="text-xs leading-5 text-gray-400 sm:text-sm">
                    Every delivery helps reduce food waste and get meals to
                    people who need them.
                </p>
            </div>
        </section>
    );
};

export default Working;
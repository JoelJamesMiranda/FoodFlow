import React from "react";

const Working = () => {
    const steps = [
        {
            number: "1",
            title: "List your food",
            description:
                "Tell us what food you have and how many meals are available.",
        },
        {
            number: "2",
            title: "Someone requests it",
            description:
                "A nearby person or organization can request your donation.",
        },
        {
            number: "3",
            title: "Volunteer picks it up",
            description:
                "A volunteer collects the food and takes it to its destination.",
        },
        {
            number: "✓",
            title: "Food reaches someone",
            description:
                "Your surplus food becomes a useful meal instead of waste.",
        },
    ];

    return (
        <section className="mt-8 sm:mt-10 lg:mt-12 rounded-2xl sm:rounded-3xl bg-[#17211A] px-5 py-7 text-white sm:px-8 sm:py-9 lg:p-10">

            <div className="max-w-2xl">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-green-400">
                    How donating works
                </p>

                <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                    From your kitchen to someone else's table.
                </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">

                {steps.map((step) => (
                    <div key={step.number} className="min-w-0">
                        <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/10 text-lg font-medium">
                            {step.number}
                        </div>

                        <h3 className="mt-4 text-base font-semibold leading-snug">
                            {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            {step.description}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default Working;
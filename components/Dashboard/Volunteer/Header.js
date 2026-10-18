import React from 'react'

const Header = ({ updateVolunteerLocation ,locationEnabled}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">

            <div>

                <p className="text-green-600 font-semibold text-sm mb-2">
                    VOLUNTEER
                </p>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Make a delivery. Make an impact.
                </h1>

                <p className="text-gray-500 mt-2 max-w-xl">
                    Help move surplus food from donors to people who need it.
                    Pick a delivery that works for you.
                </p>

            </div>

            <button
                onClick={updateVolunteerLocation}
                className="hover:cursor-pointer rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
                {locationEnabled ? "Refresh Location" : "📍 Use my location"}
            </button>
            

        </div >
    )
}

export default Header

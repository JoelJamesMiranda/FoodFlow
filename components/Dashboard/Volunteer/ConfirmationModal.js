import React from 'react'

const ConfirmationModal = ({ selectedDelivery, setSelectedDelivery, handleDelivery, isConfirming }) => {

    return (
        <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedDelivery(null)}
        >

            <div
                className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-xl flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >


                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="px-6 py-5 border-b border-gray-200 shrink-0">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-xs text-green-600 font-semibold tracking-wide">
                                DELIVERY REQUEST
                            </p>

                            <h2 className="text-2xl font-bold mt-1">
                                Confirm Delivery
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Review the details before accepting.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                setSelectedDelivery(null)
                            }
                            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition hover:cursor-pointer"
                        >
                            ✕
                        </button>

                    </div>

                </div>


                {/* ================================================= */}
                {/* SCROLLABLE CONTENT */}
                {/* ================================================= */}

                <div className="p-6 overflow-y-auto">


                    {/* FOOD */}

                    <div className="flex items-center gap-4 bg-orange-50 rounded-2xl p-4">

                        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-3xl shrink-0">
                            🍛
                        </div>


                        <div>

                            <h3 className="font-bold text-lg">
                                {selectedDelivery.foodName}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {selectedDelivery.quantity}{" "}
                                {selectedDelivery.unit}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                {selectedDelivery.category}
                            </p>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* ROUTE */}
                    {/* ================================================= */}

                    <div className="mt-7">

                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                            Delivery route
                        </h3>


                        <div className="relative">

                            {/* Vertical line */}

                            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gray-200" />


                            {/* PICKUP */}

                            <div className="relative flex gap-4">

                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 z-10">

                                    <div className="w-3 h-3 rounded-full bg-green-600" />

                                </div>


                                <div className="pb-7">

                                    <p className="text-xs text-gray-400 font-medium">
                                        PICKUP FROM
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {selectedDelivery.donorName}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedDelivery.volunteerToDonorDistance} km away
                                    </p>

                                </div>

                            </div>


                            {/* DELIVERY */}

                            <div className="relative flex gap-4">

                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 z-10">

                                    <div className="w-3 h-3 rounded-full bg-orange-500" />

                                </div>


                                <div>

                                    <p className="text-xs text-gray-400 font-medium">
                                        DELIVER TO
                                    </p>

                                    <p className="font-semibold mt-1">
                                        {selectedDelivery.receiverName}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {selectedDelivery.donorToReceiverDistance} km from pickup
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* DELIVERY DETAILS */}
                    {/* ================================================= */}

                    <div className="mt-7">

                        <h3 className="text-sm font-semibold text-gray-900 mb-3">
                            Delivery details
                        </h3>


                        <div className="grid grid-cols-2 gap-3">


                            {/* PICKUP DISTANCE */}

                            <div className="bg-gray-50 rounded-2xl p-4">

                                <p className="text-xs text-gray-400">
                                    PICKUP DISTANCE
                                </p>

                                <p className="font-bold mt-1">
                                    {selectedDelivery.volunteerToDonorDistance} km
                                </p>

                            </div>


                            {/* DELIVERY DISTANCE */}

                            <div className="bg-gray-50 rounded-2xl p-4">

                                <p className="text-xs text-gray-400">
                                    DELIVERY DISTANCE
                                </p>

                                <p className="font-bold mt-1">
                                    {selectedDelivery.donorToReceiverDistance} km
                                </p>

                            </div>


                            {/* TOTAL ROUTE */}

                            <div className="bg-gray-50 rounded-2xl p-4">

                                <p className="text-xs text-gray-400">
                                    TOTAL ROUTE
                                </p>

                                <p className="font-bold mt-1">
                                    {(
                                        selectedDelivery.donorToReceiverDistance +
                                        selectedDelivery.volunteerToDonorDistance
                                    ).toFixed(2)} km
                                </p>

                            </div>


                            {/* BEST BEFORE */}

                            <div className="bg-gray-50 rounded-2xl p-4">

                                <p className="text-xs text-gray-400">
                                    BEST BEFORE
                                </p>

                                <p className="font-bold mt-1 text-orange-600">

                                    {new Date(
                                        selectedDelivery.bestBeforeDate
                                    ).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* NOTE */}
                    {/* ================================================= */}

                    <div className="mt-6 bg-green-50 border border-green-100 rounded-2xl p-4">

                        <p className="text-sm text-green-800 leading-relaxed">

                            <span className="font-semibold">
                                You're about to take this delivery.
                            </span>{" "}

                            Once confirmed, this delivery will be
                            assigned to you and you'll be responsible
                            for picking up the food and delivering it
                            to the receiver.

                        </p>

                    </div>

                </div>


                {/* ================================================= */}
                {/* ACTIONS */}
                {/* ================================================= */}

                <div className="px-6 py-5 border-t border-gray-200 bg-white shrink-0">

                    <div className="flex gap-3">

                        <button
                            onClick={() =>
                                setSelectedDelivery(null)
                            }
                            className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold transition"
                        >
                            Cancel
                        </button>


                        <button
                            onClick={handleDelivery}
                            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition hover:cursor-pointer"
                        >
                            {isConfirming ? "Confirming..." : "Confirm Delivery"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ConfirmationModal

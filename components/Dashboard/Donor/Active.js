
"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const INITIAL_VISIBLE = 4;
const LOAD_MORE_COUNT = 4;

const Active = ({ donations = [], refreshDonation }) => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [cancelling, setCancelling] = useState(false);

  const getStatusStyle = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-900 ring-green-700/20";
      case "CLAIMED":
        return "bg-blue-100 text-blue-900 ring-blue-700/20";
      case "PICKED_UP":
        return "bg-amber-100 text-amber-900 ring-amber-700/20";
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-900 ring-emerald-700/20";
      case "EXPIRED":
      case "CANCELLED":
        return "bg-red-100 text-red-900 ring-red-700/20";
      default:
        return "bg-gray-100 text-gray-800 ring-gray-600/20";
    }
  };

  const getFoodEmoji = (category) => {
    switch (category) {
      case "Fruits":
        return "🍎";
      case "Vegetables":
        return "🥦";
      case "Bakery":
        return "🍞";
      case "Packaged":
        return "🥫";
      case "Cooked":
        return "🍛";
      default:
        return "🍱";
    }
  };

  const handleCancel = async () => {
    if (!selectedDonation || cancelling) return;

    if (
      !window.confirm(
        "Are you sure you want to cancel this donation?"
      )
    ) {
      return;
    }

    setCancelling(true);

    try {
      const response = await fetch(
        `/api/donations/${selectedDonation.id}`,
        { method: "PATCH" }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Failed to cancel donation.");
        return;
      }

      toast.success("Donation cancelled successfully.");
      setSelectedDonation(null);

      await refreshDonation();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCancelling(false);
    }
  };

  const visibleDonations = donations.slice(0, visibleCount);
  const hasMore = visibleCount < donations.length;
  const canCollapse = visibleCount > INITIAL_VISIBLE;

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-[#263D32] bg-[#101D17] text-white shadow-xl shadow-black/10 sm:mt-12 sm:rounded-3xl">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Dark header */}
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#193D2B] via-[#153324] to-[#101D17] px-5 py-6 sm:px-7 sm:py-8">
        <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-green-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-300">
                Donor workspace
              </p>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Active donations
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-gray-300">
              Manage your food listings and keep track of their progress.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-400/15 text-lg">
              📦
            </div>

            <div>
              <p className="text-xs font-medium text-gray-300">
                Total listings
              </p>

              <p className="mt-0.5 text-2xl font-bold tabular-nums text-white">
                {donations.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {donations.length === 0 ? (
        <div className="px-5 py-14 text-center sm:px-8 sm:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/10 text-3xl">
            🍱
          </div>

          <h3 className="mt-5 text-xl font-bold text-white">
            No active donations yet
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-400">
            Have extra food? Create a donation and help someone in your
            community enjoy a meal.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop column headings */}
          <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(100px,0.9fr)_minmax(90px,0.75fr)_minmax(115px,0.9fr)_110px] items-center gap-4 border-b border-white/10 bg-[#172820] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.13em] text-gray-400 lg:grid">
            <span>Food details</span>
            <span>Category</span>
            <span>Quantity</span>
            <span>Status</span>
            <span className="text-center">Action</span>
          </div>

          {/* Donation rows */}
          <div className="divide-y divide-white/[0.08]">
            {visibleDonations.map((donation, index) => (
              <div
                key={donation.id}
                className={`group px-4 py-4 transition-colors hover:bg-green-400/[0.06] sm:px-6 sm:py-5 ${
                  index % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"
                }`}
              >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(100px,0.9fr)_minmax(90px,0.75fr)_minmax(115px,0.9fr)_110px] lg:items-center lg:gap-4">
                  {/* Food name */}
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-400/15 bg-gradient-to-br from-green-400/15 to-green-900/20 text-xl">
                      {getFoodEmoji(donation.category)}
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="break-words [overflow-wrap:anywhere] text-sm font-bold leading-5 text-white sm:text-base">
                        {donation.foodName}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        ID: {donation.id}
                      </p>

                      {/* Mobile category */}
                      <p className="mt-2 text-xs font-medium text-green-300 lg:hidden">
                        {donation.category}
                      </p>
                    </div>

                    {/* Mobile status */}
                    <span
                      className={`shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] font-bold ring-1 ring-inset sm:text-xs lg:hidden ${getStatusStyle(
                        donation.status
                      )}`}
                    >
                      {donation.status.replaceAll("_", " ")}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="hidden min-w-0 lg:block">
                    <span className="block break-words text-sm font-medium text-gray-300">
                      {donation.category}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 lg:block lg:border-0 lg:pt-0">
                    <span className="text-xs text-gray-500 lg:hidden">
                      Quantity
                    </span>

                    <div className="min-w-0 lg:text-left">
                      <span className="font-bold tabular-nums text-white">
                        {donation.quantity}
                      </span>

                      <span className="ml-1 text-xs text-gray-400">
                        {donation.unit}
                      </span>
                    </div>
                  </div>

                  {/* Desktop status */}
                  <div className="hidden min-w-0 lg:block">
                    <span
                      className={`inline-flex max-w-full rounded-lg px-3 py-2 text-xs font-bold ring-1 ring-inset ${getStatusStyle(
                        donation.status
                      )}`}
                    >
                      <span className="truncate">
                        {donation.status.replaceAll("_", " ")}
                      </span>
                    </span>
                  </div>

                  {/* View details */}
                  <div className="flex justify-start border-t border-white/[0.06] pt-3 lg:border-0 lg:pt-0 w-36">
                    <button
                      type="button"
                      onClick={() => setSelectedDonation(donation)}
                      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-green-400/20 bg-green-400/[0.08] px-2 py-2 text-sm font-medium text-green-300 transition hover:border-green-400/40 hover:bg-green-400/15 hover:text-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 lg:w-auto cursor-pointer"
                    >
                      View details
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View more / Show less */}
          {(hasMore || canCollapse) && (
            <div className="border-t border-white/10 bg-[#14231B] px-4 py-6 sm:px-6">
              <div className="flex flex-col items-center gap-3">
                {hasMore && (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((prev) =>
                        Math.min(
                          prev + LOAD_MORE_COUNT,
                          donations.length
                        )
                      )
                    }
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-green-400/30 bg-green-400/10 px-6 py-3 text-sm font-bold text-green-300 transition hover:border-green-400/50 hover:bg-green-400/15 sm:w-auto cursor-pointer"
                  >
                    View more donations
                    <span aria-hidden="true">↓</span>
                  </button>
                )}

                {canCollapse && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount(INITIAL_VISIBLE)}
                    className="px-4 py-2 text-sm font-medium text-gray-400 transition hover:text-white"
                  >
                    Show less ↑
                  </button>
                )}

                <p className="text-xs text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-300">
                    {visibleDonations.length}
                  </span>{" "}
                  of {donations.length} donations
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Donation details modal */}
      {selectedDonation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-5"
          onClick={() => setSelectedDonation(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-modal-title"
            className="my-auto max-h-[90dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#14231B] text-white shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal heading */}
            <div className="border-b border-white/10 bg-gradient-to-br from-[#193D2B] to-[#14231B] p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-green-300/20 bg-green-300/10 text-2xl">
                    {getFoodEmoji(selectedDonation.category)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-green-300">
                      Donation details
                    </p>

                    <h2
                      id="donation-modal-title"
                      className="mt-2 break-words [overflow-wrap:anywhere] text-xl font-bold sm:text-2xl"
                    >
                      {selectedDonation.foodName}
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      Listing #{selectedDonation.id}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close donation details"
                  onClick={() => setSelectedDonation(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${getStatusStyle(
                    selectedDonation.status
                  )}`}
                >
                  {selectedDonation.status.replaceAll("_", " ")}
                </span>
              </div>
            </div>

            {/* Modal details */}
            <div className="space-y-4 p-5 sm:p-7">
              <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
                {[
                  {
                    label: "Category",
                    value: selectedDonation.category,
                  },
                  {
                    label: "Quantity",
                    value: `${selectedDonation.quantity} ${selectedDonation.unit}`,
                  },
                  {
                    label: "Available from",
                    value: selectedDonation.availableDate || "Not specified",
                    extra: selectedDonation.availableTime,
                  },
                  {
                    label: "Best before",
                    value: selectedDonation.bestBeforeDate || "Not specified",
                    extra: selectedDonation.bestBeforeTime,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 rounded-xl border border-white/[0.08] bg-[#1B2D23] p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-gray-400">
                      {item.label}
                    </p>

                    <p className="mt-2 break-words [overflow-wrap:anywhere] text-sm font-semibold text-white">
                      {item.value}
                    </p>

                    {item.extra && (
                      <p className="mt-1 text-xs text-gray-400">
                        {item.extra}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {selectedDonation.notes && (
                <div className="rounded-xl border border-white/[0.08] bg-[#1B2D23] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-gray-400">
                    Additional notes
                  </p>

                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-200">
                    {selectedDonation.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 min-[380px]:flex-row min-[380px]:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDonation(null)}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/[0.06] cursor-pointer"
                >
                  Close
                </button>

                {selectedDonation.status === "AVAILABLE" && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {cancelling ? "Cancelling..." : "Cancel donation"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Active;

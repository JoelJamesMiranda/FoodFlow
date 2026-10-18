"use client"
import React from 'react'
import { useState } from 'react';

const FoodDetails = ({ form, handleChange , foodImage, setFoodImage}) => {
    console.log(foodImage)

    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCFCE7] text-xl">
                    🍱
                </div>

                <h2 className="text-xl font-bold text-[#17211A]">
                    What are you donating?
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Give us some basic information about the food.
                </p>
            </div>
            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Food photo
                </label>

                <label className="group flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#F7FAF7] p-6 text-center transition hover:border-[#16A34A] hover:bg-[#F0FDF4]">

                    {foodImage ? (
                        <div className="relative w-full">
                            <img
                                src={URL.createObjectURL(foodImage)}
                                alt="Food preview"
                                className="mx-auto h-52 w-full rounded-xl object-cover"
                            />

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFoodImage(null);
                                }}
                                className="hover:cursor-pointer absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#DCFCE7] text-2xl">
                                📷
                            </div>

                            <p className="font-semibold text-[#17211A]">
                                Upload a photo of the food
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                PNG or JPG · Max 5MB
                            </p>
                        </>
                    )}

                    <input
                        type="file"
                        accept="image/png,image/jpeg"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                                setFoodImage(file);
                            }
                        }}
                    />
                </label>
            </div>

            <div className="space-y-5">

                {/* Food Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Food name
                    </label>

                    <input
                        type="text"
                        name="foodName"
                        value={form.foodName}
                        onChange={handleChange}
                        placeholder="e.g. Vegetable Rice"
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Food category
                    </label>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
                    >
                        <option value="">Select a category</option>
                        <option value="cooked">Cooked Food</option>
                        <option value="packaged">Packaged Food</option>
                        <option value="bakery">Bakery</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Quantity */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Quantity
                    </label>

                    <div className="grid grid-cols-[1fr_150px] gap-3">
                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            min="1"
                            placeholder="e.g. 25"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
                        />

                        <select
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/10"
                        >
                            <option value="servings">Servings</option>
                            <option value="kg">Kilograms</option>
                            <option value="packets">Packets</option>
                            <option value="boxes">Boxes</option>
                            <option value="litres">Litres</option>
                        </select>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default FoodDetails

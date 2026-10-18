import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">

                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#16A34A] text-sm font-bold text-white">
                        F
                    </div>
                    <span className="font-bold">
                        Food<span className="text-[#16A34A]">Flow</span>
                    </span>
                </div>

                <p className="text-sm text-gray-500">
                    Turning surplus into shared meals.
                </p>

            </div>
        </footer>
    )
}

export default Footer

import React from 'react'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter();

    return (
        <div className="mb-8 flex items-center justify-between">
            <div>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mb-4 text-sm font-medium text-gray-500 transition hover:text-[#16A34A] hover:cursor-pointer"
                >
                    ← Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold tracking-tight text-[#17211A]">
                    Donate Surplus Food
                </h1>

                <p className="mt-2 max-w-2xl text-gray-500">
                    Turn extra food into a meal for someone who needs it.
                    Tell us a little about your donation and we'll take care
                    of the rest.
                </p>
            </div>
        </div>
    )
}

export default Header

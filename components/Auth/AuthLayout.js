export default function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="min-h-screen bg-[#F7FAF7] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Logo */}
        <a href="/" className="mb-10 flex justify-center items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16A34A] text-lg font-bold text-white">
            F
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Food<span className="text-[#16A34A]">Flow</span>
          </span>
        </a>


        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/40 sm:p-10">

          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#17211A]">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {subtitle}
            </p>
          </div>

          <div className="mt-8">
            {children}
          </div>

        </div>


        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          By continuing, you agree to FoodFlow's terms and privacy policy.
        </p>

      </div>

    </main>
  );
}
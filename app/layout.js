import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FoodFlow — Share Food. Spread Hope.",
  description:" **FoodFlow — Good Food Should Never Go to Waste.** FoodFlow is a food-rescue platform that connects surplus food from college messes, hostels, PGs, and other establishments with people and communities in need. By bringing together donors, receivers, and volunteers, FoodFlow helps reduce food waste and make surplus food more accessible to those who need it. Our mission is simple: **waste less, share more, and make every meal count."}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

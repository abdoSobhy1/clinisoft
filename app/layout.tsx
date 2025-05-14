import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/footer/Footer";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CliniSoft",
  description: "CliniSoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-[#F1FFFF]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

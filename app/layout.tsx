import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/footer/Footer";
import FloatingContactButton from "@/components/floating-contact-button/floating-contact-button";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CliniSoft",
  description: "The Pioneers of Clinic Digital Transformation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${poppins.className} antialiased bg-[#F1FFFF]`}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          <FloatingContactButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

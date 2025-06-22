import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/footer/Footer";
import FloatingContactButton from "@/components/floating-contact-button/floating-contact-button";
import { NextIntlClientProvider } from "next-intl";
import LanguageSelectorModal from "./lang";
import { LanguageProvider } from "@/contexts/LanguageContext";
import localFont from "next/font/local";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theSans = localFont({
  src: [
    {
      path: '../../public/fonts/TheSans-Bold.otf',
      weight: '400',
    }
  ]
})

export const metadata: Metadata = {
  title: "CliniSoft",
  description: "The Pioneers of Clinic Digital Transformation",
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await params;

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/en.json`)).default;
  }

  return (
    <main
      className={`${locale === "ar" ? theSans.className : poppins.className}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <NextIntlClientProvider messages={messages} locale={locale}>
        <LanguageProvider>
          <Header />
          <LanguageSelectorModal />
          {children}
          <Footer />
          <FloatingContactButton />
        </LanguageProvider>
      </NextIntlClientProvider>
    </main>
  );
}


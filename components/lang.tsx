'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSelectorModal() {
    const router = useRouter();
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);
    const { setLanguage } = useLanguage();
    useEffect(() => {
        const saved = localStorage.getItem('preferred-locale');
        const currentLocaleFromPath = pathname.split('/')[1];

        if (!saved || (saved && currentLocaleFromPath !== saved)) {
            setShowModal(true);
        }
    }, [pathname]);

    const handleConfirm = (locale: string) => {
        if (!locale) return;

        localStorage.setItem('preferred-locale', locale);
        setLanguage(locale);
        const currentLocale = pathname.split('/')[1];
        if (locale !== currentLocale) {
            const remainingPath = pathname
                .split('/')
                .slice(2)
                .join('/');
            const newPath = `/${locale}/${remainingPath}`;
            router.replace(newPath || `/${locale}`);
        }

        setShowModal(false);
    };

    const openModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <button
                onClick={openModal}
                className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 bg-textTeal text-white p-3 rounded-full shadow-lg hover:bg-textTeal/80 transition-all duration-200 hover:scale-110"
                title="Change Language"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 8l6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                </svg>
            </button>

            {showModal && (
                <div className="fixed inset-0 z-999 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center space-y-6">
                        <Image src="/images/logo.png" alt="Logo" className="mx-auto" width={96} height={96} />

                        <div className="flex gap-4">
                            <button className="bg-textTeal text-white w-full py-2 rounded-lg hover:bg-textTeal/80 transition" onClick={() => handleConfirm('ar')}>العربية</button>
                            <button className="bg-textTeal text-white w-full py-2 rounded-lg hover:bg-textTeal/80 transition" onClick={() => handleConfirm('en')}>English</button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

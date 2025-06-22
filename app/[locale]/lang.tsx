'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSelectorModal() {
    const router = useRouter();
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(false);
    const [selectedLocale, setSelectedLocale] = useState('');
    const { setLanguage } = useLanguage();
    useEffect(() => {
        const saved = localStorage.getItem('preferred-locale');
        const currentLocaleFromPath = pathname.split('/')[1];

        if (!saved || (saved && currentLocaleFromPath !== saved)) {
            setShowModal(true);
        }
    }, [pathname]);

    const handleConfirm = () => {
        if (!selectedLocale) return;

        localStorage.setItem('preferred-locale', selectedLocale);
        setLanguage(selectedLocale);
        const currentLocale = pathname.split('/')[1];
        if (selectedLocale !== currentLocale) {
            const remainingPath = pathname
                .split('/')
                .slice(2)
                .join('/');
            const newPath = `/${selectedLocale}/${remainingPath}`;
            router.replace(newPath || `/${selectedLocale}`);
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
                className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 bg-[#155dfc] text-white p-3 rounded-full shadow-lg hover:bg-[#155dfc]/80 transition-all duration-200 hover:scale-110"
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
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center space-y-6">
                        <Image src="/images/logo.png" alt="Logo" className="mx-auto" width={96} height={96} />

                        <select
                            className="w-full p-3 border rounded-lg text-lg"
                            value={selectedLocale}
                            onChange={(e) => setSelectedLocale(e.target.value)}
                        >
                            <option value="">اختر اللغة</option>
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                        </select>
                        <button
                            className="bg-[#155dfc] text-white w-full py-2 rounded-lg hover:bg-[#155dfc]/80 transition"
                            onClick={handleConfirm}
                        >
                            تأكيد
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

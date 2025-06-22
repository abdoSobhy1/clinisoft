// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
    const router = useRouter();

    useEffect(() => {
        const savedLocale = localStorage.getItem('preferred-locale');

        const supportedLocales = ['en', 'ar'];
        const fallbackLocale = 'en';

        const localeToUse =
            savedLocale && supportedLocales.includes(savedLocale)
                ? savedLocale
                : fallbackLocale;

        router.replace(`/${localeToUse}`);
    }, []);

    return null;
}

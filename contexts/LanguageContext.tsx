'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';


interface LanguageContextType {
    currentLanguage: string;
    setLanguage: (lang: string) => void;
    isRTL: boolean;
    direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const pathname = usePathname();
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');

    useEffect(() => {
        const pathSegments = pathname.split('/');
        const localeFromPath = pathSegments[1] as string;

        if (localeFromPath === 'ar' || localeFromPath === 'en') {
            setCurrentLanguage(localeFromPath);
        }
    }, [pathname]);

    const setLanguage = (lang: string) => {
        setCurrentLanguage(lang);
        localStorage.setItem('preferred-locale', lang);
    };

    const isRTL = currentLanguage === 'ar';
    const direction = isRTL ? 'rtl' : 'ltr';

    const value: LanguageContextType = {
        currentLanguage,
        setLanguage,
        isRTL,
        direction,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
} 
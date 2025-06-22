import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({
    children,
    params
}: {
    children: ReactNode;
    params?: { locale?: string };
}) {
    const locale = params?.locale || 'en';

    return (
        <html lang={locale}>
            <body>
                {children}
            </body>
        </html>
    );
} 
import './globals.css';
import { ReactNode } from 'react';

export default async function RootLayout({
    children,
    params
}: {
    children: ReactNode;
    params?: Promise<{ locale?: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams?.locale || 'en';

    return (
        <html lang={locale}>
            <body className='antialiased bg-[#F1FFFF]'>
                {children}
            </body>
        </html>
    );
} 
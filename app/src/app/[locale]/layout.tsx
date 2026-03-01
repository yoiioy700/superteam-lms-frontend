import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { WalletProvider } from '@/components/WalletProvider';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} className="dark">
            <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
                <NextAuthProvider>
                    <WalletProvider>
                        <NextIntlClientProvider messages={messages}>
                            <div className="relative flex min-h-screen flex-col">
                                <Navbar />
                                <main className="flex-1">{children}</main>
                            </div>
                        </NextIntlClientProvider>
                    </WalletProvider>
                </NextAuthProvider>
            </body>
        </html>
    );
}

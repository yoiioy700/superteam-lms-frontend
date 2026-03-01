"use client";

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const locale = useLocale();

    return (
        <nav className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href={`/${locale}`} className="flex items-center space-x-2">
                        <span className="font-bold sm:inline-block">
                            Superteam Academy
                        </span>
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link href={`/${locale}/courses`} className="text-sm font-medium transition-colors hover:text-primary">
                            Courses
                        </Link>
                        <Link href={`/${locale}/dashboard`} className="text-sm font-medium transition-colors hover:text-primary">
                            Dashboard
                        </Link>
                        <Link href={`/${locale}/leaderboard`} className="text-sm font-medium transition-colors hover:text-primary">
                            Leaderboard
                        </Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <LanguageSwitcher />

                    {/* NextAuth Login Stub */}
                    <Link href="/api/auth/signin">
                        <Button variant="ghost" size="sm">Auth Sync</Button>
                    </Link>

                    {/* Solana Wallet Adapter Button */}
                    <WalletMultiButton className="!bg-primary !h-9 !py-2 !px-4 !rounded-md !text-sm !font-medium" />
                </div>
            </div>
        </nav>
    );
}

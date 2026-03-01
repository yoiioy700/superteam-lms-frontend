"use client";

import { User } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
);

interface Breadcrumb {
    label: string;
    href?: string;
}

export function DashboardHeader({
    title,
    subtitle,
    breadcrumbs
}: {
    title?: string,
    subtitle?: string,
    breadcrumbs?: Breadcrumb[]
}) {
    const { publicKey } = useWallet();

    return (
        <header className="flex justify-between items-center w-full mb-12">
            <div className="flex flex-col gap-2">
                {breadcrumbs ? (
                    <div className="flex items-center gap-2">
                        {breadcrumbs.map((bc, i) => (
                            <span key={i} className="flex items-center gap-2">
                                {bc.href ? (
                                    <a href={bc.href} className="text-[#888888] font-manrope text-xs hover:text-[#C9A962] transition-colors">{bc.label}</a>
                                ) : (
                                    <span className="text-[#C9A962] font-manrope text-xs font-medium">{bc.label}</span>
                                )}
                                {i < breadcrumbs.length - 1 && <span className="text-[#888888] text-xs">›</span>}
                            </span>
                        ))}
                    </div>
                ) : (
                    <>
                        {title && <h1 className="text-[#FAF8F5] font-playfair text-[48px] leading-tight">{title}</h1>}
                        {subtitle && <p className="text-[#888888] font-manrope text-[14px]">{subtitle}</p>}
                    </>
                )}
            </div>

            <div className="flex items-center gap-4">
                {publicKey ? (
                    <div className="flex items-center gap-3 px-4 py-2 bg-[#1E1E1E] border border-[#1F1F1F] rounded-md">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-[#FAF8F5] font-manrope font-medium text-[12px]">
                            {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                        </span>
                    </div>
                ) : (
                    <WalletMultiButton style={{ backgroundColor: '#C9A962', color: '#0F0F0F', borderRadius: '6px', fontFamily: 'var(--font-manrope)', fontWeight: 600, fontSize: '14px', height: '40px' }} />
                )}
            </div>
        </header>
    );
}

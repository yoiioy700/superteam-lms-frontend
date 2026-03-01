"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, TrendingUp, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Course Catalog", href: "/catalog", icon: LayoutGrid },
    { name: "My Learning", href: "/learning", icon: TrendingUp },
    { name: "Leaderboard", href: "/leaderboard", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[280px] h-screen bg-[#0A0A0A] border-r border-[#1F1F1F] flex flex-col shrink-0">
            <div className="flex items-center gap-2 px-7 py-10">
                <LayoutGrid className="w-5 h-5 text-primary" />
                <span className="text-[#FAF8F5] font-playfair text-[22px] tracking-wide">
                    SUPERTEAM
                </span>
            </div>

            <nav className="flex flex-col gap-2 px-7 w-full flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3.5 px-4 py-3.5 w-full transition-colors rounded-sm",
                                isActive
                                    ? "bg-primary/10 border-l-[2px] border-primary text-[#FAF8F5]"
                                    : "text-[#888888] hover:text-[#FAF8F5] hover:bg-white/5 border-l-[2px] border-transparent"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-[18px] h-[18px]",
                                    isActive ? "text-primary" : "text-[#888888]"
                                )}
                            />
                            <span className={cn("text-sm font-manrope", isActive ? "font-medium text-[#FAF8F5]" : "font-normal")}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

"use client";

import { DashboardSidebar } from "./DashboardSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full min-h-screen bg-[#0F0F0F] text-foreground">
            <DashboardSidebar />
            <main className="flex-1 flex flex-col p-12 max-h-screen overflow-y-auto overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}

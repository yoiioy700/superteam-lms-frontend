"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { CourseCard } from "@/components/CourseCard";
import { Search, ChevronDown, Code, LayoutGrid, Shield } from "lucide-react";

export default function CatalogPage() {
    return (
        <DashboardLayout>
            <DashboardHeader
                title="Course Catalog"
                subtitle="Browse and enroll in new programs."
            />

            <div className="flex flex-col gap-8 w-full">
                {/* Filters */}
                <div className="flex gap-4 items-center w-full">
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#1E1E1E] border border-[#1F1F1F] rounded-md w-80">
                        <Search className="w-4 h-4 text-[#888888]" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="bg-transparent border-none outline-none text-[13px] text-[#FAF8F5] font-manrope w-full placeholder:text-[#666666]"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-3 border border-[#1F1F1F] rounded-md text-[#FAF8F5] font-manrope text-[13px] hover:bg-[#1E1E1E] transition">
                        Level
                        <ChevronDown className="w-3.5 h-3.5 text-[#888888]" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-3 border border-[#1F1F1F] rounded-md text-[#FAF8F5] font-manrope text-[13px] hover:bg-[#1E1E1E] transition">
                        Topics
                        <ChevronDown className="w-3.5 h-3.5 text-[#888888]" />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CourseCard
                        id="rust-for-solana"
                        title="Rust for Solana"
                        level="INTERMEDIATE"
                        color="#4ADE80"
                        desc="Deep dive into Rust programming specifically for writing Solana smart contracts."
                        icon={<Code className="w-16 h-16 text-[#C9A962]/40 group-hover:-translate-y-2 group-hover:scale-110 transition duration-500" />}
                    />
                    <CourseCard
                        id="intro-to-solana"
                        title="Intro to Solana"
                        level="BEGINNER"
                        color="#C9A962"
                        desc="Fundamentals of Solana architecture, accounts, and the programming model."
                        icon={<LayoutGrid className="w-16 h-16 text-[#C9A962]/40 group-hover:-translate-y-2 group-hover:scale-110 transition duration-500" />}
                    />
                    <CourseCard
                        id="anchor-security"
                        title="Anchor Security"
                        level="ADVANCED"
                        color="#F87171"
                        desc="Identify vulnerabilities and master security patterns in Anchor programs."
                        icon={<Shield className="w-16 h-16 text-[#C9A962]/40 group-hover:-translate-y-2 group-hover:scale-110 transition duration-500" />}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}

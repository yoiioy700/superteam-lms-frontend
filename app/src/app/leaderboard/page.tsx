"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Trophy, Star, ChevronDown } from "lucide-react";

// Mock Data for the Leaderboard representing on-chain XP states
const TOP_USERS = [
    { rank: 1, name: "SolanaKing", address: "7XF2...b9kP", xp: 12500, courses: 8, avatar: "🤴" },
    { rank: 2, name: "RustAce", address: "3AB1...x2mN", xp: 11200, courses: 7, avatar: "🦀" },
    { rank: 3, name: "CryptoDev", address: "9YZ4...c8vL", xp: 10800, courses: 7, avatar: "💻" },
];

interface User {
    rank: number;
    name: string;
    address: string;
    xp: number;
    courses: number;
    avatar: string;
}

const OTHER_USERS: User[] = [
    { rank: 4, name: "Web3Wizard", address: "2MN8...d1qW", xp: 9500, courses: 6, avatar: "🧙" },
    { rank: 5, name: "AnchorPro", address: "5KL9...f4rS", xp: 8200, courses: 5, avatar: "⚓" },
    { rank: 6, name: "BlockBuilder", address: "8GH3...t7yU", xp: 7900, courses: 5, avatar: "🧱" },
    { rank: 7, name: "SmartContractor", address: "1PQ6...p2jV", xp: 7100, courses: 4, avatar: "📜" },
    { rank: 8, name: "DeFiDegen", address: "4XY7...n5cH", xp: 6800, courses: 4, avatar: "🦄" },
    { rank: 9, name: "TokenMaster", address: "6VW2...m9kB", xp: 6500, courses: 4, avatar: "🪙" },
    { rank: 10, name: "NFTNinja", address: "0ST5...z3xM", xp: 5900, courses: 3, avatar: "🥷" },
];

export default function LeaderboardPage() {
    return (
        <DashboardLayout>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Community", href: "#" },
                    { label: "Leaderboard" }
                ]}
            />

            <div className="flex flex-col gap-10 max-w-5xl mx-auto w-full pb-10">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center gap-4 mt-8">
                    <div className="w-16 h-16 bg-[#C9A962]/10 rounded-full flex items-center justify-center border border-[#C9A962]/30 mb-2">
                        <Trophy className="w-8 h-8 text-[#C9A962]" />
                    </div>
                    <h1 className="text-4xl font-playfair text-[#FAF8F5]">Global Hall of Fame</h1>
                    <p className="text-[#888888] font-manrope text-[15px] max-w-lg">
                        Climb the ranks by completing courses, finishing lessons, and claiming bounties on the Superteam Academy.
                    </p>
                </div>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-6 mt-6 items-end">
                    {/* Rank 2 (Silver) */}
                    <PodiumCard
                        user={TOP_USERS[1]}
                        color="bg-[#C0C0C0]"
                        borderColor="border-[#C0C0C0]/50"
                        textColor="text-[#C0C0C0]"
                        height="h-[220px]"
                    />

                    {/* Rank 1 (Gold) */}
                    <div className="relative -mt-8">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl">👑</div>
                        <PodiumCard
                            user={TOP_USERS[0]}
                            color="bg-[#C9A962]"
                            borderColor="border-[#C9A962]"
                            textColor="text-[#C9A962]"
                            height="h-[260px]"
                        />
                    </div>

                    {/* Rank 3 (Bronze) */}
                    <PodiumCard
                        user={TOP_USERS[2]}
                        color="bg-[#CD7F32]"
                        borderColor="border-[#CD7F32]/50"
                        textColor="text-[#CD7F32]"
                        height="h-[200px]"
                    />
                </div>

                {/* Rest of the Leaderboard Table */}
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl overflow-hidden mt-4">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1F1F1F] bg-[#1E1E1E]/50 font-manrope text-xs font-semibold text-[#888888] uppercase tracking-wider">
                        <div className="col-span-1 text-center">Rank</div>
                        <div className="col-span-1"></div>
                        <div className="col-span-4">Student</div>
                        <div className="col-span-3 text-center">Courses Completed</div>
                        <div className="col-span-3 text-right pr-4">Total XP</div>
                    </div>

                    <div className="flex flex-col">
                        {OTHER_USERS.map((user) => (
                            <div key={user.rank} className="grid grid-cols-12 gap-4 p-4 border-b border-[#1F1F1F] hover:bg-[#1E1E1E]/30 transition items-center font-manrope">
                                <div className="col-span-1 text-center font-semibold text-[#888888]">
                                    #{user.rank}
                                </div>
                                <div className="col-span-1 flex justify-center text-xl">
                                    {user.avatar}
                                </div>
                                <div className="col-span-4 flex flex-col justify-center">
                                    <span className="text-[#FAF8F5] font-medium text-[15px]">{user.name}</span>
                                    <span className="text-[#888888] text-xs font-mono">{user.address}</span>
                                </div>
                                <div className="col-span-3 text-center text-[#FAF8F5] font-medium text-[15px]">
                                    {user.courses}
                                </div>
                                <div className="col-span-3 text-right flex items-center justify-end gap-2 pr-4">
                                    <span className="text-[#FAF8F5] font-semibold text-[15px]">{user.xp.toLocaleString()}</span>
                                    <span className="text-[#C9A962] font-semibold text-xs">XP</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Mock */}
                    <div className="p-4 flex justify-center border-t border-[#1F1F1F]">
                        <button className="px-6 py-2 bg-[#1E1E1E] text-[#FAF8F5] rounded-md font-manrope text-sm hover:bg-[#C9A962]/20 hover:text-[#C9A962] border border-[#1F1F1F] transition flex items-center gap-2">
                            Load More Knights <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

function PodiumCard({ user, color, borderColor, textColor, height }: { user: User, color: string, borderColor: string, textColor: string, height: string }) {
    return (
        <div className={`flex flex-col items-center bg-[#0A0A0A] border ${borderColor} rounded-t-2xl pt-6 px-4 ${height} relative overflow-hidden group`}>
            {/* Background Glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 ${color} blur-[60px] opacity-10 group-hover:opacity-20 transition duration-500`}></div>

            <div className="text-4xl mb-3 z-10">{user.avatar}</div>
            <h3 className="text-[#FAF8F5] font-manrope font-bold text-lg z-10">{user.name}</h3>
            <span className="text-[#888888] font-mono text-xs mb-4 z-10">{user.address}</span>

            <div className="flex-1 w-full flex flex-col justify-end items-center pb-6 z-10">
                <div className={`flex items-center gap-2 ${textColor}`}>
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-playfair font-bold text-2xl">{user.xp.toLocaleString()}</span>
                </div>
                <span className="text-[#888888] font-manrope text-xs mt-1 uppercase tracking-widest">Points</span>
            </div>

            {/* Rank Badge */}
            <div className={`absolute -bottom-6 w-full h-12 ${color} flex items-start justify-center pt-2`}>
                <span className="text-[#0F0F0F] font-black font-manrope text-lg">#{user.rank}</span>
            </div>
        </div>
    );
}

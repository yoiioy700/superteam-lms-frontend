"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import Link from "next/link";
import { BookOpen, CheckCircle2, PlayCircle, Lock, Clock, Star } from "lucide-react";

const enrolledCourses = [
    {
        id: "rust-for-solana",
        title: "Rust for Solana",
        level: "INTERMEDIATE",
        levelColor: "#4ADE80",
        progress: 60,
        completedLessons: 12,
        totalLessons: 20,
        xpEarned: 1200,
        totalXp: 2000,
        lastActivity: "2 days ago",
        lessons: [
            { id: "0", title: "Intro to Rust Ownership", status: "completed" },
            { id: "1", title: "Writing Your First Solana Program", status: "completed" },
            { id: "2", title: "Anchor Framework Basics", status: "active" },
            { id: "3", title: "PDA Deep Dive", status: "locked" },
        ],
    },
    {
        id: "intro-to-solana",
        title: "Intro to Solana",
        level: "BEGINNER",
        levelColor: "#C9A962",
        progress: 25,
        completedLessons: 3,
        totalLessons: 12,
        xpEarned: 300,
        totalXp: 1200,
        lastActivity: "1 week ago",
        lessons: [
            { id: "0", title: "What is Solana?", status: "completed" },
            { id: "1", title: "Accounts Model", status: "completed" },
            { id: "2", title: "Transactions & Instructions", status: "active" },
            { id: "3", title: "Keypairs & Wallets", status: "locked" },
        ],
    },
];

const statusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />;
    if (status === "active") return <PlayCircle className="w-4 h-4 text-[#C9A962]" />;
    return <Lock className="w-4 h-4 text-[#555]" />;
};

export default function MyLearningPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col h-full bg-[#0A0A0A]">
                <DashboardHeader title="My Learning" />
                <div className="flex-1 overflow-auto p-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div>
                            <h2 className="text-2xl font-playfair text-[#FAF8F5] mb-2">Enrolled Courses</h2>
                            <p className="text-[#888888] font-manrope text-sm">Track your progress and continue where you left off.</p>
                        </div>

                        {enrolledCourses.map((course) => (
                            <div key={course.id} className="border border-[#1F1F1F] bg-[#0F0F0F] rounded-lg overflow-hidden">
                                {/* Course Header */}
                                <div className="p-6 border-b border-[#1F1F1F]">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#1E1E1E] rounded-md">
                                                <BookOpen className="w-5 h-5 text-[#C9A962]" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-playfair text-[#FAF8F5]">{course.title}</h3>
                                                <span className="text-xs font-bold tracking-wider px-2 py-0.5 rounded" style={{ color: course.levelColor, backgroundColor: `${course.levelColor}15` }}>
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#C9A962] font-manrope text-sm font-bold">{course.xpEarned} / {course.totalXp} XP</p>
                                            <div className="flex items-center gap-1 text-[#888] text-xs mt-1">
                                                <Clock className="w-3 h-3" />
                                                <span>Last active {course.lastActivity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-manrope text-[#888]">
                                            <span>{course.completedLessons}/{course.totalLessons} Lessons Completed</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-[#1E1E1E] rounded-full overflow-hidden">
                                            <div className="h-full bg-[#C9A962] rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lesson List */}
                                <div className="divide-y divide-[#1F1F1F]">
                                    {course.lessons.map((lesson) => (
                                        <div key={lesson.id} className={`flex items-center gap-4 px-6 py-4 ${lesson.status === 'locked' ? 'opacity-40' : 'hover:bg-white/5'} transition`}>
                                            {statusIcon(lesson.status)}
                                            {lesson.status !== 'locked' ? (
                                                <Link href={`/course/${course.id}/lessons/${lesson.id}`} className="text-sm font-manrope text-[#FAF8F5] hover:text-primary transition flex-1">
                                                    {lesson.title}
                                                </Link>
                                            ) : (
                                                <span className="text-sm font-manrope text-[#888] flex-1">{lesson.title}</span>
                                            )}
                                            {lesson.status === 'active' && (
                                                <Link href={`/course/${course.id}/lessons/${lesson.id}`} className="px-4 py-1.5 bg-primary text-[#0F0F0F] rounded font-manrope text-xs font-bold hover:bg-[#E6D199] transition">
                                                    Continue
                                                </Link>
                                            )}
                                            {lesson.status === 'completed' && (
                                                <div className="flex items-center gap-1 text-[#C9A962] text-xs font-manrope">
                                                    <Star className="w-3 h-3" />
                                                    <span>+100 XP</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

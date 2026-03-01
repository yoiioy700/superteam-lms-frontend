"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Clock, Users, Star, PlayCircle, CheckCircle2, Circle, ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAcademyProgram, getEnrollmentPDA } from "@/lib/anchor/setup";
import { SystemProgram } from "@solana/web3.js";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
    const { publicKey } = useWallet();
    const { program } = useAcademyProgram();
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [completingLessonStr, setCompletingLessonStr] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    // Hardcoded course ID for demo based on URL or static 'rust-for-solana'
    const courseId = params?.id || "rust-for-solana";

    const handleCompleteLesson = async (lessonIndex: number, lessonTitle: string) => {
        if (!publicKey || !program || !isEnrolled) return;

        try {
            setCompletingLessonStr(lessonTitle);
            const [enrollmentPda] = getEnrollmentPDA(courseId, publicKey);

            const tx = await program.methods
                .completeLesson(lessonIndex)
                .accounts({
                    enrollment: enrollmentPda,
                    user: publicKey,
                })
                .rpc();

            console.log("Lesson completed successfully:", tx);
            // In a real app we would refetch the enrollment data here to update the UI
            alert(`Lesson '${lessonTitle}' marked as complete on-chain!`);
        } catch (error) {
            console.error("Complete lesson failed:", error);
            alert("Failed to complete lesson: " + String(error));
        } finally {
            setCompletingLessonStr(null);
        }
    };

    const handleEnroll = async () => {
        if (!publicKey || !program) {
            alert("Please connect your wallet first");
            return;
        }

        try {
            setIsEnrolling(true);
            const [enrollmentPda] = getEnrollmentPDA(courseId, publicKey);

            const tx = await program.methods
                .enroll(courseId)
                .accounts({
                    enrollment: enrollmentPda,
                    user: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            console.log("Enrollment successful:", tx);
            setIsEnrolled(true);
        } catch (error) {
            console.error("Enrollment failed:", error);
            alert("Failed to enroll: " + String(error));
        } finally {
            setIsEnrolling(false);
        }
    };

    return (
        <DashboardLayout>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Courses", href: "/catalog" },
                    { label: "Rust for Solana" }
                ]}
            />

            <div className="flex gap-12 w-full">
                {/* Left Column - Main Content */}
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-playfair text-[#FAF8F5]">Rust for Solana</h1>
                        <p className="text-[#888888] font-manrope text-[15px] leading-relaxed">
                            Deep dive into Rust programming specifically tailored for writing secure and efficient Solana smart contracts. Learn memory safety, lifetimes, and Anchor framework integration.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 py-4 border-y border-[#1F1F1F]">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-[#FAF8F5] font-manrope text-sm">12 Hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-[#FAF8F5] font-manrope text-sm">1,240 Enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary" />
                            <span className="text-[#FAF8F5] font-manrope text-sm">4.9/5.0</span>
                        </div>
                    </div>

                    <div className="w-full aspect-video bg-[#1E1E1E] border border-[#1F1F1F] rounded-lg flex items-center justify-center relative overflow-hidden group hover:border-[#C9A962]/50 transition cursor-pointer">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
                        <PlayCircle className="w-16 h-16 text-[#FAF8F5] opacity-80 group-hover:scale-110 group-hover:text-primary transition duration-300 z-10" />
                        <span className="absolute bottom-4 left-4 text-[#888888] font-manrope text-sm z-10">24:15</span>
                    </div>

                    <div className="flex gap-8 border-b border-[#1F1F1F]">
                        <div className="pb-3 border-b-2 border-primary text-[#FAF8F5] font-manrope font-medium text-[15px] cursor-pointer">Overview</div>
                        <div className="pb-3 border-b-2 border-transparent text-[#888888] hover:text-[#FAF8F5] font-manrope font-medium text-[15px] transition cursor-pointer">Instructor</div>
                        <div className="pb-3 border-b-2 border-transparent text-[#888888] hover:text-[#FAF8F5] font-manrope font-medium text-[15px] transition cursor-pointer">Reviews</div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#FAF8F5] font-playfair text-xl">What you&apos;ll learn</h3>
                        <ul className="text-[#888888] font-manrope flex flex-col gap-3 text-sm">
                            <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Understand Rust ownership and borrowing.</li>
                            <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Write secure Solana smart contracts using Anchor.</li>
                            <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5" /> Deploy and test programs on localnet and devnet.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Syllabus Sidebar */}
                <div className="w-[380px] shrink-0 flex flex-col gap-6">
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg p-6 flex flex-col gap-6 sticky top-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-[#FAF8F5] font-playfair text-xl">Course Syllabus</h2>

                            {!isEnrolled ? (
                                <button
                                    onClick={handleEnroll}
                                    disabled={isEnrolling}
                                    className="px-4 py-2 bg-primary text-[#0F0F0F] rounded font-manrope font-semibold text-sm hover:bg-[#E6D199] transition disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isEnrolling && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                            ) : (
                                <span className="px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] border border-[#4ADE80]/20 rounded text-xs font-semibold">Enrolled</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm font-manrope mb-1">
                                <span className="text-[#FAF8F5]">60% Complete</span>
                                <span className="text-[#888888]">12/20 Lessons</span>
                            </div>
                            <div className="w-full h-2 bg-[#1E1E1E] rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[60%] rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <ModuleAccordion
                                title="1. Rust Fundamentals"
                                duration="2h 15m"
                                isOpen={true}
                                completingLessonStr={completingLessonStr}
                                onCompleteLesson={handleCompleteLesson}
                                startIndex={0}
                                lessons={[
                                    { title: "Variables & Mutability", duration: "10:00", state: "completed" },
                                    { title: "Data Types", duration: "15:30", state: "completed" },
                                    { title: "Ownership System", duration: "25:00", state: "active" },
                                    { title: "Structs & Enums", duration: "20:00", state: "pending" },
                                ]}
                            />
                            <ModuleAccordion
                                title="2. Intro to Solana"
                                duration="1h 45m"
                                isOpen={false}
                                completingLessonStr={completingLessonStr}
                                onCompleteLesson={handleCompleteLesson}
                                startIndex={4}
                                lessons={[]}
                            />
                            <ModuleAccordion
                                title="3. Anchor Framework"
                                duration="3h 20m"
                                isOpen={false}
                                completingLessonStr={completingLessonStr}
                                onCompleteLesson={handleCompleteLesson}
                                startIndex={10} // Just an example index
                                lessons={[]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function ModuleAccordion({
    title, duration, isOpen, lessons, onCompleteLesson, completingLessonStr, startIndex
}: {
    title: string, duration: string, isOpen: boolean,
    lessons: { title: string, duration: string, state: string }[],
    onCompleteLesson: (index: number, title: string) => void,
    completingLessonStr: string | null,
    startIndex: number
}) {
    return (
        <div className="flex flex-col border border-[#1F1F1F] rounded-md overflow-hidden bg-[#0F0F0F]">
            <div className={`flex justify-between items-center p-4 cursor-pointer hover:bg-[#1E1E1E] transition ${isOpen ? 'bg-[#1E1E1E] border-b border-[#1F1F1F]' : ''}`}>
                <div className="flex flex-col gap-1">
                    <span className="text-[#FAF8F5] font-manrope text-[13px] font-medium">{title}</span>
                    <span className="text-[#888888] font-manrope text-xs">{duration}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <div className="flex flex-col p-2">
                    {lessons.map((l, i) => {
                        const isCompletingThis = completingLessonStr === l.title;

                        return (
                            <div key={i} className={`flex items-center justify-between p-3 rounded-md transition cursor-pointer ${l.state === 'active' ? 'bg-[#1E1E1E]' : 'hover:bg-white/5'}`}>
                                <div className="flex items-center gap-3">
                                    {l.state === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />}
                                    {l.state === 'active' && <PlayCircle className="w-4 h-4 text-primary" />}
                                    {l.state === 'pending' && <Circle className="w-4 h-4 text-[#888888]" />}
                                    <Link href={`/course/rust-for-solana/lessons/${startIndex + i}`} className={`font-manrope text-[13px] ${l.state === 'active' ? 'text-primary font-medium hover:underline' : 'text-[#FAF8F5]'}`}>
                                        {l.title}
                                    </Link>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-[#888888] font-manrope text-xs">{l.duration}</span>

                                    {l.state === 'active' && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onCompleteLesson(startIndex + i, l.title); }}
                                            disabled={isCompletingThis}
                                            className="px-2 py-1 bg-[#1E1E1E] border border-[#1F1F1F] rounded text-xs text-[#FAF8F5] hover:bg-primary/20 hover:text-primary transition disabled:opacity-50 flex items-center gap-1"
                                        >
                                            {isCompletingThis && <Loader2 className="w-3 h-3 animate-spin" />}
                                            Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

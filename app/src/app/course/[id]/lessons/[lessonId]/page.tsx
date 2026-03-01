"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Play, CheckCircle2, ChevronLeft, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";

const Editor = dynamic(() => import("@monaco-editor/react"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-[#1E1E1E] flex items-center justify-center">
            <span className="text-[#888] font-manrope text-sm">Loading editor...</span>
        </div>
    ),
});

const INITIAL_CODE = `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod my_first_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello, Solana World!");
        // TODO: Complete the logic to return Ok(())
        
    }
}

#[derive(Accounts)]
pub struct Initialize {}
`;

export default function LessonPage({ params }: { params: { id: string, lessonId: string } }) {
    const { publicKey } = useWallet();
    const [code, setCode] = useState(INITIAL_CODE);
    const [isCompiling, setIsCompiling] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<string[]>(["Compiler initialized.", "Ready for input."]);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleEditorChange = (value: string | undefined) => {
        if (value) setCode(value);
    };

    const handleRunCode = () => {
        if (!publicKey) {
            alert("Please connect your wallet to earn XP points!");
            return;
        }

        setIsCompiling(true);
        setConsoleOutput(["Compiling your Rust program...", "> cargo build-sbf"]);
        setIsSuccess(false);

        // Mock Compilation Simulation
        setTimeout(() => {
            const hasOk = code.includes("Ok(())");
            const hasMsg = code.includes("msg!(");
            const hasSuper = code.includes("use super::*;");

            if (hasOk && hasMsg && hasSuper) {
                setConsoleOutput(prev => [
                    ...prev,
                    "   Compiling my_first_program v0.1.0",
                    "    Finished release [optimized] target(s) in 2.34s",
                    "",
                    "✅ Build successful!",
                    "🚀 Transaction confirmed on Devnet. You earned +50 XP!"
                ]);
                setIsSuccess(true);
            } else {
                setConsoleOutput(prev => [
                    ...prev,
                    "error[E0308]: mismatched types",
                    "  --> src/lib.rs:8:5",
                    "   |",
                    " 8 |     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {",
                    "   |                                                    ---------- expected `std::result::Result<(), anchor_lang::error::Error>` because of return type",
                    " 9 |         msg!(\"Hello, Solana World!\");",
                    "   |                                      - help: consider returning an `Ok(())` here",
                    "",
                    "❌ Build failed. Please check the error logs above."
                ]);
            }
            setIsCompiling(false);
        }, 1500);
    };

    return (
        <DashboardLayout>
            <DashboardHeader
                breadcrumbs={[
                    { label: "Courses", href: "/catalog" },
                    { label: "Rust for Solana", href: `/course/${params.id}` },
                    { label: "Lesson 1: Hello World" }
                ]}
            />

            <div className="flex justify-between items-center mb-6">
                <Link href={`/course/${params.id}`} className="text-[#888888] hover:text-[#FAF8F5] transition flex items-center gap-2 font-manrope text-sm">
                    <ChevronLeft className="w-4 h-4" /> Back to Syllabus
                </Link>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-[#1E1E1E] text-[#888888] rounded-md font-manrope text-sm border border-[#1F1F1F] hover:text-[#FAF8F5] transition">
                        Reset Code
                    </button>
                    <button
                        onClick={handleRunCode}
                        disabled={isCompiling}
                        className="px-6 py-2 bg-primary text-[#0F0F0F] rounded-md font-manrope font-semibold text-sm hover:bg-[#E6D199] transition disabled:opacity-50 flex items-center gap-2"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        {isCompiling ? 'Compiling...' : 'Run Code & Earn XP'}
                    </button>
                </div>
            </div>

            <div className="flex gap-6 h-[calc(100vh-220px)] w-full">

                {/* Left Pane: Instructions */}
                <div className="w-[400px] shrink-0 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-[#1F1F1F] bg-[#1E1E1E]/50">
                        <h2 className="text-[#FAF8F5] font-playfair text-xl">1. Hello World</h2>
                    </div>
                    <div className="p-6 overflow-y-auto flex-1 font-manrope text-[15px] leading-relaxed flex flex-col gap-6 text-[#A0A0A0]">
                        <p>
                            Welcome to your first Solana smart contract! In Solana, smart contracts are called <strong>Programs</strong>.
                        </p>
                        <p>
                            We use the <strong>Anchor Framework</strong> to build programs easily. It abstracts away a lot of boilerplate security checks.
                        </p>
                        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded p-4 flex flex-col gap-2">
                            <h4 className="text-[#FAF8F5] font-semibold text-sm">🎯 Your Objective</h4>
                            <p className="text-sm">
                                Complete the <code>initialize</code> function by returning a successful Result. In Rust, we use <code>Ok(())</code> to signify success indicating an empty tuple was returned without errors.
                            </p>
                        </div>
                        <p>
                            <strong>Hints:</strong>
                            <br />- Don&apos;t forget the semicolon if it&apos;s a statement, but here it&apos;s a return expression, so you can omit the semicolon on the `Ok(())`.
                        </p>

                        {isSuccess && (
                            <div className="mt-8 p-4 bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded flex gap-3 text-[#4ADE80]">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm">Lesson Completed!</span>
                                    <span className="text-xs opacity-80">+50 XP has been added to your account on-chain.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Pane: Editor & Console */}
                <div className="flex-1 flex flex-col gap-4 min-w-0">
                    {/* Editor */}
                    <div className="flex-1 border border-[#1F1F1F] rounded-lg overflow-hidden relative">
                        <Editor
                            height="100%"
                            defaultLanguage="rust"
                            theme="vs-dark"
                            value={code}
                            onChange={handleEditorChange}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                padding: { top: 16, bottom: 16 },
                                smoothScrolling: true,
                                cursorBlinking: "smooth",
                            }}
                        />
                    </div>

                    {/* Console Output */}
                    <div className="h-[200px] shrink-0 bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg flex flex-col overflow-hidden">
                        <div className="px-4 py-2 border-b border-[#1F1F1F] bg-[#1E1E1E]/50 flex items-center gap-2">
                            <TerminalSquare className="w-4 h-4 text-[#888888]" />
                            <span className="text-[#888888] font-manrope text-xs font-medium uppercase tracking-wider">Build Output</span>
                        </div>
                        <div className="p-4 overflow-y-auto flex-1 font-mono text-[13px] text-[#A0A0A0] flex flex-col gap-1">
                            {consoleOutput.map((line, idx) => (
                                <div key={idx} className={`${line.includes('error') || line.includes('❌') ? 'text-[#EF4444]' : line.includes('✅') || line.includes('🚀') ? 'text-[#4ADE80]' : ''}`}>
                                    {line}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

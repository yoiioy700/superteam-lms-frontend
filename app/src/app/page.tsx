"use client";

import Link from "next/link";
import { LayoutGrid, PlayCircle, Trophy, Code, Shield } from "lucide-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-6 border-b border-[#1F1F1F] bg-[#0A0A0A]">
        <div className="flex items-center gap-3">
          <LayoutGrid className="w-6 h-6 text-primary" />
          <span className="text-[#FAF8F5] font-playfair text-2xl tracking-wide">
            SUPERTEAM
          </span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/catalog" className="text-[#888888] font-manrope text-sm hover:text-primary transition">Courses</Link>
          <Link href="/leaderboard" className="text-[#888888] font-manrope text-sm hover:text-primary transition">Leaderboard</Link>
          <div className="flex gap-4 ml-4">
            <Link href="/catalog" className="px-5 py-2.5 text-sm font-manrope font-medium text-[#FAF8F5] hover:text-primary transition mt-1">Sign In</Link>
            <WalletMultiButton style={{ backgroundColor: '#1E1E1E', color: '#C9A962', borderRadius: '6px', fontFamily: 'var(--font-manrope)', fontWeight: 600, fontSize: '14px', height: '44px', border: '1px solid rgba(201, 169, 98, 0.5)' }} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#C9A962]/10 via-[#0F0F0F] to-[#0F0F0F] z-0 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl flex flex-col items-center gap-8">
          <h1 className="text-5xl md:text-7xl font-playfair text-[#FAF8F5] leading-tight tracking-tight">
            Master Solana <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#E6D199]">Development</span>
          </h1>
          <p className="text-[#888888] font-manrope text-lg md:text-xl max-w-2xl leading-relaxed">
            Decentralized learning platform on Solana. Enroll in premium courses, earn soulbound XP, and prove your skills with on-chain credentials.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/catalog" className="px-8 py-3.5 bg-primary text-[#0F0F0F] font-manrope font-bold text-base rounded-md hover:bg-[#E6D199] transition">
              Explore Courses
            </Link>
            <Link href="/about" className="px-8 py-3.5 bg-[#1E1E1E] text-[#FAF8F5] border border-[#1F1F1F] font-manrope font-medium text-base rounded-md hover:border-[#C9A962]/50 transition">
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-12 bg-[#0A0A0A] border-t border-[#1F1F1F]">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4 text-center items-center">
            <h2 className="text-4xl font-playfair text-[#FAF8F5]">Platform Features</h2>
            <p className="text-[#888888] font-manrope">Everything you need to go from beginner to highly-paid Solana developer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="w-8 h-8 text-[#C9A962] mb-2" />}
              title="Learn Best Practices"
              desc="Interactive lessons and video tutorials designed by senior Solana engineers to teach you production-ready code."
            />
            <FeatureCard
              icon={<PlayCircle className="w-8 h-8 text-[#C9A962] mb-2" />}
              title="Interactive Environment"
              desc="Write, test, and deploy Rust smart contracts directly in your browser with our built-in IDE capabilities."
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8 text-[#C9A962] mb-2" />}
              title="Earn On-Chain XP"
              desc="Receive soulbound SPL tokens and Metaplex Core credential NFTs upon course completion to build your reliable CV."
            />
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="py-24 px-12 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-playfair text-[#FAF8F5]">Featured Courses</h2>
              <p className="text-[#888888] font-manrope">Start your journey into web3 with our most popular programs.</p>
            </div>
            <Link href="/catalog" className="text-[#C9A962] font-manrope font-medium hover:underline mb-2">View All Courses →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PreviewCard
              title="Rust for Solana"
              level="INTERMEDIATE"
              color="#4ADE80"
              desc="Deep dive into Rust programming specifically for writing Solana smart contracts."
              icon={<Code className="w-16 h-16 text-[#C9A962]/40 group-hover:-translate-y-2 group-hover:scale-110 transition duration-500" />}
            />
            <PreviewCard
              title="Intro to Solana"
              level="BEGINNER"
              color="#C9A962"
              desc="Fundamentals of Solana architecture, accounts, and the programming model."
              icon={<LayoutGrid className="w-16 h-16 text-[#C9A962]/40 group-hover:-translate-y-2 group-hover:scale-110 transition duration-500" />}
            />
            <PreviewCard
              title="Anchor Security"
              level="ADVANCED"
              color="#F87171"
              desc="Identify vulnerabilities and master security patterns in Anchor programs."
              icon={<Shield className="w-16 h-16 text-[#C9A962]/40 group-hover:-translate-y-2 group-hover:scale-110 transition duration-500" />}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[#0F0F0F] border border-[#1F1F1F] p-8 rounded-lg flex flex-col gap-4 hover:border-[#C9A962]/30 transition group cursor-default">
      <div className="transform group-hover:scale-110 group-hover:-translate-y-1 transition duration-300 w-fit">{icon}</div>
      <h3 className="text-xl font-playfair text-[#FAF8F5]">{title}</h3>
      <p className="text-[#888888] font-manrope text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function PreviewCard({ title, level, color, desc, icon }: { title: string, level: string, color: string, desc: string, icon: React.ReactNode }) {
  return (
    <Link href="/catalog" className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-lg overflow-hidden flex flex-col group cursor-pointer hover:border-[#C9A962]/50 transition">
      <div className="h-48 bg-[#1E1E1E] flex items-center justify-center border-b border-[#1F1F1F] relative overflow-hidden">
        {icon}
      </div>
      <div className="p-6 flex flex-col gap-4">
        <span className="text-[10px] font-bold tracking-wider px-2.5 py-1.5 rounded w-fit" style={{ color: color, backgroundColor: `${color}15` }}>
          {level}
        </span>
        <h3 className="text-xl font-playfair text-[#FAF8F5] group-hover:text-primary transition">{title}</h3>
        <p className="text-[#888888] text-sm font-manrope leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}

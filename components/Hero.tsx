import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Hero() {
  const { connected } = useWallet();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0.3, 1 - scrollY / 400);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background - clean grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 241, 149, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 241, 149, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: opacity * 0.03,
        }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#14F195]/10 border border-[#14F195]/20 mb-6">
          <span className="w-1.5 h-1.5 bg-[#14F195] rounded-full animate-pulse" />
          <span className="text-xs font-medium text-[#14F195] tracking-wide uppercase">
            Superteam Academy
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Learn to build on
          <span className="text-[#14F195]"> Solana</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
          Complete courses, earn XP, and collect verifiable on-chain credentials. 
          From fundamentals to advanced patterns.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mb-10">
          {[
            { value: '12+', label: 'Courses' },
            { value: '2.5K+', label: 'Learners' },
            { value: '50K+', label: 'XP Earned' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#courses"
            className="px-8 py-3 bg-[#14F195] text-[#0a0e1a] font-semibold hover:bg-[#0ed184] transition-colors"
          >
            Browse Courses
          </a>
          
          {!connected && (
            <WalletMultiButton className="!bg-transparent !text-white !border !border-white/20 !rounded-none !px-8 !py-3 hover:!bg-white/5" />
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/40 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

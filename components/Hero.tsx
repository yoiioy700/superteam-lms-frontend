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

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-20 pb-16 bg-slate-950">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20, 241, 149, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
            Superteam Academy
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Learn to build
          <span className="text-emerald-400"> on Solana</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Complete courses, earn XP, and collect verifiable on-chain credentials. 
          From fundamentals to advanced patterns.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#courses"
            className="px-8 py-3.5 bg-emerald-400 text-slate-950 font-semibold rounded-lg hover:bg-emerald-300 transition-colors"
          >
            Browse Courses
          </a>
          
          {!connected && (
            <WalletMultiButton className="!bg-slate-800 !text-white !border !border-slate-700 !rounded-lg !px-8 !py-3.5 hover:!bg-slate-700" />
          )}
        </div>
      </div>
    </section>
  );
}

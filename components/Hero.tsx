import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { connected } = useWallet();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0e1a]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#14F195]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-700 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
          <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
          <span className="text-xs text-white/50">Learning tracks for developers, creators &amp; community builders</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Learn to build on
          <br />
          <span className="text-[#14F195]">Solana</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-white/50 mb-8 max-w-xl mx-auto">
          Complete courses, earn XP, and collect verifiable on-chain credentials. 
          From fundamentals to advanced patterns.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a 
            href="#courses"
            className="px-6 py-3 bg-[#14F195] text-[#0a0e1a] rounded-lg font-medium hover:bg-[#0ed184] transition-colors"
          >
            Browse Courses
          </a>
          
          {!connected && (
            <div className="flex items-center gap-2 px-6 py-3 border border-white/[0.1] rounded-lg text-white/60 hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              <span className="text-sm">Connect Wallet</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

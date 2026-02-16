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
    <section className="relative min-h-screen flex flex-col justify-between px-6 pt-24 pb-8 overflow-hidden bg-black">
      {/* Marquee top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-b border-white/20 py-2 bg-black z-10">
        <div className="animate-marquee whitespace-nowrap flex gap-8">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-xs font-bold tracking-widest text-white/60 uppercase">
              LEARN TO BUILD • EARN XP • MINT CREDENTIALS •
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative max-w-5xl mx-auto flex-1 flex flex-col justify-center">
        {/* Glitch text effect */}
        <div className="mb-8">
          <p className="text-sm font-bold tracking-[0.3em] text-white/40 uppercase mb-6">
            // SUPERTEAM_ACADEMY v1.0
          </p>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4">
            LEARN<br />
            <span className="text-[#14F195]">SOLANA</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/50 max-w-md font-light tracking-wide">
            Complete courses. Earn XP. Collect on-chain credentials.
          </p>
        </div>

        {/* Stats - brutalist blocks */}
        <div className="flex flex-wrap gap-0 mb-10">
          {[
            { value: '12', label: 'COURSES', suffix: '+' },
            { value: '2.5K', label: 'LEARNERS', suffix: '' },
            { value: '50K', label: 'XP_EARNED', suffix: '' },
          ].map((stat, i) => (
            <div key={stat.label} className="border border-white/20 px-6 py-4 -ml-[1px] first:ml-0 bg-black">
              <div className="text-3xl font-black text-white">{stat.value}<span className="text-[#14F195]">{stat.suffix}</span></div>
              <div className="text-[10px] font-bold tracking-widest text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA - brutalist */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#courses"
            className="px-8 py-4 bg-[#14F195] text-black font-black text-sm tracking-widest hover:bg-white transition-colors border border-[#14F195] hover:border-white"
          >
            START_LEARNING →
          </a>
          
          {!connected && (
            <WalletMultiButton className="!bg-black !text-white !border !border-white/20 !rounded-none !px-8 !py-4 !font-bold !text-sm !tracking-widest hover:!bg-white/5" />
          )}
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/20 py-2 bg-black">
        <div className="animate-marquee-reverse whitespace-nowrap flex gap-8">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-xs font-bold tracking-widest text-white/40 uppercase">
              ANCHOR • TOKENS • DEFI • COMMUNITY • BUILD • SHIP •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

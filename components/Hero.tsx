import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Hero() {
  const { connected } = useWallet();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden bg-[#0a0a0f]">
      {/* Gradient orb following mouse */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
      />

      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <p className="text-sm tracking-[0.2em] text-violet-400/80 mb-6">
          SUPERTEAM ACADEMY
        </p>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight">
          Learn to build
          <span className="block font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
            on Solana
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-white/50 mb-10 max-w-lg mx-auto leading-relaxed font-light">
          Complete courses, earn XP, and collect verifiable on-chain credentials 
          crafted for the next generation of developers.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#courses"
            className="group relative px-8 py-4 bg-white text-[#0a0a0f] font-medium rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">Explore Courses</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          {!connected && (
            <WalletMultiButton className="!bg-transparent !text-white !border !border-white/20 !rounded-full !px-8 !py-4 hover:!bg-white/5 !transition-all" />
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-16">
          {[
            { value: '12+', label: 'Courses' },
            { value: '2.5K', label: 'Students' },
            { value: '50K', label: 'XP Earned' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-light text-white mb-1">{stat.value}</div>
              <div className="text-xs text-white/30 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

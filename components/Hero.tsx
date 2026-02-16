import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Hero() {
  const { connected } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center animate-pulse">
            <div className="space-y-6">
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-20 w-3/4 bg-white/10 rounded" />
              <div className="h-4 w-full bg-white/10 rounded" />
              <div className="h-12 w-40 bg-white/10 rounded-full" />
            </div>
            <div className="h-[400px] bg-white/5 rounded" />
          </div>
        </div>
      </section>
    );
  }

  const offsetX = typeof window !== 'undefined' ? (mousePosition.x - window.innerWidth / 2) * 0.02 : 0;
  const offsetY = typeof window !== 'undefined' ? (mousePosition.y - window.innerHeight / 2) * 0.02 : 0;

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden bg-[#0a0a0f]">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl transition-transform duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            transform: `translate(${offsetX}px, ${offsetY}px)`,
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl transition-transform duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
            transform: `translate(${-offsetX}px, ${-offsetY}px)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm tracking-[0.3em] text-violet-400/80 mb-6 font-light">
              SUPERTEAM ACADEMY
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight">
              Master
              <span className="block font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Solana
              </span>
              <span className="block">Development</span>
            </h1>

            <p className="text-lg text-white/40 mb-10 max-w-md leading-relaxed font-light">
              Complete courses, earn XP, and collect verifiable on-chain credentials 
              crafted for the next generation.
            </p>

            <div className="flex flex-wrap items-center gap-4">
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
            <div className="flex items-center gap-10 mt-16 pt-8 border-t border-white/10">
              {[
                { value: '12+', label: 'Courses' },
                { value: '2.5K', label: 'Students' },
                { value: '50K', label: 'XP Earned' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-light text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-white/30 tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual element */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                {/* Main cube */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-48 h-48 sm:w-64 sm:h-64 relative"
                    style={{
                      transform: `rotateX(55deg) rotateZ(-45deg) rotateY(10deg)`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 backdrop-blur-sm"
                      style={{ transform: 'translateZ(4rem)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20"
                      style={{ transform: 'translateZ(-4rem) rotateY(180deg)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400/25 to-fuchsia-400/25 border border-violet-500/30"
                      style={{ transform: 'rotateX(-90deg) translateZ(4rem)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20"
                      style={{ transform: 'rotateX(90deg) translateZ(4rem)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 border border-violet-500/25"
                      style={{ transform: 'rotateY(90deg) translateZ(4rem)' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 border border-violet-500/25"
                      style={{ transform: 'rotateY(-90deg) translateZ(4rem)' }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-xl" />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-10 -left-10 w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-violet-500/30 animate-pulse blur-sm" />
                <div className="absolute bottom-20 right-0 w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 animate-pulse blur-sm" 
                  style={{ animationDelay: '1s' }}
                />
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-xs text-white/30 tracking-wider">ON-CHAIN LEARNING</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

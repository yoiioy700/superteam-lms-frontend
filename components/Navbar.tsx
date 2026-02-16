import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { connected } = useWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled ? 'bg-black/95 border-white/20' : 'bg-black border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - brutalist */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 border-2 border-[#14F195] flex items-center justify-center group-hover:bg-[#14F195] transition-colors">
            <svg className="w-5 h-5 text-[#14F195] group-hover:text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="font-black text-white text-lg tracking-tight">SUPERTEAM</span>
            <span className="text-[10px] font-bold tracking-widest text-white/40 block -mt-1">ACADEMY</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-0">
          {['COURSES', 'PROFILE'].map((item) => (
            <Link 
              key={item}
              href={item === 'COURSES' ? '/' : '/profile'}
              className="px-6 py-5 text-xs font-bold tracking-widest text-white/60 hover:text-white border-l border-white/10 hover:bg-white/5 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Wallet */}
        <WalletMultiButton className="!bg-[#14F195] !text-black !rounded-none !px-6 !py-3 !text-xs !font-black !tracking-widest hover:!bg-white !transition-colors !border !border-[#14F195] hover:!border-white" />
      </nav>
    </header>
  );
}

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { connected, publicKey } = useWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#14F195] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0a0e1a]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-semibold text-white">Superteam Academy</span>
          </Link>

          {/* Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
              Courses
            </Link>
            <Link href="/profile" className="text-sm text-white/60 hover:text-white transition-colors">
              Profile
            </Link>
          </div>

          {/* Wallet */}
          <div className="flex items-center gap-3">
            {connected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14F195]/10 border border-[#14F195]/20">
                <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
                <span className="text-xs text-[#14F195] font-mono">
                  {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                </span>
              </div>
            )}
            
            <WalletMultiButton 
              className="!bg-[#14F195] !text-[#0a0e1a] !rounded-lg !px-4 !py-2 !text-sm !font-medium !border-0 hover:!bg-[#0ed184] !transition-colors"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Hero() {
  const { connected } = useWallet();

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 text-sm">Learn &amp; Earn on Solana</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
          Master{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            Solana
          </span>
          <br /  >
          Development
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Learn blockchain development with hands-on courses. 
          Earn XP, build streaks, and collect verifiable credentials on-chain.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#courses" 
            className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-semibold transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1"
          >
            Explore Courses
          </a>
          
          {!connected && (
            <div className="flex items-center gap-3">
              <span className="text-slate-500">or</span>
              <WalletMultiButton className="!bg-slate-800 !border !border-slate-700 hover:!bg-slate-700 !rounded-xl !py-4 !px-6 !text-white !font-semibold !transition-all" />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '4', label: 'Learning Tracks' },
            { value: '10k+', label: 'Lessons Completed' },
            { value: '$4.8k', label: 'Prize Pool' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

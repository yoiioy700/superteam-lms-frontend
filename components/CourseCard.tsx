import Link from 'next/link';
import { useState } from 'react';

interface CourseCardProps {
  course: {
    publicKey: string;
    account: {
      title: string;
      description: string;
      track: number;
      difficulty: number;
      xpReward: number;
      lessonCount: number;
      isPublished: boolean;
    };
  };
  isEnrolled?: boolean;
  progress?: number;
}

const TRACK_NAMES = ['General', 'Developer', 'Community', 'Creative'];
const DIFFICULTY_NAMES = ['Beginner', 'Intermediate', 'Advanced'];

export default function CourseCard({ course, isEnrolled, progress = 0 }: CourseCardProps) {
  const { title, description, track, difficulty, xpReward, lessonCount, isPublished } = course.account;
  const [isHovered, setIsHovered] = useState(false);
  
  if (!isPublished) return null;

  const displayProgress = isEnrolled ? progress : 0;

  return (
    <Link href={`/course/${course.publicKey}`}>
      <div 
        className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02] w-full max-w-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Noise filter SVG */}
        <svg style={{ display: 'none' }}>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
          </filter>
        </svg>

        {/* Noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-20"
          style={{ filter: 'url(#noiseFilter)' }}
        />

        {/* Gradient border container */}
        <div 
          className="bg-gradient-to-br from-[#14F195] to-[#9945FF] p-[2px] shadow-2xl transition-shadow duration-300"
          style={{ 
            borderRadius: '18px 26px 14px 22px / 22px 16px 26px 18px',
            boxShadow: isHovered ? '0 25px 50px -12px rgba(20, 241, 149, 0.25)' : '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Inner content */}
          <div 
            className="h-full w-full bg-slate-900/70 backdrop-blur-xl p-6 flex flex-col gap-5 relative"
            style={{ borderRadius: '16px 24px 12px 20px / 20px 14px 24px 16px' }}
          >
            {/* Header - Badges */}
            <div className="flex justify-between items-center">
              {/* Difficulty Badge */}
              <div 
                className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 border border-slate-600/50 text-slate-200 text-xs font-mono font-semibold"
                style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#14F195]">
                  <path d="M12 2C12 2 8 8 5 9C2 10 7 14 6 19C5 24 12 20 12 20C12 20 19 24 18 19C17 14 22 10 19 9C16 8 12 2 12 2Z"></path>
                </svg>
                {DIFFICULTY_NAMES[difficulty] || 'Beginner'}
              </div>

              {/* XP Badge */}
              <div 
                className="flex items-center gap-1 text-[#9945FF] font-bold text-xs bg-[#9945FF]/10 px-3 py-1.5 border border-[#9945FF]/30"
                style={{ borderRadius: '12px 24px 10px 22px / 20px 10px 24px 12px' }}
              >
                <span>+{xpReward} XP</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mt-2">
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {description || 'Learn Solana development with hands-on exercises and earn verifiable credentials on-chain.'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-xs text-slate-400 font-mono font-medium">
                <span>PROGRESS</span>
                <span>{displayProgress}%</span>
              </div>
              <div 
                className="h-2.5 w-full bg-slate-800 border border-slate-700/80 overflow-hidden shadow-inner"
                style={{ borderRadius: '8px 12px 6px 10px / 10px 8px 12px 6px' }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-[#14F195] to-[#9945FF] relative transition-all duration-500"
                  style={{ 
                    width: `${displayProgress}%`,
                    borderRadius: '6px 10px 4px 8px / 8px 6px 10px 4px'
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20" />
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">{TRACK_NAMES[track] || 'General'}</span>
              <span className="font-mono">{lessonCount} LESSONS</span>
            </div>

            {/* CTA Button */}
            <button 
              className="mt-4 w-full py-3.5 px-4 bg-slate-800/50 text-[#14F195] font-bold font-mono tracking-widest border-2 border-[#14F195]/40 transition-all duration-300 hover:bg-[#14F195]/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(20,241,149,0.3)] hover:border-[#14F195]"
              style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
            >
              {isEnrolled ? 'CONTINUE' : 'START LEARNING'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

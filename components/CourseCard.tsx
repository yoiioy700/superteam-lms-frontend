import Link from 'next/link';
import { useState, useEffect } from 'react';

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

const DIFFICULTY_NAMES = ['Beginner', 'Intermediate', 'Advanced'];

export default function CourseCard({ course, isEnrolled, progress = 45 }: CourseCardProps) {
  const { title, description, difficulty, xpReward, lessonCount, isPublished } = course.account;
  const [hoverRotation, setHoverRotation] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  if (!isPublished) return null;

  const displayProgress = isEnrolled ? progress : 0;

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => {
      setAnimatedProgress(displayProgress);
    }, 300);
    return () => clearTimeout(timer);
  }, [displayProgress]);

  const handleMouseEnter = () => {
    const randomRotation = (Math.random() - 0.5) * 0.8;
    setHoverRotation(randomRotation);
  };

  const handleMouseLeave = () => {
    setHoverRotation(0);
  };

  return (
    <Link href={`/course/${course.publicKey}`}>
      <div 
        className="relative max-w-[420px] w-full cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: hoverRotation 
            ? `translateY(-4px) scale(1.01) rotate(${hoverRotation}deg)` 
            : 'translateY(0) scale(1) rotate(0deg)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Main Card */}
        <div 
          className="relative overflow-hidden rounded-[18px] p-7 transition-all duration-400"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            boxShadow: hoverRotation 
              ? '0 12px 48px rgba(20, 241, 149, 0.15), 0 0 80px rgba(153, 69, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
              : '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Gradient Border */}
          <div 
            className="absolute inset-[-2px] rounded-[18px] p-[2px] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: hoverRotation ? 0.9 : 0.6,
              filter: hoverRotation ? 'blur(0px)' : 'blur(0.5px)'
            }}
          />

          {/* Noise Texture Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.03
            }}
          />

          {/* Floating Decorative Dots */}
          <span className="absolute w-1 h-1 rounded-full bg-[#14F195]/30 top-5 left-5 animate-float" />
          <span className="absolute w-1 h-1 rounded-full bg-[#14F195]/30 top-10 right-8 animate-float-slow" />
          <span className="absolute w-1 h-1 rounded-full bg-[#14F195]/30 bottom-16 left-8 animate-float-medium" />

          {/* Icon Container */}
          <div 
            className="w-[72px] h-[72px] mx-auto mb-5 relative"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <div 
              className="absolute inset-0 rounded-2xl border-[1.5px] border-[#14F195]/20"
              style={{ 
                background: 'linear-gradient(135deg, rgba(20, 241, 149, 0.1) 0%, rgba(153, 69, 255, 0.1) 100%)',
                transform: 'rotate(3deg)'
              }}
            />
            <div 
              className="relative w-full h-full flex items-center justify-center text-3xl"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(20, 241, 149, 0.3))' }}
            >
              {difficulty === 0 ? '🌱' : difficulty === 1 ? '🚀' : '⚡'}
            </div>
          </div>

          {/* Header - Badges */}
          <div 
            className="flex justify-between items-start mb-4 gap-3"
          >
            {/* Difficulty Badge */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide bg-[#14F195]/10 text-[#14F195] border border-[#14F195]/30 shadow-[0_2px_8px_rgba(20,241,149,0.1)]"
              style={{ transform: 'rotate(-1deg)' }}
            >
              <span className="text-[10px] opacity-70">◆</span>
              {DIFFICULTY_NAMES[difficulty] || 'Beginner'}
            </div>

            {/* XP Badge */}
            <div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#9945FF]/15 text-[#c495ff] border border-dashed border-[#9945FF]/40"
              style={{ transform: 'rotate(1deg)' }}
            >
              <span>⚡</span>
              {xpReward} XP
            </div>
          </div>

          {/* Title */}
          <h3 
            className="text-2xl font-bold text-white mb-3 tracking-tight leading-tight"
            style={{ transform: 'rotate(-0.3deg)' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/60 mb-6 leading-relaxed line-clamp-2">
            {description || 'Master blockchain development with hands-on exercises and earn verifiable credentials on-chain.'}
          </p>

          {/* Stats Row */}
          <div className="flex gap-4 mb-6 pt-4 border-t border-dashed border-white/[0.08]">
            <div className="flex-1 text-center">
              <div className="text-xl font-bold text-[#14F195] mb-0.5">{lessonCount}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wide">Lessons</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xl font-bold text-[#14F195] mb-0.5">~{lessonCount * 20}m</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wide">Duration</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xl font-bold text-[#14F195] mb-0.5">2.3k</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wide">Students</div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-5">
            <div className="flex justify-between mb-2 text-xs uppercase tracking-wide">
              <span className="text-white/50 font-medium">Progress</span>
              <span className="text-[#14F195] font-bold">{displayProgress}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-xl overflow-hidden relative border border-white/[0.08]">
              <div 
                className="h-full rounded-xl relative transition-all duration-600"
                style={{ 
                  width: `${animatedProgress}%`,
                  background: 'linear-gradient(90deg, #14F195 0%, #9945FF 100%)',
                  boxShadow: '0 0 12px rgba(20, 241, 149, 0.4)',
                  transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {/* Shimmer Effect */}
                <div 
                  className="absolute top-0 right-0 w-8 h-full animate-shimmer"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3))'
                  }}
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            className="group/btn w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:scale-[1.02] hover:rotate-0 active:translate-y-0 active:scale-[0.98]"
            style={{ 
              background: 'linear-gradient(135deg, #14F195 0%, #12d682 100%)',
              color: '#0a0e1a',
              boxShadow: '0 4px 20px rgba(20, 241, 149, 0.3)',
              transform: 'rotate(-0.5deg)'
            }}
          >
            {/* Button hover glow */}
            <div 
              className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/30 transition-all duration-600 group-hover/btn:w-[300px] group-hover/btn:h-[300px]"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isEnrolled ? 'Continue Learning' : 'Start Learning'}
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </span>
          </button>
        </div>
      </div>

    </Link>
  );
}

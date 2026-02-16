import { useState } from 'react';

interface Course {
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
}

const TRACK_NAMES = ['OTHER', 'DEV', 'COMMUNITY', 'CREATIVE'];
const DIFFICULTY_NAMES = ['BEG', 'INT', 'ADV'];

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  progress?: number;
}

export default function CourseCard({ course, isEnrolled, progress = 0 }: CourseCardProps) {
  const trackName = TRACK_NAMES[course.account.track] || 'OTHER';
  const difficultyName = DIFFICULTY_NAMES[course.account.difficulty] || 'BEG';

  const getDifficultyBorder = () => {
    switch (difficultyName) {
      case 'BEG': return 'border-emerald-500/40 hover:border-emerald-500';
      case 'INT': return 'border-amber-500/40 hover:border-amber-500';
      case 'ADV': return 'border-rose-500/40 hover:border-rose-500';
      default: return 'border-white/20 hover:border-white/40';
    }
  };

  return (
    <div className={`group relative bg-black border ${getDifficultyBorder()} transition-all duration-200 cursor-pointer hover:-translate-y-0.5`}>
      {/* Header strip */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
        <span className="text-[10px] font-bold tracking-widest text-[#14F195]">
          {trackName}
        </span>
        <span className={`text-[10px] font-bold tracking-widest ${
          difficultyName === 'BEG' ? 'text-emerald-400' :
          difficultyName === 'INT' ? 'text-amber-400' : 'text-rose-400'
        }`}>
          {difficultyName}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-black text-white mb-3 group-hover:text-[#14F195] transition-colors leading-tight">
          {course.account.title.toUpperCase()}
        </h3>

        {/* Description */}
        <p className="text-xs text-white/40 mb-5 line-clamp-2 leading-relaxed">
          {course.account.description}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="text-white/30 font-mono">
            {course.account.lessonCount} LESSONS
          </span>
          <span className="text-[#14F195] font-bold">
            +{course.account.xpReward} XP
          </span>
        </div>

        {/* Progress or CTA */}
        {isEnrolled ? (
          <div>
            <div className="flex justify-between text-[10px] text-white/40 mb-2 font-mono uppercase">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-[#14F195] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-[10px] font-bold tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
              VIEW_COURSE
            </span>
            <span className="text-[#14F195] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        )}
      </div>
    </div>
  );
}

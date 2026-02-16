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

const DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Advanced'];
const TRACK_ICONS = ['📚', '💻', '🤝', '🎨'];

export default function CourseCard({ course, isEnrolled, progress = 0 }: CourseCardProps) {
  const { title, description, track, difficulty, xpReward, lessonCount, isPublished } = course.account;
  const [isHovered, setIsHovered] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  if (!isPublished) return null;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(isEnrolled ? progress : 0), 300);
    return () => clearTimeout(timer);
  }, [isEnrolled, progress]);

  return (
    <Link href={`/course/${course.publicKey}`}>
      <div 
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card */}
        <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.04]">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#14F195]/10 flex items-center justify-center text-xl">
                {TRACK_ICONS[track] || '📚'}
              </div>
              <div>
                <span className="text-xs text-white/40 uppercase tracking-wide">
                  {['General', 'Developer', 'Community', 'Creative'][track] || 'General'}
                </span>
                <div className="text-xs text-white/30 mt-0.5">
                  {DIFFICULTY_LABELS[difficulty] || 'Beginner'}
                </div>
              </div>
            </div>

            <span className="text-xs text-[#14F195] font-medium">
              +{xpReward} XP
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#14F195] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/40 mb-4 line-clamp-2">
            {description || 'Learn Solana development fundamentals.'}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-white/30 mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {lessonCount} lessons
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ~{lessonCount * 20}min
            </span>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/30">Progress</span>
              <span className="text-white/60">{animatedProgress}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#14F195] rounded-full transition-all duration-500"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
          </div>

          {/* Status */}
          <div className="mt-4 pt-4 border-t border-white/[0.04]">
            {isEnrolled ? (
              <span className="text-sm text-[#14F195]">Continue Learning →</span>
            ) : (
              <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                View Course →
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

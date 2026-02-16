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
const DIFFICULTY_COLORS = [
  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'bg-red-500/10 text-red-400 border-red-500/20',
];

export default function CourseCard({ course, isEnrolled, progress = 0 }: CourseCardProps) {
  const { title, description, difficulty, xpReward, lessonCount, isPublished } = course.account;
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
        {/* Glow Effect */}
        <div 
          className={`absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
            isHovered ? 'opacity-30' : 'opacity-0'
          }`}
        />

        {/* Card */}
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]">
          {/* Top Section */}
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">
                {difficulty === 0 ? '🌱' : difficulty === 1 ? '🚀' : '⚡'}
              </span>
            </div>

            {/* Difficulty Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${DIFFICULTY_COLORS[difficulty]}`}>
              {DIFFICULTY_LABELS[difficulty]}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/40 mb-6 line-clamp-2 leading-relaxed">
            {description || 'Learn Solana development with hands-on exercises.'}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/30">Progress</span>
              <span className="text-violet-400 font-medium">{animatedProgress}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-700"
                style={{ width: `${animatedProgress}%` }}
              />
            </div>
          </div>

          {/* Footer Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-4 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {lessonCount} lessons
              </span>
            </div>

            {/* XP Badge */}
            <span className="flex items-center gap-1 text-xs font-medium text-fuchsia-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              +{xpReward} XP
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

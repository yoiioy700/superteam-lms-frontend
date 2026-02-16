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

const TRACK_NAMES = ['General', 'Developer', 'Community', 'Creative'];
const DIFFICULTY_NAMES = ['Beginner', 'Intermediate', 'Advanced'];

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  progress?: number;
}

export default function CourseCard({ course, isEnrolled, progress = 0 }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const trackName = TRACK_NAMES[course.account.track] || 'General';
  const difficultyName = DIFFICULTY_NAMES[course.account.difficulty] || 'Beginner';

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04] cursor-pointer"
    >
      {/* Gradient border effect on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />

      {/* Content */}
      <div className="relative p-6">
        {/* Track */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-violet-400/80 tracking-wider">
            {trackName}
          </span>
          <span className={`text-xs ${
            difficultyName === 'Beginner' ? 'text-emerald-400/80' :
            difficultyName === 'Intermediate' ? 'text-amber-400/80' : 'text-rose-400/80'
          }`}>
            {difficultyName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-medium text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-all duration-300">
          {course.account.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/40 mb-5 line-clamp-2 leading-relaxed">
          {course.account.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-white/30 mb-5">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {course.account.lessonCount} lessons
          </span>
          <span className="text-violet-400/80">
            +{course.account.xpReward} XP
          </span>
        </div>

        {/* Progress or CTA */}
        {isEnrolled ? (
          <div>
            <div className="flex justify-between text-xs text-white/30 mb-2">
              <span>Progress</span>
              <span className="text-white/60">{progress}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center text-sm text-white/40 group-hover:text-white/60 transition-colors">
            <span>View Course</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

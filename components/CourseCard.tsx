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

const TRACK_NAMES = ['Other', 'Developer', 'Community', 'Creative'];
const TRACK_COLORS = ['gray', 'emerald', 'blue', 'purple'];
const DIFFICULTY_NAMES = ['Beginner', 'Intermediate', 'Advanced'];

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  progress?: number;
}

export default function CourseCard({ course, isEnrolled, progress = 0 }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const trackName = TRACK_NAMES[course.account.track] || 'Other';
  const difficultyName = DIFFICULTY_NAMES[course.account.difficulty] || 'Beginner';
  const trackColor = TRACK_COLORS[course.account.track] || 'gray';

  const getTrackBorder = () => {
    switch (trackColor) {
      case 'emerald': return 'border-emerald-500/30 hover:border-emerald-500/50';
      case 'blue': return 'border-blue-500/30 hover:border-blue-500/50';
      case 'purple': return 'border-purple-500/30 hover:border-purple-500/50';
      default: return 'border-white/10 hover:border-white/20';
    }
  };

  const getTrackBg = () => {
    switch (trackColor) {
      case 'emerald': return 'bg-emerald-500/10 text-emerald-400';
      case 'blue': return 'bg-blue-500/10 text-blue-400';
      case 'purple': return 'bg-purple-500/10 text-purple-400';
      default: return 'bg-white/5 text-white/60';
    }
  };

  const getDifficultyColor = () => {
    switch (difficultyName) {
      case 'Beginner': return 'text-emerald-400';
      case 'Intermediate': return 'text-amber-400';
      case 'Advanced': return 'text-rose-400';
      default: return 'text-white/40';
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-[#0d1321] border ${getTrackBorder()} transition-all duration-200 cursor-pointer`}
    >
      {/* Content */}
      <div className="p-6">
        {/* Track & Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <div className={`px-2.5 py-1 text-xs font-medium ${getTrackBg()}`}>
            {trackName}
          </div>
          <span className={`text-xs font-medium ${getDifficultyColor()}`}>
            {difficultyName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#14F195] transition-colors">
          {course.account.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 mb-4 line-clamp-2">
          {course.account.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {course.account.lessonCount} lessons
          </span>
          <span className="text-[#14F195] font-medium">
            +{course.account.xpReward} XP
          </span>
        </div>

        {/* Progress or CTA */}
        {isEnrolled ? (
          <div>
            <div className="flex justify-between text-xs text-white/40 mb-1.5">
              <span>Progress</span>
              <span className="text-white">{progress}%</span>
            </div>
            <div className="h-1.5 bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-[#14F195] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center text-sm text-white/60 group-hover:text-[#14F195] transition-colors">
            <span>View Course</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

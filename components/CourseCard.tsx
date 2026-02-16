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
  const trackName = TRACK_NAMES[course.account.track] || 'General';
  const difficultyName = DIFFICULTY_NAMES[course.account.difficulty] || 'Beginner';

  const getDifficultyColor = () => {
    switch (difficultyName) {
      case 'Beginner': return 'text-emerald-400';
      case 'Intermediate': return 'text-amber-400';
      case 'Advanced': return 'text-rose-400';
      default: return 'text-slate-400';
    }
  };

  const getTrackColor = () => {
    switch (trackName) {
      case 'Developer': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Community': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Creative': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="group bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer overflow-hidden">
      {/* Content */}
      <div className="p-6">
        {/* Track & Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTrackColor()}`}>
            {trackName}
          </span>
          <span className={`text-xs font-medium ${getDifficultyColor()}`}>
            {difficultyName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {course.account.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {course.account.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {course.account.lessonCount} lessons
          </span>
          <span className="text-emerald-400 font-medium">
            +{course.account.xpReward} XP
          </span>
        </div>

        {/* Progress or CTA */}
        {isEnrolled ? (
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Progress</span>
              <span className="text-white">{progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center text-sm text-slate-400 group-hover:text-emerald-400 transition-colors">
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

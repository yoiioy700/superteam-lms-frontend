import Link from 'next/link';

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
const DIFFICULTY_COLORS = [
  'bg-green-500/20 text-green-400',
  'bg-yellow-500/20 text-yellow-400',
  'bg-red-500/20 text-red-400'
];
const DIFFICULTY_NAMES = ['Beginner', 'Intermediate', 'Advanced'];

export default function CourseCard({ course, isEnrolled, progress = 0 }: CourseCardProps) {
  const { title, description, track, difficulty, xpReward, lessonCount, isPublished } = course.account;
  
  if (!isPublished) return null;

  return (
    <Link href={`/course/${course.publicKey}`}>
      <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-400/10">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-purple-500/20 to-emerald-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative p-6">
          {/* Track badge */}
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-300">
              {TRACK_NAMES[track] || 'General'}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS[0]}`}>
              {DIFFICULTY_NAMES[difficulty] || 'Beginner'}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="mb-2 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <p className="mb-4 text-sm text-slate-400 line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{lessonCount} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">+{xpReward} XP</span>
            </div>
          </div>

          {/* Enrolled progress */}
          {isEnrolled && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-300 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-4">
            <button className="w-full rounded-xl bg-emerald-500/10 border border-emerald-500/30 py-3 text-emerald-400 font-medium transition-all hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/25">
              {isEnrolled ? 'Continue Learning' : 'Start Learning'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { QuizModal, Toast } from '../../components';
import { motion } from 'framer-motion';

const COURSES: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Anchor Framework Fundamentals',
    description: 'Learn to build Solana programs with Anchor. From basics to advanced patterns including testing and deployment.',
    track: 'Developer',
    difficulty: 'Beginner',
    xpReward: 500,
    lessonCount: 12,
    duration: '~4 hours',
    lessons: [
      { id: 1, title: 'Introduction to Anchor', duration: '15 min', completed: true },
      { id: 2, title: 'Setting Up Environment', duration: '20 min', completed: true },
      { id: 3, title: 'Your First Program', duration: '25 min', completed: false },
      { id: 4, title: 'Accounts and Data', duration: '30 min', completed: false },
      { id: 5, title: 'Instructions', duration: '25 min', completed: false },
      { id: 6, title: 'Errors and Validation', duration: '20 min', completed: false },
      { id: 7, title: 'Testing with Mocha', duration: '35 min', completed: false },
      { id: 8, title: 'Deployment', duration: '20 min', completed: false },
      { id: 9, title: 'Frontend Integration', duration: '40 min', completed: false },
      { id: 10, title: 'Best Practices', duration: '30 min', completed: false },
      { id: 11, title: 'Security Patterns', duration: '35 min', completed: false },
      { id: 12, title: 'Final Project', duration: '45 min', completed: false },
    ],
  },
  '2': {
    id: '2',
    title: 'Web3 Community Building',
    description: 'Build and grow engaged communities. Learn governance, incentives, and sustainable growth strategies.',
    track: 'Community',
    difficulty: 'Intermediate',
    xpReward: 400,
    lessonCount: 8,
    duration: '~3 hours',
    lessons: [
      { id: 1, title: 'Community Foundations', duration: '20 min', completed: true },
      { id: 2, title: 'Engagement Strategies', duration: '25 min', completed: false },
      { id: 3, title: 'Governance Models', duration: '30 min', completed: false },
      { id: 4, title: 'Incentive Design', duration: '25 min', completed: false },
      { id: 5, title: 'Content Strategy', duration: '20 min', completed: false },
      { id: 6, title: 'Moderation Tools', duration: '15 min', completed: false },
      { id: 7, title: 'Analytics', duration: '20 min', completed: false },
      { id: 8, title: 'Growth Tactics', duration: '25 min', completed: false },
    ],
  },
};

// DEMO MODE: No wallet required!
const DEMO_MODE = true;

export default function CourseDetail() {
  const router = useRouter();
  const { courseId } = router.query;
  const { connected } = useWallet();
  const [isEnrolled, setIsEnrolled] = useState(courseId === '1' || courseId === '2' || DEMO_MODE);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState('');
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' as const });
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1, 2]); // Demo: first 2 lessons completed

  const course = COURSES[courseId as string] || COURSES['1'];
  const completedLessons = completedLessonIds.length;
  const progress = Math.round((completedLessons / course.lessons.length) * 100);

  const handleEnroll = () => {
    setIsEnrolled(true);
    showToast('Successfully enrolled! (Demo Mode)', 'success');
  };

  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const startQuiz = (lessonTitle: string, lessonId: number) => {
    setSelectedLesson(lessonTitle);
    setActiveLessonId(lessonId);
    setShowQuiz(true);
  };

  const completeQuiz = (score: number, lessonId: number) => {
    setShowQuiz(false);
    if (score >= 70) {
      // Mark lesson as completed in demo mode
      if (!completedLessonIds.includes(lessonId)) {
        setCompletedLessonIds([...completedLessonIds, lessonId]);
      }
      showToast(`🎉 Quiz completed! ${score}% score - +50 XP earned!`, 'success');
    } else {
      showToast(`Quiz completed: ${score}%. Need 70%+ to pass. Try again!`, 'info');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const getDifficultyColor = () => {
    switch (course.difficulty) {
      case 'Beginner': return 'text-emerald-400';
      case 'Intermediate': return 'text-amber-400';
      case 'Advanced': return 'text-rose-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <>
      <Head>
        <title>{course.title} | Superteam Academy</title>
      </Head>

      <div className="min-h-screen bg-slate-950">
        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border-b border-violet-500/30 px-6 py-2">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-violet-300">
              🔓 <span className="font-semibold">Demo Mode</span> — No wallet required. Try the quiz to test your knowledge!
            </p>
          </div>
        </div>

        {/* Header */}
        <header className="px-6 border-b border-slate-800">
          <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-emerald-400 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-bold text-white text-lg">Superteam Academy</span>
            </Link>
            <WalletMultiButton className="!bg-emerald-400 !text-slate-950 !rounded-lg !px-5 !py-2.5 !text-sm !font-semibold hover:!bg-emerald-300" />
          </div>
        </header>

        {/* Course Hero */}
        <div className="px-6 py-8 lg:py-10 border-b border-slate-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-white">{course.title}</span>
            </div>

            <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-8 xl:gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {course.track}
                  </span>
                  <span className={`text-xs font-medium ${getDifficultyColor()}`}>
                    {course.difficulty}
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-base lg:text-lg text-slate-400 mb-6 max-w-2xl">{course.description}</p>

                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {course.lessonCount} lessons
                  </span>
                  <span className="text-emerald-400 font-medium">+{course.xpReward} XP</span>
                </div>
              </div>

              {/* Enroll Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900 rounded-xl border border-slate-800 p-6"
              >
                {isEnrolled ? (
                  <>
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Enrolled</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{completedLessons} of {course.lessons.length} lessons completed</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="text-white">{progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    <button className="w-full mt-6 py-3 bg-emerald-400 text-slate-950 font-semibold rounded-lg hover:bg-emerald-300 transition-colors">
                      Continue Learning
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white mb-2">Start Learning</h3>
                    <p className="text-sm text-slate-400 mb-6">Get full access to all lessons and earn {course.xpReward} XP.</p>
                    <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnroll}
                    className="w-full py-3 bg-emerald-400 text-slate-950 font-semibold rounded-lg hover:bg-emerald-300 transition-colors"
                  >
                    Enroll Now (Demo)
                  </motion.button>
                  <p className="text-xs text-violet-400 text-center mt-2">🔓 Demo Mode: No wallet required</p>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="px-6 lg:px-12 py-6 lg:py-8">
          <div className="max-w-6xl xl:max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
            <div className="space-y-3">
              {course.lessons.map((lesson: any, index: number) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/5 border-emerald-500/20' 
                        : isEnrolled 
                          ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-900/50 border-slate-800/50 opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                          isCompleted
                            ? 'bg-emerald-400 text-slate-950' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isCompleted ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div>
                          <h3 className={`font-medium ${isCompleted ? 'text-white' : 'text-slate-300'}`}>
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-slate-500">{lesson.duration}</p>
                        </div>
                      </div>

                      {isEnrolled && !isCompleted && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => startQuiz(lesson.title, lesson.id)}
                          className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Take Quiz
                        </motion.button>
                      )}

                      {isCompleted && (
                        <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Completed
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-800 px-6 lg:px-12 py-8 mt-8">
          <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-white">Superteam Academy</span>
            </div>
            <p className="text-sm text-slate-500">© 2026 Superteam Brazil. Built for Bounty #4.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">GitHub</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Discord</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        onComplete={(score) => completeQuiz(score, activeLessonId || 0)}
        lessonTitle={selectedLesson}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}

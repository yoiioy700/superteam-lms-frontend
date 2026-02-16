import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  lessonTitle: string;
}

const QUESTIONS = [
  {
    id: 1,
    question: "What is the primary purpose of Solana's Proof of History?",
    options: [
      "To reduce transaction fees",
      "To improve network consensus efficiency",
      "To enable smart contracts",
      "To create NFTs"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which programming language is Anchor built on top of?",
    options: [
      "JavaScript",
      "Rust",
      "Python",
      "C++"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "What is a 'wallet' in blockchain terms?",
    options: [
      "A physical device",
      "A software that stores private keys",
      "A bank account",
      "A cryptocurrency exchange"
    ],
    correct: 1
  }
];

export default function QuizModal({ isOpen, onClose, onComplete, lessonTitle }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleComplete = () => {
    onComplete(score + (selectedAnswer === QUESTIONS[currentQuestion].correct ? 1 : 0));
    // Reset
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-lg w-full p-6 shadow-2xl">
              {!showResult ? (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-violet-400 tracking-wider">
                        QUESTION {currentQuestion + 1} / {QUESTIONS.length}
                      </span>
                      <button 
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {lessonTitle}
                    </h3>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 bg-slate-800 rounded-full mb-6 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <h4 className="text-white text-lg mb-4 font-medium">
                      {QUESTIONS[currentQuestion].question}
                    </h4>

                    <div className="space-y-3">
                      {QUESTIONS[currentQuestion].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(index)}
                          className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                            selectedAnswer === index
                              ? 'bg-violet-500/10 border-violet-500/50 text-white'
                              : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selectedAnswer === index
                                ? 'border-violet-400 bg-violet-400'
                                : 'border-slate-600'
                            }`}>
                              {selectedAnswer === index && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestion === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
                  </button>
                </>
              ) : (
                <>
                  {/* Results */}
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center"
                    >
                      <span className="text-3xl font-bold text-white">
                        {Math.round((score / QUESTIONS.length) * 100)}%
                      </span>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      Quiz Complete!
                    </h3>
                    <p className="text-slate-400 mb-6">
                      You scored {score} out of {QUESTIONS.length} questions correctly
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={handleComplete}
                        className="flex-1 py-3 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

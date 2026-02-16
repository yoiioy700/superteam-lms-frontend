import { motion, AnimatePresence } from 'framer-motion';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  xpEarned: number;
}

export default function CertificateModal({ isOpen, onClose, courseTitle, xpEarned }: CertificateModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-violet-500/30 p-8 max-w-md w-full shadow-2xl overflow-hidden relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10" />
              <div className="relative">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </motion.div>

                <h2 className="text-2xl font-bold text-white text-center mb-2">
                  🎉 Course Completed!
                </h2>

                <p className="text-slate-400 text-center mb-6">
                  Congratulations on completing <span className="text-violet-400 font-semibold">{courseTitle}</span>!
                </p>

                <div className="bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-700">
                  <div className="text-center mb-4">
                    <p className="text-sm text-slate-400 mb-1">Total XP Earned</p>
                    <p className="text-3xl font-bold text-emerald-400">+{xpEarned} XP</p>
                  </div>

                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-sm text-slate-400 mb-2">Credential NFT</p>
                    <div className="flex items-center justify-center gap-2 text-violet-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v.5a.5.5 0 01-1 0V6a1 1 0 10-2 0v.5a.5.5 0 01-1 0V6a1 1 0 10-2 0v.5a.5.5 0 01-1 0V6a1 1 0 10-2 0v.5a.5.5 0 01-1 0V6a1 1 0 10-2 0v.5a.5.5 0 01-1 0V6a1 1 0 10-2 0v.5a.5.5 0 01-1 0V6a1 1 0 100-2v-.5a.5.5 0 011 0v.5z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">On-Chain Certificate</span>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-2">
                      Minted to wallet on course completion
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 bg-white text-slate-950 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

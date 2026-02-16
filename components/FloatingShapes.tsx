import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Single large subtle gradient orb */}
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-br from-violet-500/8 to-fuchsia-500/8 blur-3xl"
        style={{ top: '15%', right: '15%' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Secondary subtle orb */}
      <motion.div
        className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 blur-3xl"
        style={{ bottom: '30%', left: '10%' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Single rotating ring - very subtle */}
      <motion.div
        className="absolute w-[120px] h-[120px] rounded-full border border-violet-500/8"
        style={{ top: '40%', right: '25%' }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* One small floating dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/20"
        style={{
          top: '25%',
          left: '20%',
        }}
        animate={{
          y: [0, -60, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

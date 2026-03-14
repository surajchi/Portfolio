import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Animated rings */}
      <div className="relative flex items-center justify-center mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: "var(--accent)" }}
            initial={{ width: 40 + i * 30, height: 40 + i * 30, opacity: 0 }}
            animate={{
              width: [40 + i * 30, 60 + i * 30, 40 + i * 30],
              height: [40 + i * 30, 60 + i * 30, 40 + i * 30],
              opacity: [0.8 - i * 0.2, 0.2, 0.8 - i * 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: "var(--accent)",
            borderRightColor: "var(--accent)",
          }}
        />
      </div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <p
          className="font-mono-custom text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          Portfolio
        </p>
        <motion.h1
          className="font-display text-3xl font-bold"
          style={{ color: "var(--accent)" }}
          animate={{
            textShadow: [
              "0 0 20px rgba(232,98,26,0.4)",
              "0 0 60px rgba(232,98,26,0.8)",
              "0 0 20px rgba(232,98,26,0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Suraj.dev
        </motion.h1>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ background: "var(--border)" }}
      >
        <motion.div
          className="h-full"
          style={{ background: "var(--accent)" }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

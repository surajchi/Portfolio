import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="relative w-14 h-7 rounded-full p-0.5 flex items-center transition-all duration-500"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e, #16213e)"
          : "linear-gradient(135deg, #fde68a, #fbbf24)",
        border: "1px solid var(--border-strong)",
        boxShadow: isDark
          ? "inset 0 1px 3px rgba(0,0,0,0.5), 0 0 12px rgba(99,102,241,0.2)"
          : "inset 0 1px 3px rgba(0,0,0,0.1), 0 0 12px rgba(251,191,36,0.4)",
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: isDark ? "#e8e8ff" : "#fff",
          boxShadow: isDark
            ? "0 2px 8px rgba(0,0,0,0.6)"
            : "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -30, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 30, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={12} style={{ color: "#4338ca" }} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 30, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -30, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={12} style={{ color: "#d97706" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useMemo } from "react";
import { Download, ArrowDown } from "lucide-react";
import {
  FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJsSquare,
} from "react-icons/fa";
import {
  SiMongodb, SiPostgresql, SiTailwindcss, SiExpress,
} from "react-icons/si";

const techStack = [
  { Icon: FaReact,      color: "#61dafb" },
  { Icon: FaNodeJs,     color: "#68a063" },
  { Icon: FaPython,     color: "#ffd43b" },
  { Icon: FaHtml5,      color: "#e34f26" },
  { Icon: FaCss3Alt,    color: "#1572b6" },
  { Icon: FaJsSquare,   color: "#f7df1e" },
  { Icon: SiMongodb,    color: "#4db33d" },
  { Icon: SiPostgresql, color: "#336791" },
  { Icon: SiTailwindcss,color: "#38bdf8" },
  { Icon: SiExpress,    color: "#aaa"    },
];

export default function Hero() {
  // Fixed positions so icons never cause re-renders
  const positions = useMemo(() =>
    techStack.map((_, i) => ({
      top:      `${20 + (i * 37) % 55}%`,
      left:     `${5  + (i * 83) % 85}%`,
      duration: 5 + (i % 4),
      delay:    i * 0.35,
    })), []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Static gradient blobs — NO scroll listeners */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div style={{
          position: "absolute", top: "20%", left: "20%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", right: "15%",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      {/* Floating tech icons — CSS keyframe animation, NOT scroll-driven */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        {techStack.map(({ Icon, color }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: positions[i].top, left: positions[i].left }}
            animate={{ y: [0, -18, 0] }}
            transition={{
              duration: positions[i].duration,
              delay:    positions[i].delay,
              repeat:   Infinity,
              ease:     "easeInOut",
            }}
          >
            <Icon size={42} style={{ color, opacity: 0.18 }} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-3xl w-full"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
          <div className="px-4 py-1.5 rounded-full text-xs font-mono-custom font-bold tracking-widest uppercase"
            style={{
              background: "var(--bg-card)", border: "1px solid var(--border-strong)",
              color: "var(--accent)", backdropFilter: "blur(20px)",
            }}>
            <span className="inline-block w-2 h-2 rounded-full mr-2 animate-pulse"
              style={{ background: "var(--accent)" }} />
            Available for work
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 variants={item} className="font-display font-bold tracking-tight"
          style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 1.05, color: "var(--text-primary)" }}>
          Hi, I'm{" "}
          <span className="relative inline-block" style={{ color: "var(--accent)" }}>
            Suraj
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 rounded"
              style={{ background: "var(--accent)" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
            />
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.h2 variants={item}
          className="mt-6 text-xl md:text-2xl font-medium font-mono-custom"
          style={{ color: "var(--text-secondary)" }}>
          <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
          <Typewriter
            words={["Full-Stack Developer","React Developer","Node.js Engineer","MERN Stack Developer"]}
            loop cursor cursorStyle="_"
            typeSpeed={65} deleteSpeed={40} delaySpeed={1800}
          />
        </motion.h2>

        {/* Description */}
        <motion.p variants={item}
          className="mt-6 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)" }}>
          I build modern, scalable and immersive web applications.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/resume.pdf" download
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="btn-primary inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm text-white">
            <Download size={16} /> Download Resume
          </motion.a>
          <motion.a href="#contact"
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="btn-outline inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}>
            Let's Talk
          </motion.a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div variants={item} className="mt-16 flex flex-col items-center gap-2"
          style={{ color: "var(--text-muted)" }}>
          <span className="text-xs font-mono-custom tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

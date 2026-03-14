import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "../Components/SectionWrapper";
import { Code2, Layers, Zap, Heart } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Clean Code", desc: "Writing readable, maintainable code that scales" },
  { icon: Layers, label: "Full Stack", desc: "Frontend to backend, end-to-end solutions" },
  { icon: Zap, label: "Performance", desc: "Fast, optimized applications users love" },
  { icon: Heart, label: "Passionate", desc: "Deeply passionate about great user experiences" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <SectionWrapper title="About Me">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <p
            className="text-base leading-[1.9] mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            I'm a passionate Full-Stack Developer who enjoys transforming complex
            ideas into elegant, scalable, and high-performance web applications.
            With a strong foundation in modern technologies like React, Node.js, and
            Python, I focus on building seamless digital experiences that are not
            only functional but also intuitive and visually engaging.
          </p>
          <p
            className="text-base leading-[1.9]"
            style={{ color: "var(--text-secondary)" }}
          >
            My journey into development started with curiosity — how things work behind the
            screen — and quickly evolved into a drive to create meaningful solutions
            that solve real-world problems. I believe great software is built at the
            intersection of logic, creativity, and user experience.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 mt-8">
            {[
              { value: "1+", label: "Year Experience" },
              { value: "5+", label: "Projects Built" },
              { value: "10+", label: "Technologies" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="font-display text-2xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Highlight cards */}
        <div className="grid grid-cols-2 gap-4">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card rounded-2xl p-5 cursor-default"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  boxShadow: "0 4px 16px var(--glow)",
                }}
              >
                <Icon size={17} color="#fff" />
              </div>
              <h4
                className="font-semibold text-sm mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {label}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

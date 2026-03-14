import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionWrapper from "../Components/SectionWrapper";
import { Download, FileText } from "lucide-react";

export default function Resume() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionWrapper title="Resume">
      <div ref={ref} className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card rounded-3xl p-10 text-center max-w-sm w-full relative overflow-hidden"
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }}
          />

          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              boxShadow: "0 8px 32px var(--glow)",
            }}
          >
            <FileText size={28} color="#fff" />
          </div>

          <h3
            className="font-display text-xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            My Resume
          </h3>

          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            Download my latest CV to explore my skills, projects & professional experience.
          </p>

          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white"
          >
            <Download size={15} />
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

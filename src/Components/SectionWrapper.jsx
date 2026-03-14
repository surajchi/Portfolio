import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function SectionWrapper({ title, children, id }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id={id} className="py-28 px-6 max-w-8xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mb-16"
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-strong)" }} />
          <span
            className="font-mono-custom text-xs tracking-[0.2em] uppercase font-bold"
            style={{ color: "var(--accent)" }}
          >
            {title}
          </span>
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-strong)" }} />
        </div>

        {/* Main heading */}
        <h2
          className="text-4xl md:text-5xl font-display font-bold text-center tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

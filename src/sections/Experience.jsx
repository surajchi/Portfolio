import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "../data/experience";
import SectionWrapper from "../Components/SectionWrapper";
import { MapPin, Calendar, Briefcase } from "lucide-react";

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper title="Professional Experience">
      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />

        {experience.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="relative pl-16 mb-10 last:mb-0"
          >
            {/* Timeline dot */}
            <motion.div
              className="timeline-dot absolute left-[18px] top-6 -translate-x-1/2"
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 400 }}
            />

            {/* Card */}
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-7"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3
                    className="font-display text-xl font-bold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {job.role}
                  </h3>
                  <p className="font-medium text-sm" style={{ color: "var(--accent)" }}>
                    {job.company}
                  </p>
                </div>

                {/* Status badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(232,98,26,0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(232,98,26,0.2)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
                  Current
                </div>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <MapPin size={12} />
                  {job.location}
                </div>
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Calendar size={12} />
                  Joined {job.joining}
                </div>
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Briefcase size={12} />
                  {job.duration}
                </div>
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {job.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

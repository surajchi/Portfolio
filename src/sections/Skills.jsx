import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "../data/skills";
import SectionWrapper from "../Components/SectionWrapper";

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper title="Technical Skills">
      <div ref={ref} className="space-y-14">
        {skills.map((group, gi) => (
          <div key={group.category}>
            {/* Category header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="flex items-center gap-4 mb-7 justify-center"
            >
             
              <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-strong)" }} />
          <hr />
          <span
            className="font-mono-custom text-xs tracking-[0.2em] uppercase font-bold"
            style={{ color: "var(--accent)" }}
          >
            {group.category}
          </span><hr />
          <div className="h-px flex-1 max-w-16" style={{ background: "var(--border-strong)" }} />
        </div>
            </motion.div>

            {/* Skill cards */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {group.items.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: gi * 0.1 + si * 0.07,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  className="group glass-card rounded-2xl p-5 cursor-pointer flex flex-col items-center gap-3 w-[110px]"
                  style={{
                    "--hover-shadow": "0 12px 32px var(--glow)",
                  }}
                >
                  {/* Icon glow bg */}
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Icon glow on hover */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)",
                      }}
                    />
                  </div>

                  <p
                    className="text-xs font-semibold text-center tracking-wide"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

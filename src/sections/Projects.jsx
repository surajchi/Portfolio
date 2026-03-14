import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "../data/projects";
import SectionWrapper from "../Components/SectionWrapper";
import ProjectModal from "../Components/ProjectModal";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper title="Projects">
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setSelectedProject(p)}
              className="group relative cursor-pointer h-full"
            >
              {/* Border glow on hover */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--glow-blue))",
                  filter: "blur(1px)",
                }}
              />

              {/* Card */}
              <div
                className="relative z-10 h-full rounded-2xl overflow-hidden"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "var(--shadow)",
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "var(--accent)" }}
                    >
                      <ArrowUpRight size={18} color="#fff" />
                    </div>
                  </div>
                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 text-[10px] font-mono-custom font-bold rounded-full uppercase tracking-wider"
                      style={{
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      Project
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-display font-semibold text-base mb-2 group-hover:text-accent transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {p.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((t) => (
                      <span key={t} className="skill-badge">{t}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                    <a
                      href={p.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-accent"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <ExternalLink size={12} /> Demo
                    </a>
                    <a
                      href={p.github}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-accent"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Github size={12} /> GitHub
                    </a>
                    <span
                      className="ml-auto text-xs font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      View details →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionWrapper>
  );
}

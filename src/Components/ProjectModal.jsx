import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { X, ExternalLink } from "lucide-react";

function ModalContent({ project, onClose }) {
  useEffect(() => {
    // Lock body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      // Backdrop
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={onClose}
    >
      <motion.div
        key="modal-card"
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{   scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "relative",
          width: "100%", maxWidth: "560px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 12, zIndex: 10,
            width: 32, height: 32, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          <X size={14} />
        </button>

        {/* Image */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, var(--bg-secondary) 0%, transparent 55%)",
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px 28px" }}>
          <h2 className="font-display" style={{
            fontSize: "1.4rem", fontWeight: 700, marginBottom: 10,
            color: "var(--text-primary)",
          }}>
            {project.title}
          </h2>

          <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 16, color: "var(--text-secondary)" }}>
            {project.details}
          </p>

          {/* Tech badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {project.tech.map((t) => (
              <span key={t} className="skill-badge">{t}</span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 20px", borderRadius: 10,
                background: "var(--text-primary)", color: "var(--bg-primary)",
                fontSize: 13, fontWeight: 600, textDecoration: "none",
              }}>
              <FaGithub size={14} /> GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 20px", borderRadius: 10,
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none",
                boxShadow: "0 4px 16px var(--glow)",
              }}>
              <ExternalLink size={14} /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectModal({ project, onClose }) {
  // Portal renders modal at document.body level — completely escapes
  // any parent stacking context (backdrop-filter, transform, etc.)
  return createPortal(
    <AnimatePresence>
      {project && <ModalContent key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}

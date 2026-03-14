import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";

function BlogModalContent({ post, onClose }) {
  useEffect(() => {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "relative",
          width: "100%", maxWidth: 640,
          borderRadius: 20,
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "28px 28px 32px", position: "relative" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)", cursor: "pointer",
            }}
          >
            <X size={14} />
          </button>

          <h2 className="font-display" style={{
            fontSize: "1.5rem", fontWeight: 700, marginBottom: 20,
            color: "var(--text-primary)", paddingRight: 40,
          }}>
            {post.title}
          </h2>

          <div style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)" }}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BlogModal({ post, onClose }) {
  return createPortal(
    <AnimatePresence>
      {post && <BlogModalContent key={post.id} post={post} onClose={onClose} />}
    </AnimatePresence>,
    document.body
  );
}

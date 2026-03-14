import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { blogPosts } from "../data/blog";
import SectionWrapper from "../Components/SectionWrapper";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

export default function BlogPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper title="Latest Articles">
      <div ref={ref} className="grid md:grid-cols-2 gap-6 mb-10">
        {blogPosts.slice(0, 2).map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card rounded-2xl p-7 h-full cursor-pointer group"
            >
              {/* Tag */}
              <div className="mb-4">
                <span className="skill-badge">Article</span>
              </div>

              <h3
                className="font-display text-lg font-bold mb-3 group-hover:text-accent transition-colors leading-snug"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h3>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                {post.summary}
              </p>

              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                style={{ color: "var(--accent)" }}
              >
                Read Article
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/blog">
            <motion.span
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              View All Articles
              <ArrowRight size={14} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

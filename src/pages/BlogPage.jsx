import { useState } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blog";
import SectionWrapper from "../Components/SectionWrapper";
import ScrollReveal from "../Components/ScrollReveal";
import BlogModal from "../Components/BlogModal";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <SectionWrapper title="Blog">
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <ScrollReveal key={post.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                p-6
                rounded-2xl
                border border-black/10 dark:border-white/20
                bg-white/40 dark:bg-white/5
                backdrop-blur-xl
                cursor-pointer
                transition-all duration-500
                hover:shadow-2xl
                hover:shadow-black/10 dark:hover:shadow-white/20
              "
              onClick={() => setSelectedPost(post)}
            >
              <h3 className="text-xl font-bold text-black dark:text-white">
                {post.title}
              </h3>

              <p className="opacity-70 mt-3 text-black dark:text-white">
                {post.summary}
              </p>

              <button className="mt-4 text-orange-500 font-semibold">
                Read More →
              </button>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </SectionWrapper>
  );
}

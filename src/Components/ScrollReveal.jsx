import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScrollReveal({ children, delay = 0, direction = "up" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: { duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxLayer({ children, depth }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, depth * 200]);

  return <motion.div style={{ y }}>{children}</motion.div>;
}

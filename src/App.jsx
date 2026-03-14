import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { ThemeProvider } from "./Context/ThemeContext";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import PageTransition from "./Components/PageTransition";

import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import NotFound from "./pages/NotFound";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

function AppInner() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // NO Lenis — native scroll is smooth and fast. Lenis + framer-motion
    // scroll listeners + particles = jank. Use CSS scroll-behavior instead.
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Static CSS-only background orbs — no JS scroll listeners */}
      <div className="bg-mesh" aria-hidden="true">
        <div
          className="bg-mesh-orb"
          style={{
            width: "700px", height: "700px",
            top: "-5%", left: "-10%",
            // background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
          }}
        />
        <div
          className="bg-mesh-orb"
          style={{
            width: "550px", height: "550px",
            top: "45%", right: "-8%",
            // background: "radial-gradient(circle, var(--glow-blue) 0%, transparent 65%)",
            filter: "blur(110px)",
            animationDelay: "8s",
          }}
        />
        <div
          className="bg-mesh-orb"
          style={{
            width: "450px", height: "450px",
            bottom: "5%", left: "25%",
            background: "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
            filter: "blur(130px)",
            animationDelay: "16s",
          }}
        />
      </div>

      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
              <Route path="/hero" element={<PageTransition><Hero /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
              <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

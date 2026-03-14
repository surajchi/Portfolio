import MagneticCursor from "../Components/MagneticCursor";
import MultiLayerParallax from "../Components/MultiLayerParallax";
import SEO from "../Components/SEO";
import ParticleBackground from "../Components/ParticleBackground";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import BlogPreview from "../sections/BlogPreview";
import Contact from "../sections/Contact";
import Resume from "../sections/Resume";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Full Stack Developer Portfolio"
        description="Modern animated portfolio with 3D, parallax and smooth transitions."
      />
      <ParticleBackground />

      <MagneticCursor />
      <MultiLayerParallax />

      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <BlogPreview />
      <Resume />
      <Contact />
    </div>
  );
}

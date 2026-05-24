import { LazyMotion, domAnimation } from 'framer-motion';
import CustomCursor   from './components/CustomCursor';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import Skills         from './components/Skills';
import Projects       from './components/Projects';
import Activity       from './components/Activity';
import Experience     from './components/Experience';
import Contact        from './components/Contact';
import Footer         from './components/Footer';
import './index.css';

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      {/* Custom cursor — only on fine-pointer (mouse) devices */}
      <CustomCursor />

      {/* Noise overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />

        {/* Subtle section dividers */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#242428] to-transparent" />
        </div>

        <About />

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#242428] to-transparent" />
        </div>

        <Skills />

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#242428] to-transparent" />
        </div>

        <Projects />

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#242428] to-transparent" />
        </div>

        <Activity />

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#242428] to-transparent" />
        </div>

        <Experience />

        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#242428] to-transparent" />
        </div>

        <Contact />
      </main>

      <Footer />
    </LazyMotion>
  );
}

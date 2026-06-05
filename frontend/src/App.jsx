import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import Projects from './components/Projects';
import LearningJourney from './components/LearningJourney';
import Skills from './components/Skills';
import GitHubActivity from './components/GitHubActivity';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import './index.css';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#08090f]">
      <CustomCursor />
      <ParticleCanvas />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <hr className="section-sep" />
        <About />
        <hr className="section-sep" />
        <CurrentlyBuilding />
        <hr className="section-sep" />
        <Projects />
        <hr className="section-sep" />
        <LearningJourney />
        <hr className="section-sep" />
        <Skills />
        <hr className="section-sep" />
        <GitHubActivity />
        <hr className="section-sep" />
        <Achievements />
        <hr className="section-sep" />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

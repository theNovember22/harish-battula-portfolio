import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ResearchAtAGlance } from './components/ResearchAtAGlance';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { ResearchFocus } from './sections/ResearchFocus';
import { SignalSection } from './sections/SignalSection';
import { SelectedResearch } from './sections/SelectedResearch';
import { ResearchApproach } from './sections/ResearchApproach';
import { TimelineAndPublications } from './sections/TimelineAndPublications';
import { ExperienceSection } from './sections/ExperienceSection';
import { InterestsAndToolbox } from './sections/InterestsAndToolbox';
import { EducationAndEarlierWork } from './sections/EducationAndEarlierWork';
import { OpenResearch } from './sections/OpenResearch';
import { AboutAndContact } from './sections/AboutAndContact';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-[#0F766E] focus:px-4 focus:py-2 focus:font-mono-tech focus:text-xs focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1">
          <Hero />
          <ResearchAtAGlance />
          <ResearchFocus />
          <SignalSection />
          <SelectedResearch />
          <ResearchApproach />
          <TimelineAndPublications />
          <ExperienceSection />
          <InterestsAndToolbox />
          <EducationAndEarlierWork />
          <OpenResearch />
          <AboutAndContact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;

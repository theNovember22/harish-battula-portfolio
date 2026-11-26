import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useHashRouter } from './lib/router';
import { HomePage } from './pages/HomePage';
import { ResearchPage } from './pages/ResearchPage';
import { SignalLabPage } from './pages/SignalLabPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const { route, navigate } = useHashRouter();

  const renderPage = () => {
    switch (route) {
      case '/research':
        return <ResearchPage onNavigate={navigate} />;
      case '/signal-lab':
        return <SignalLabPage onNavigate={navigate} />;
      case '/publications':
        return <PublicationsPage onNavigate={navigate} />;
      case '/experience':
        return <ExperiencePage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-[#0F766E] focus:px-4 focus:py-2 focus:font-mono-tech focus:text-xs focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar currentRoute={route} onNavigate={navigate} />

        <main id="main-content" className="flex-1">
          {renderPage()}
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}

export default App;

import { MotionPrefsProvider } from './context/MotionPrefs';
import { AppStateProvider } from './context/AppState';
import { PointerProvider } from './context/Pointer';
import { SectionThemeProvider } from './context/SectionTheme';
import { MARQUEE_WORDS } from './data/content';
import SkipLink from './components/layout/SkipLink';
import BackgroundStage from './components/layout/BackgroundStage';
import Navbar from './components/layout/Navbar';
import Marquee from './components/layout/Marquee';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import ScrollHoneyJar from './components/layout/ScrollHoneyJar';
import Toaster from './components/ui/Toaster';
import Hero from './components/sections/Hero';
import World from './components/sections/World';
import Flavors from './components/sections/Flavors';
import Lab from './components/sections/Lab';
import Features from './components/sections/Features';
import Story from './components/sections/Story';
import CTA from './components/sections/CTA';

export default function App() {
  return (
    <MotionPrefsProvider>
      <AppStateProvider>
        <PointerProvider>
          <SectionThemeProvider>
            <SkipLink />
            <BackgroundStage />
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none">
              <Hero />
              <div className="relative z-[3] -my-6 overflow-hidden py-10" aria-hidden="true">
                <Marquee words={MARQUEE_WORDS} tone="cocoa" rotate={-2.4} baseVelocity={-1.8} />
                <Marquee words={[...MARQUEE_WORDS].reverse()} tone="honey" rotate={1.8} baseVelocity={1.4} className="-mt-3" />
              </div>
              <World />
              <Flavors />
              <Lab />
              <Features />
              <Story />
              <CTA />
            </main>
            <Footer />
            <CartDrawer />
            <ScrollHoneyJar />
            <Toaster />
          </SectionThemeProvider>
        </PointerProvider>
      </AppStateProvider>
    </MotionPrefsProvider>
  );
}

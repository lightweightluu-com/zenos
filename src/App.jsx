import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { Button } from './components/ui/button';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Studio } from './components/Studio';
import { Philosophy } from './components/Philosophy';
import { Services } from './components/Services';
import { ServiceDetail } from './components/ServiceDetail';
import { Footer } from './components/Footer';
import { ScrollManager } from './components/ScrollManager';
import { BOOKING_URL } from './content';
import { DUR, EASE_OUT } from './lib/motion';

function StickyBook() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Sichtbar, sobald der Hero-Button ausser Sicht ist (kein Scroll-Listener).
    const el = document.getElementById('hero-cta');
    if (!el) { setShow(true); return; }
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: DUR.enter, ease: EASE_OUT }}
          className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:hidden"
        >
          <Button asChild size="lg" className="w-full shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-5" /> Jetzt buchen
            </a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Studio />
    </>
  );
}

function NotFound() {
  return (
    <section className="mx-auto grid min-h-[70svh] max-w-3xl place-content-center px-5 py-40 text-center">
      <p className="font-serif text-xl text-gold">404</p>
      <h1 className="mt-3 font-serif text-4xl font-light sm:text-6xl">Diese Seite gibt es nicht.</h1>
      <p className="mt-5 text-lg text-bone/75">Vielleicht hat sich der Link geändert. Von der Startseite aus finden Sie alles Wichtige.</p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link to="/">Zur Startseite</Link>
        </Button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
      <span id="top-sentinel" className="pointer-events-none absolute top-0 h-10 w-px" aria-hidden="true" />
      <ScrollManager />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Zum Inhalt springen
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/philosophie" element={<Philosophy />} />
          <Route path="/leistungen" element={<Services />} />
          <Route path="/leistungen/:key" element={<ServiceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyBook />
      </MotionConfig>
    </BrowserRouter>
  );
}

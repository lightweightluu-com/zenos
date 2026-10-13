import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { Button } from './components/ui/button';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Services } from './components/Services';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { BOOKING_URL } from './content';

function StickyBook() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const b = document.getElementById('buchen');
      const nearBooking = b && b.getBoundingClientRect().top < window.innerHeight * 0.6;
      setShow(window.scrollY > window.innerHeight * 0.7 && !nearBooking);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
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

export default function App() {
  return (
    <>
      <a href="#philosophie" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">
        Zum Inhalt springen
      </a>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Booking />
      </main>
      <Footer />
      <StickyBook />
    </>
  );
}

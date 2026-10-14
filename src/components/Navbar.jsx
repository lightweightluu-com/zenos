import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DrawerContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { BOOKING_URL, NAV } from '../content';

export function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      className={`inline-flex min-h-11 items-center font-serif text-xl tracking-wide text-bone sm:text-2xl ${className}`}
      aria-label="Zeno's Private Hair Atelier – zur Startseite"
    >
      Zeno<span className="text-gold">’</span>s <span className="ml-2 hidden text-mist sm:inline">Private Hair Atelier</span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Kein Scroll-Listener: ein unsichtbarer Wächter am Seitenanfang meldet, ob gescrollt wurde.
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel');
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-200 ease-out ${
        scrolled ? 'border-b border-bone/10 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Hauptnavigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <ul className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="inline-flex min-h-11 items-center text-sm tracking-[0.18em] text-bone/80 uppercase transition-colors duration-150 hover:text-gold-soft">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Jetzt buchen
              <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
            </a>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menü öffnen">
                <Menu className="size-6" />
              </Button>
            </DialogTrigger>
            <DrawerContent>
              <DialogTitle className="font-serif text-2xl">Zeno’s Atelier</DialogTitle>
              <DialogDescription className="sr-only">Navigation</DialogDescription>
              <ul className="mt-12 flex flex-col">
                {NAV.map((n) => (
                  <li key={n.to}>
                    <DialogClose asChild>
                      <Link to={n.to} className="flex min-h-14 items-center border-b border-bone/10 font-serif text-3xl text-bone transition-colors duration-150 hover:text-gold-soft">
                        {n.label}
                      </Link>
                    </DialogClose>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-auto w-full">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <CalendarCheck className="size-5" /> Jetzt buchen
                  <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
                </a>
              </Button>
            </DrawerContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, MenuContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { BOOKING_URL, NAV, STUDIO } from '../content';

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
                <span className="relative block h-4 w-6" aria-hidden="true">
                  <span className="absolute top-0 left-0 h-0.5 w-full rounded-full bg-current" />
                  <span className="absolute top-[7px] left-0 h-0.5 w-4/5 rounded-full bg-current" />
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-current" />
                </span>
              </Button>
            </DialogTrigger>
            <MenuContent>
              <div className="flex h-16 items-center">
                <DialogTitle className="font-serif text-xl tracking-wide sm:text-2xl">Zeno<span className="text-gold">’</span>s</DialogTitle>
                <DialogDescription className="sr-only">Navigation</DialogDescription>
              </div>
              <ul className="mt-10 flex flex-col">
                {NAV.map((n, i) => (
                  <li key={n.to} style={{ '--i': i }} className="relative">
                    <DialogClose asChild>
                      <Link to={n.to} className="menu-item flex min-h-[4.5rem] items-baseline gap-4 py-4 font-serif text-5xl font-light text-bone transition-colors duration-150 hover:text-gold-soft">
                        <span className="font-sans text-xs tracking-[0.2em] text-gold tabular-nums">0{i + 1}</span>
                        {n.label}
                      </Link>
                    </DialogClose>
                    <span className="menu-line absolute inset-x-0 bottom-0 h-px bg-bone/15" aria-hidden="true" />
                  </li>
                ))}
              </ul>
              <div className="menu-item mt-auto space-y-6 pt-10" style={{ '--i': NAV.length }}>
                <address className="text-sm leading-relaxed text-mist not-italic">
                  {STUDIO.street}, {STUDIO.zip} {STUDIO.city}
                  <br />
                  <a href={STUDIO.phoneHref} className="inline-flex min-h-11 items-center text-bone tabular-nums">{STUDIO.phone}</a>
                </address>
                <Button asChild size="lg" className="w-full">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <CalendarCheck className="size-5" /> Jetzt buchen
                    <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
                  </a>
                </Button>
              </div>
            </MenuContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}

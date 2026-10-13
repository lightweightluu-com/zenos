import { useEffect, useState } from 'react';
import { CalendarCheck, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { BOOKING_URL, NAV } from '../content';

export function Logo({ className = '' }) {
  return (
    <a href="#top" className={`font-serif text-xl tracking-wide text-bone sm:text-2xl ${className}`} aria-label="Zeno's Private Hair Atelier – zum Seitenanfang">
      Zeno<span className="text-gold">’</span>s <span className="hidden text-mist sm:inline">Private Hair Atelier</span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
        scrolled ? 'border-b border-line/70 bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Hauptnavigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <ul className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm tracking-[0.18em] text-bone/80 uppercase transition-colors hover:text-gold-soft">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Jetzt buchen
            </a>
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menü öffnen">
                <Menu className="size-6" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="font-serif text-2xl">Zeno’s Atelier</DialogTitle>
              <DialogDescription className="sr-only">Navigation</DialogDescription>
              <ul className="mt-16 flex flex-col gap-2">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <DialogClose asChild>
                      <a href={n.href} className="block border-b border-line py-5 font-serif text-4xl text-bone hover:text-gold-soft">
                        {n.label}
                      </a>
                    </DialogClose>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-auto w-full">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <CalendarCheck className="size-5" /> Jetzt buchen
                </a>
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}

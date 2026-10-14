import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { Logo } from './Navbar';
import { Button } from './ui/button';
import { BOOKING_URL, NAV, STUDIO } from '../content';

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink pb-28 pt-14 sm:pb-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 font-serif text-lg text-mist italic">Stil beginnt hier.</p>
          <a href={STUDIO.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm text-mist transition-colors duration-150 hover:text-gold-soft">
            Instagram <span className="sr-only">(öffnet in neuem Tab)</span>
          </a>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <nav aria-label="Fusszeile" className="flex flex-wrap gap-x-8 text-sm tracking-[0.15em] uppercase">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="inline-flex min-h-11 items-center text-bone/70 transition-colors duration-150 hover:text-gold-soft">
                {n.label}
              </Link>
            ))}
          </nav>
          <Button asChild size="lg" className="w-full md:w-auto">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-5" /> Jetzt buchen
              <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
            </a>
          </Button>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-5 text-xs text-mist sm:px-8">© {new Date().getFullYear()} Zeno’s Private Hair Atelier</p>
    </footer>
  );
}

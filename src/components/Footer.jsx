import { Link } from 'react-router-dom';
import { Logo } from './Navbar';
import { BOOKING_URL, NAV } from '../content';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-28 pt-14 sm:pb-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 font-serif text-lg text-mist italic">Stil beginnt hier.</p>
        </div>
        <nav aria-label="Fusszeile" className="flex flex-wrap gap-x-8 gap-y-1 text-sm tracking-[0.15em] uppercase">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="inline-flex min-h-11 items-center text-bone/70 hover:text-gold-soft">
              {n.label}
            </Link>
          ))}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-gold hover:text-gold-soft">
            Jetzt buchen
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-5 text-xs text-mist sm:px-8">© {new Date().getFullYear()} Zeno’s Private Hair Atelier</p>
    </footer>
  );
}

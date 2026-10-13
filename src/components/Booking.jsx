import { CalendarCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal } from './Reveal';
import { BOOKING_URL } from '../content';

export function Booking() {
  return (
    <section id="buchen" className="grain relative isolate overflow-hidden py-28 sm:py-40">
      <img
        src="/img/atelier-900.webp"
        srcSet="/img/atelier-900.webp 900w, /img/atelier-1800.webp 1800w"
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[45%_40%]"
      />
      <div className="absolute inset-0 -z-10 bg-olive-deep/85" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(107,99,65,0.35),transparent_65%)]" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-xs tracking-[0.35em] text-gold uppercase sm:text-sm">Termin vereinbaren</p>
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-6 font-serif text-5xl leading-[1.02] font-light sm:text-7xl">
          Bereit für Ihren <span className="gold-text italic">neuen Stil?</span>
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-bone/80">
          Buchen Sie Ihren Termin bequem online – und erleben Sie, wie sich Friseurkunst anfühlt.
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-5" /> Jetzt buchen
              <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal } from './Reveal';
import { SERVICES, BOOKING_URL } from '../content';

export function ServiceDetail() {
  const { key } = useParams();
  const i = SERVICES.findIndex((s) => s.key === key);
  if (i < 0) return <Navigate to="/leistungen" replace />;
  const s = SERVICES[i];
  const next = SERVICES[(i + 1) % SERVICES.length];

  return (
    <section className="mx-auto max-w-7xl px-5 pt-32 pb-24 sm:px-8 sm:pt-44 sm:pb-36">
      <Link to="/leistungen" className="inline-flex min-h-11 items-center gap-2 text-sm tracking-[0.15em] text-mist uppercase hover:text-gold-soft">
        <ArrowLeft className="size-4" /> Alle Leistungen
      </Link>
      <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-serif text-xl text-gold">0{i + 1}</p>
          </Reveal>
          <Reveal as="h1" delay={0.1} className="mt-3 font-serif text-5xl leading-none font-light sm:text-7xl">
            {s.title}
          </Reveal>
          <Reveal delay={0.2} className="mt-8 space-y-5 text-lg leading-relaxed text-bone/80">
            <p>{s.text}</p>
            <p>{s.long}</p>
          </Reveal>
          <Reveal as="ul" delay={0.3} className="mt-8 space-y-2 border-t border-line pt-6 text-mist">
            {s.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="h-px w-6 bg-gold/70" aria-hidden="true" /> {p}
              </li>
            ))}
          </Reveal>
          <Reveal delay={0.4} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <CalendarCheck className="size-5" /> Jetzt buchen
                <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={`/leistungen/${next.key}`}>Weiter: {next.title}</Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="overflow-hidden rounded-sm">
          <img
            src={s.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-[55%_30%]"
          />
        </Reveal>
      </div>
    </section>
  );
}

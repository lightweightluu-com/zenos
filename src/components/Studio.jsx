import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal } from './Reveal';
import { STUDIO } from '../content';
import { getStatus } from '../lib/hours';
import { STAGGER } from '../lib/motion';

const StudioMap = lazy(() => import('./StudioMap'));

const destination = `${STUDIO.lat},${STUDIO.lon}`;
const APPLE = `https://maps.apple.com/?daddr=${destination}&dirflg=d&q=${encodeURIComponent(STUDIO.name)}`;
const GOOGLE = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;

const isApple = () =>
  typeof navigator !== 'undefined' && (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) || navigator.platform?.startsWith('Mac'));

function MapSkeleton() {
  return <div className="skeleton size-full" role="status" aria-label="Karte wird geladen" />;
}

export function Studio() {
  const apple = useMemo(isApple, []);
  const primary = apple ? { href: APPLE, label: 'Route in Apple Karten' } : { href: GOOGLE, label: 'Route in Google Maps' };
  const secondary = apple ? { href: GOOGLE, label: 'Stattdessen Google Maps' } : { href: APPLE, label: 'Stattdessen Apple Karten' };

  const [status, setStatus] = useState(() => getStatus(STUDIO.hours));
  useEffect(() => {
    const t = setInterval(() => setStatus(getStatus(STUDIO.hours)), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="studio" className="relative bg-[linear-gradient(to_bottom,var(--color-ink),var(--color-olive-deep)_60%,var(--color-ink))] py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs tracking-[0.35em] text-gold uppercase sm:text-sm">Studio</p>
        </Reveal>
        <Reveal as="h2" delay={STAGGER} className="mt-6 font-serif text-4xl leading-[1.05] font-light sm:text-6xl">
          Besuchen Sie das Atelier in Obersiggenthal
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="space-y-10 lg:col-span-5">
            <address className="flex gap-4 not-italic">
              <MapPin className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="text-xs tracking-[0.25em] text-mist uppercase">Adresse</h3>
                <p className="mt-2 font-serif text-2xl leading-snug">
                  {STUDIO.name}
                  <br />
                  {STUDIO.street}
                  <br />
                  {STUDIO.zip} {STUDIO.city}
                </p>
              </div>
            </address>

            <div className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3 className="text-xs tracking-[0.25em] text-mist uppercase">Telefon</h3>
                <a href={STUDIO.phoneHref} className="mt-1 inline-flex min-h-11 items-center font-serif text-2xl tabular-nums transition-colors duration-150 hover:text-gold-soft">
                  {STUDIO.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <div className="w-full">
                <h3 className="text-xs tracking-[0.25em] text-mist uppercase">Öffnungszeiten</h3>
                <p role="status" className="mt-2 flex items-center gap-2 text-base">
                  <span className={`size-2 rounded-full ${status.isOpen ? 'bg-gold' : 'border border-mist'}`} aria-hidden="true" />
                  {status.text}
                </p>
                <dl className="mt-4 divide-y divide-bone/10 border-y border-bone/10">
                  {STUDIO.hours.map((h, i) => {
                    const today = i === status.today;
                    return (
                      <div key={h.day} className={`flex items-center justify-between py-2.5 text-sm sm:text-base ${today ? 'font-medium text-gold-soft' : 'text-bone/80'}`}>
                        <dt>
                          {h.day}
                          {today && <span className="ml-2 rounded-full border border-gold/50 px-2 py-0.5 text-[0.7rem] tracking-wide uppercase">Heute</span>}
                        </dt>
                        <dd className={`tabular-nums ${h.open ? '' : 'text-mist'}`}>{h.open ? `${h.open} – ${h.close}` : 'Geschlossen'}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Button asChild size="lg" variant="outline">
                <a href={primary.href} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-5" /> {primary.label}
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              </Button>
              <a href={secondary.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center text-sm text-mist underline-offset-4 transition-colors duration-150 hover:text-gold-soft hover:underline">
                {secondary.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={STAGGER} className="overflow-hidden rounded-xl border border-bone/10 lg:col-span-7">
            <div className="h-[24rem] sm:h-[32rem] lg:h-full lg:min-h-[34rem]">
              <Suspense fallback={<MapSkeleton />}>
                <StudioMap />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

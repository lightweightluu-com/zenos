import { lazy, Suspense, useMemo } from 'react';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Reveal } from './Reveal';
import { STUDIO } from '../content';

const StudioMap = lazy(() => import('./StudioMap'));

const destination = `${STUDIO.lat},${STUDIO.lon}`;
const APPLE = `https://maps.apple.com/?daddr=${destination}&dirflg=d&q=${encodeURIComponent(STUDIO.name)}`;
const GOOGLE = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;

const isApple = () =>
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) || navigator.platform?.startsWith('Mac'));

export function Studio() {
  const apple = useMemo(isApple, []);
  const primary = apple ? { href: APPLE, label: 'Route in Apple Karten' } : { href: GOOGLE, label: 'Route in Google Maps' };
  const secondary = apple ? { href: GOOGLE, label: 'Stattdessen Google Maps' } : { href: APPLE, label: 'Stattdessen Apple Karten' };
  const today = (new Date().getDay() + 6) % 7; // Montag = 0

  return (
    <section id="studio" className="relative bg-[linear-gradient(to_bottom,var(--color-ink),var(--color-olive-deep)_60%,var(--color-ink))] py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs tracking-[0.35em] text-gold uppercase sm:text-sm">Studio</p>
        </Reveal>
        <Reveal as="h2" delay={0.1} className="mt-6 font-serif text-4xl leading-[1.05] font-light sm:text-6xl">
          Besuchen Sie <span className="gold-text italic">das Atelier.</span>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="space-y-8 lg:col-span-5">
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
                <a href={STUDIO.phoneHref} className="mt-2 inline-flex min-h-11 items-center font-serif text-2xl hover:text-gold-soft">
                  {STUDIO.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
              <div className="w-full">
                <h3 className="text-xs tracking-[0.25em] text-mist uppercase">Öffnungszeiten</h3>
                <dl className="mt-3 divide-y divide-line border-y border-line">
                  {STUDIO.hours.map(([day, time], i) => (
                    <div key={day} className={`flex justify-between py-2.5 text-sm sm:text-base ${i === today ? 'text-gold-soft' : 'text-bone/80'}`}>
                      <dt>{day}{i === today && <span className="sr-only"> (heute)</span>}</dt>
                      <dd className={time === 'Geschlossen' ? 'text-mist' : ''}>{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild size="lg" variant="outline">
                <a href={primary.href} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-5" /> {primary.label}
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              </Button>
              <a href={secondary.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center text-sm text-mist underline-offset-4 hover:text-gold-soft hover:underline">
                {secondary.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="overflow-hidden rounded-sm border border-line lg:col-span-7">
            <div className="h-[24rem] sm:h-[32rem] lg:h-full lg:min-h-[34rem]">
              <Suspense fallback={<div className="grid size-full place-items-center bg-coal text-mist">Karte wird geladen …</div>}>
                <StudioMap />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

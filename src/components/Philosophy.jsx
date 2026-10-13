import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Reveal } from './Reveal';

export function Philosophy() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -30, reduce ? 0 : 70]);

  return (
    <section ref={ref} id="philosophie" className="relative overflow-hidden bg-ink py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:pr-10 lg:pt-16">
          <Reveal>
            <p className="text-xs tracking-[0.35em] text-gold uppercase sm:text-sm">Philosophie</p>
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-6 font-serif text-4xl leading-[1.05] font-light sm:text-6xl">
            Wo Handwerk <span className="gold-text italic">zur Kunst</span> wird.
          </Reveal>
          <Reveal delay={0.2} className="mt-8 space-y-5 text-base leading-relaxed text-bone/75 sm:text-lg">
            <p>
              Mein privates Hair Atelier ist ein Ort, an dem Handwerk zur Kunst wird. Hier nehme ich mir die Zeit, Ihren persönlichen Stil wirklich zu verstehen – ohne Hektik, ohne Schablone.
            </p>
            <p>
              Individualität, Präzision, Ausdruck und Authentizität: Das sind die Werte, die jeden Schnitt und jede Farbe leiten.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <blockquote className="mt-12 border-l border-gold/60 pl-6 font-serif text-2xl leading-snug text-bone italic sm:text-3xl">
              Ein Besuch bei mir ist kein Termin, es ist ein Erlebnis.
            </blockquote>
          </Reveal>
          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-line pt-8 text-center sm:text-left">
            {[
              ['Individualität', '01'],
              ['Präzision', '02'],
              ['Ausdruck', '03']
            ].map(([t, n]) => (
              <Reveal key={t}>
                <dt className="font-serif text-2xl text-gold">{n}</dt>
                <dd className="mt-1 text-[0.7rem] tracking-[0.2em] text-mist uppercase sm:text-xs">{t}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="relative grid grid-cols-5 gap-4 lg:col-span-6">
          <motion.figure style={{ y: y1 }} className="col-span-3 overflow-hidden rounded-sm">
            <img
              src="/img/salon-600.webp"
              srcSet="/img/salon-600.webp 600w, /img/salon-1000.webp 1000w"
              sizes="(min-width:1024px) 30vw, 60vw"
              alt="Zeno schneidet im lichtdurchfluteten Atelier die Haare einer Kundin, im Vordergrund liest eine Kundin"
              width="1000"
              height="1500"
              loading="lazy"
              decoding="async"
              className="aspect-[2/3] size-full object-cover transition-transform duration-[1.4s] hover:scale-105"
            />
          </motion.figure>
          <motion.figure style={{ y: y2 }} className="col-span-2 mt-24 overflow-hidden rounded-sm sm:mt-40">
            <img
              src="/img/atelier-900.webp"
              srcSet="/img/atelier-900.webp 900w, /img/atelier-1800.webp 1800w"
              sizes="(min-width:1024px) 20vw, 40vw"
              alt="Zeno beim Styling der langen Haare einer Kundin vor einem Fenster"
              width="1800"
              height="1200"
              loading="lazy"
              decoding="async"
              className="aspect-[2/3] size-full object-cover object-[40%_50%] transition-transform duration-[1.4s] hover:scale-105"
            />
          </motion.figure>
          <div className="pointer-events-none absolute -right-10 -bottom-10 -z-10 size-72 rounded-full bg-olive/30 blur-[100px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

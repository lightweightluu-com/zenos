import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, CalendarCheck } from 'lucide-react';
import { Button } from './ui/button';
import { BOOKING_URL } from '../content';

const words = ['Stil', 'beginnt', 'hier.'];

export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden md:items-center">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-20">
        <img
          src="/img/portrait-1000.webp"
          srcSet="/img/portrait-1000.webp 1000w, /img/portrait-2000.webp 2000w"
          sizes="100vw"
          alt="Zeno, Inhaber von Zeno's Private Hair Atelier, über eine Stuhllehne gelehnt"
          width="2000"
          height="1200"
          fetchPriority="high"
          className="size-full object-cover object-[50%_15%] md:object-[70%_30%]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_8%,rgba(15,16,13,0.55)_45%,rgba(15,16,13,0.15)_100%)] md:bg-[linear-gradient(95deg,var(--color-ink)_12%,rgba(15,16,13,0.7)_42%,rgba(15,16,13,0)_75%)]" />
      <div className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-olive/25 blur-[120px]" aria-hidden="true" />

      <motion.div style={{ y: textY, opacity: fade }} className="mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 md:pb-0">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="text-xs uppercase text-gold sm:text-sm"
        >
          Private Hair Atelier
        </motion.p>
        <h1 className="mt-5 font-serif text-[clamp(3.4rem,13vw,9rem)] leading-[0.92] font-light">
          <span className="sr-only">Zenos Hair Atelier – </span>
          {words.map((w, i) => (
            <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden="true">
              <motion.span
                className={`inline-block ${i === 2 ? 'gold-text italic' : ''}`}
                initial={{ y: '110%', rotate: 4 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.25 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-7 max-w-md text-base leading-relaxed text-bone/75 sm:text-lg"
        >
          Erleben Sie Friseurkunst auf höchstem Niveau – Präzision, Kreativität und Ästhetik für alle, die mehr als nur einen Haarschnitt suchen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-5" /> Jetzt buchen
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#leistungen">Leistungen entdecken</a>
          </Button>
        </motion.div>
      </motion.div>

      <a href="#philosophie" aria-label="Nach unten scrollen" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-gold md:block">
        <motion.span animate={reduce ? {} : { y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="block">
          <ArrowDown className="size-6" />
        </motion.span>
      </a>
    </section>
  );
}

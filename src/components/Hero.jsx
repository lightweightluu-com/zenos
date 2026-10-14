import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, CalendarCheck } from 'lucide-react';
import { Button } from './ui/button';
import { BOOKING_URL } from '../content';
import { DUR, EASE_OUT } from '../lib/motion';

const words = ['Stil', 'beginnt', 'hier.'];

// Parallax in drei Ebenen: Bild (langsam), Schriftzug (mittel), Text (schnell).
// Dazu am Desktop eine leichte Tiefenbewegung mit der Maus.
export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScroll = useTransform(scrollYProgress, [0, 1], [0, 110 * k]);
  const markScroll = useTransform(scrollYProgress, [0, 1], [0, -60 * k]);
  const textScroll = useTransform(scrollYProgress, [0, 1], [0, -150 * k]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1 + 0.2 * k]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Maus: -0.5 … 0.5, weich nachgezogen (Spring ohne Überschwingen).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const imgX = useTransform(smx, (v) => v * -26 * k);
  const imgMouseY = useTransform(smy, (v) => v * -16 * k);
  const imgY = useTransform([imgScroll, imgMouseY], ([a, b]) => a + b);
  const markX = useTransform(smx, (v) => v * 60 * k);
  const markMouseY = useTransform(smy, (v) => v * 24 * k);
  const markY = useTransform([markScroll, markMouseY], ([a, b]) => a + b);
  const textX = useTransform(smx, (v) => v * 10 * k);

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden md:items-center"
    >
      {/* Ebene 1: Foto, höher als der Abschnitt, damit beim Verschieben keine Kante erscheint */}
      <motion.div style={{ y: imgY, x: imgX, scale: imgScale }} className="absolute inset-x-[-4%] -top-[12%] -bottom-[6%] -z-30 will-change-transform">
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

      {/* Ebene 2: grosser Schriftzug hinter dem Text, gegenläufig zum Bild */}
      <motion.div
        aria-hidden="true"
        style={{ x: markX, y: markY, opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-[6%] -z-20 flex justify-center will-change-transform md:bottom-[2%]"
      >
        <span className="hero-mark select-none font-serif text-[clamp(4.5rem,21vw,20rem)] leading-none font-light tracking-tight">ATELIER</span>
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_8%,rgba(15,16,13,0.55)_45%,rgba(15,16,13,0.15)_100%)] md:bg-[linear-gradient(95deg,var(--color-ink)_12%,rgba(15,16,13,0.7)_42%,rgba(15,16,13,0)_75%)]" />

      {/* Ebene 3: Text, schneller als der Scroll */}
      <motion.div style={{ y: textScroll, x: textX, opacity: fade }} className="mx-auto w-full max-w-7xl px-5 pb-28 pt-32 will-change-transform sm:px-8 md:pb-0">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1, ease: EASE_OUT }}
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
                transition={{ duration: DUR.hero, delay: 0.15 + i * 0.1, ease: EASE_OUT }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.reveal, delay: 0.6, ease: EASE_OUT }}
          className="mt-7 max-w-md text-base leading-relaxed text-bone/75 sm:text-lg"
        >
          Erleben Sie Friseurkunst auf höchstem Niveau – Präzision, Kreativität und Ästhetik für alle, die mehr als nur einen Haarschnitt suchen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.reveal, delay: 0.7, ease: EASE_OUT }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" id="hero-cta">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-5" /> Jetzt buchen
              <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a href="#studio">
              Studio entdecken <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <a href="#studio" aria-label="Nach unten zum Studio scrollen" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-gold md:block">
        <motion.span animate={reduce ? {} : { y: [0, 10, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="block">
          <ArrowDown className="size-6" />
        </motion.span>
      </a>
    </section>
  );
}

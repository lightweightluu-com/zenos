import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { SERVICES } from '../content';
import { DUR, EASE_OUT, STAGGER } from '../lib/motion';

function ServiceCard({ s, i }) {
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const glow = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(201,160,99,0.12), transparent 70%)`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: DUR.reveal, delay: (i % 2) * STAGGER, ease: EASE_OUT }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return; // Touch hat kein Hover
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => { mx.set(-300); my.set(-300); }}
      className="group relative isolate overflow-hidden rounded-xl border border-bone/10 bg-coal transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-gold/40 hover:bg-surface"
    >
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <Link to={`/leistungen/${s.key}`} className="flex h-full flex-col p-7 sm:p-10">
        <span className="font-serif text-xl text-gold tabular-nums">0{i + 1}</span>
        <h2 className="mt-8 font-serif text-4xl font-light sm:text-5xl">{s.title}</h2>
        <p className="mt-4 leading-relaxed text-bone/70">{s.text}</p>
        <ul className="mt-6 space-y-2 border-t border-bone/10 pt-6 text-sm text-mist">
          {s.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="h-px w-5 bg-gold/70 transition-[width] duration-200 ease-out group-hover:w-8" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <span className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-sm tracking-[0.15em] text-gold uppercase transition-colors duration-150 group-hover:text-gold-soft">
          Details zu {s.title}
          <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </Link>
    </motion.li>
  );
}

export function Services() {
  return (
    <section className="relative bg-[linear-gradient(to_bottom,var(--color-ink),var(--color-olive-deep)_50%,var(--color-ink))] pt-36 pb-28 sm:pt-48 sm:pb-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs tracking-[0.35em] text-gold uppercase sm:text-sm">Leistungen</p>
          </Reveal>
          <Reveal as="h1" delay={STAGGER} className="mt-6 font-serif text-4xl leading-[1.05] font-light sm:text-6xl">
            Haarschnitt, Farbe, Bart und Styling
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

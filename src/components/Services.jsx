import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Scissors, Palette, Sparkles, Wand2, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { SERVICES, BOOKING_URL } from '../content';

const ICONS = { Scissors, Palette, Sparkles, Wand2 };

function ServiceCard({ s, i }) {
  const Icon = ICONS[s.icon];
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const glow = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(201,160,99,0.18), transparent 70%)`;

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => { mx.set(-300); my.set(-300); }}
      className="group relative overflow-hidden rounded-sm border border-line bg-coal transition-colors duration-500 hover:border-gold/50"
    >
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
      <article className="relative flex h-full flex-col p-7 sm:p-10">
        <div className="flex items-start justify-between">
          <span className="grid size-14 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
            <Icon className="size-6" strokeWidth={1.5} />
          </span>
          <span className="font-serif text-xl text-mist">0{i + 1}</span>
        </div>
        <h3 className="mt-10 font-serif text-4xl font-light sm:text-5xl">{s.title}</h3>
        <p className="mt-4 leading-relaxed text-bone/70">{s.text}</p>
        <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-mist">
          {s.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="h-px w-5 bg-gold/70 transition-all duration-500 group-hover:w-8" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-sm tracking-[0.15em] text-gold uppercase transition-colors hover:text-gold-soft"
        >
          {s.title} buchen <span className="sr-only">(öffnet Treatwell in neuem Tab)</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </article>
    </motion.li>
  );
}

export function Services() {
  return (
    <section id="leistungen" className="relative bg-[linear-gradient(to_bottom,var(--color-ink),var(--color-olive-deep)_50%,var(--color-ink))] py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs tracking-[0.35em] text-gold uppercase sm:text-sm">Leistungen</p>
          </Reveal>
          <Reveal as="h2" delay={0.1} className="mt-6 font-serif text-4xl leading-[1.05] font-light sm:text-6xl">
            Vier Disziplinen. <span className="gold-text italic">Ein Anspruch.</span>
          </Reveal>
        </div>
        <ul className="mt-16 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

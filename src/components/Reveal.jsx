import { motion } from 'framer-motion';
import { DUR, EASE_OUT } from '../lib/motion';

export function Reveal({ children, delay = 0, y = 16, className, as = 'div' }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: DUR.reveal, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

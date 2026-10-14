import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const TITLES = {
  '/': "Zeno's Private Hair Atelier – Stil beginnt hier",
  '/philosophie': "Philosophie – Zeno's Private Hair Atelier",
  '/leistungen': "Leistungen – Zeno's Private Hair Atelier"
};

// Bei Routenwechsel: Titel setzen, nach oben bzw. zum Anker springen, Fokus auf den Inhalt (Screenreader).
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    document.title = TITLES[pathname] ?? (pathname.startsWith('/leistungen/') ? "Leistung – Zeno's Private Hair Atelier" : "Zeno's Private Hair Atelier");
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
    if (!first.current) document.getElementById('main')?.focus({ preventScroll: true });
    first.current = false;
  }, [pathname, hash]);
  return null;
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Springt bei Routenwechsel nach oben bzw. zum Anker (#studio).
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

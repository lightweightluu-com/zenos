import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WifiOff } from 'lucide-react';
import { STUDIO } from '../content';

export default function StudioMap() {
  const el = useRef(null);
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  useEffect(() => {
    const map = L.map(el.current, {
      center: [STUDIO.lat, STUDIO.lon],
      zoom: 16,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      zoomControl: true,
      attributionControl: true
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const icon = L.divIcon({ className: '', html: '<span class="map-pin" aria-hidden="true"></span>', iconSize: [28, 28], iconAnchor: [14, 14] });
    L.marker([STUDIO.lat, STUDIO.lon], { icon, title: STUDIO.name, keyboard: false }).addTo(map);
    return () => map.remove();
  }, []);

  return (
    <div className="relative size-full">
      <div ref={el} role="region" aria-label={`Karte: ${STUDIO.name}, ${STUDIO.street}, ${STUDIO.zip} ${STUDIO.city}`} className="studio-map size-full" />
      {!online && (
        <div role="status" className="absolute inset-x-3 bottom-3 z-[500] flex items-start gap-3 rounded-lg border border-bone/10 bg-ink/95 p-4 text-sm text-bone">
          <WifiOff className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
          <p>Du bist offline, die Karte kann nicht laden. Adresse und Route findest du links; sobald du wieder online bist, erscheint die Karte.</p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STUDIO } from '../content';

export default function StudioMap() {
  const el = useRef(null);
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
    const icon = L.divIcon({
      className: '',
      html: '<span class="map-pin" aria-hidden="true"></span>',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    L.marker([STUDIO.lat, STUDIO.lon], { icon, title: STUDIO.name, keyboard: false }).addTo(map);
    return () => map.remove();
  }, []);
  return <div ref={el} role="region" aria-label={`Karte: ${STUDIO.name}, ${STUDIO.street}, ${STUDIO.zip} ${STUDIO.city}`} className="studio-map size-full min-h-[22rem]" />;
}

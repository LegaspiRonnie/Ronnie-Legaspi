import { useEffect, useRef } from 'react';
import type { Coordinates } from '../types.ts';

// Minimal shape of the bits of the Leaflet global we actually use — Leaflet
// itself is loaded from a CDN <script> at runtime, not bundled, so there's
// no npm type package backing `window.L`.
interface LeafletMap {
  remove: () => void;
}
interface LeafletLayer {
  addTo: (map: LeafletMap) => LeafletLayer;
  bindPopup: (content: string) => LeafletLayer;
}
interface LeafletGlobal {
  map: (el: HTMLElement, options: { scrollWheelZoom: boolean }) => LeafletMap & { setView: (center: [number, number], zoom: number) => LeafletMap };
  tileLayer: (url: string, options: { attribution: string; maxZoom: number }) => LeafletLayer;
  marker: (center: [number, number]) => LeafletLayer;
}

declare global {
  interface Window {
    L?: LeafletGlobal;
  }
}

interface LocationMapProps {
  coordinates: Coordinates | null;
  label?: string | null;
}

// Loads Leaflet from unpkg on demand (same behavior as the original Blade partial)
export default function LocationMap({ coordinates, label }: LocationMapProps) {
  const mapEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!coordinates || !mapEl.current) return undefined;

    let map: LeafletMap | undefined;
    let cancelled = false;

    const init = () => {
      if (cancelled || !window.L || !mapEl.current || (mapEl.current as unknown as { _leaflet_id?: number })._leaflet_id) return;
      map = window.L.map(mapEl.current, { scrollWheelZoom: false }).setView([coordinates.lat, coordinates.lng], 12);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      window.L.marker([coordinates.lat, coordinates.lng]).addTo(map).bindPopup(label ?? '');
    };

    if (!document.getElementById('leaflet-css')) {
      const css = document.createElement('link');
      css.id = 'leaflet-css';
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);
    }

    if (window.L) {
      init();
    } else if (document.getElementById('leaflet-js')) {
      document.getElementById('leaflet-js')!.addEventListener('load', init);
    } else {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.addEventListener('load', init);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [coordinates, label]);

  if (!coordinates) return null;

  return <div ref={mapEl} className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800" style={{ height: '200px' }}></div>;
}



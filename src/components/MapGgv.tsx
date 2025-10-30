import { useEffect, useRef } from 'react';
import L, { GeoJSON as LeafletGeoJSON } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { loadRegions, loadScores, getColor } from '@/utils/dataLoader';

interface MapGgvProps {
  onRegionClick: (vnbId: string, vnbName: string) => void;
}

const MapGgv = ({ onRegionClick }: MapGgvProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Germany
    map.current = L.map(mapContainer.current).setView([51.1657, 10.4515], 6);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Load data and render
    Promise.all([
      loadRegions('/data/vnb_regions.json'),
      loadScores('https://docs.google.com/spreadsheets/d/e/2PACX-1vQVyiiMn8SoMONrP-xGkt82DJcgjdL_gQ0nANylg3_0IqIe0l9fDM6DuXO5RNlACQl_Z9sg5ZQOWuM_/pub?gid=958902975&single=true&output=csv')
    ]).then(([geoData, scoresMap]) => {
      if (!map.current) return;

      L.geoJSON(geoData as any, {
        style: (feature) => {
          const vnbId = feature?.properties?.id || feature?.properties?.vnb_id;
          const scoreData = vnbId ? scoresMap.get(vnbId) : null;
          const color = getColor(scoreData?.score);

          return {
            fillColor: color,
            weight: 1,
            opacity: 1,
            color: 'hsl(var(--border))',
            fillOpacity: 0.7
          };
        },
        onEachFeature: (feature, layer) => {
          const vnbId = feature.properties.id || feature.properties.vnb_id;
          const scoreData = scoresMap.get(vnbId);
          const vnbName = scoreData?.vnb_name || vnbId;

          // Tooltip
          let tooltipText = '';
          if (scoreData && scoreData.score !== null) {
            tooltipText = `${vnbName}: ${scoreData.score > 0 ? '+' : ''}${scoreData.score}`;
            if (scoreData.updated_at) {
              tooltipText += ` (Stand ${scoreData.updated_at})`;
            }
          } else if (scoreData) {
            tooltipText = `${vnbName}: Keine Daten`;
          } else {
            tooltipText = `VNB ${vnbId}: Keine Daten`;
          }

          layer.bindTooltip(tooltipText, {
            sticky: true,
            className: 'custom-tooltip'
          });

          // Click handler
          layer.on('click', () => {
            onRegionClick(vnbId, vnbName);
          });

          // Hover effect
          layer.on('mouseover', function() {
            this.setStyle({
              weight: 3,
              fillOpacity: 0.9
            });
          });

          layer.on('mouseout', function() {
            this.setStyle({
              weight: 2,
              fillOpacity: 0.7
            });
          });
        }
      }).addTo(map.current);
    }).catch(error => {
      console.error('Error loading map data:', error);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onRegionClick]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full rounded-lg border border-border shadow-sm"
      style={{ height: '70vh', minHeight: '500px' }}
      role="img"
      aria-label="Karte der Verteilnetzbetreiber mit GGV-Bewertungen"
    />
  );
};

export default MapGgv;

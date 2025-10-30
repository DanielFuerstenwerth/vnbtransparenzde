import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { loadScores } from '@/utils/dataLoader';

interface MapGgvProps {
  onRegionClick: (vnbId: string, vnbName: string) => void;
}

const MapGgv = ({ onRegionClick }: MapGgvProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current, {
      zoomControl: true,
      attributionControl: false
    }).setView([51.1657, 10.4515], 6);

    // Load real GeoJSON and scores
    Promise.all([
      fetch('/data/vnb_regions.geojson').then(r => r.json()),
      loadScores('/data/scores_ggv.csv')
    ]).then(([geoData, scoresMap]) => {
      if (!map.current) return;

      const geoLayer = L.geoJSON(geoData, {
        style: (feature: any) => {
          const vnbId = feature?.id;
          const scoreData = vnbId ? scoresMap.get(vnbId) : null;
          const score = scoreData?.score;
          
          let fillColor = '#E5E7EB';
          if (score !== null && score !== undefined) {
            if (score <= -50) fillColor = '#7F1D1D';
            else if (score <= -25) fillColor = '#DC2626';
            else if (score < 25) fillColor = '#9CA3AF';
            else if (score < 50) fillColor = '#16A34A';
            else fillColor = '#065F46';
          }

          return {
            fillColor,
            weight: 2,
            opacity: 1,
            color: '#333333',
            fillOpacity: 0.7
          };
        },
        onEachFeature: (feature: any, layer) => {
          const vnbId = feature?.id;
          const scoreData = scoresMap.get(vnbId);
          const vnbName = scoreData?.vnb_name || vnbId;

          layer.bindTooltip(
            scoreData ? `${vnbName}: ${scoreData.score !== null ? (scoreData.score > 0 ? '+' : '') + scoreData.score : 'N/A'}` : `VNB ${vnbId}`,
            { sticky: true, className: 'custom-tooltip' }
          );

          layer.on('click', () => onRegionClick(vnbId, vnbName));
          layer.on('mouseover', function(this: any) {
            this.setStyle({ weight: 3, fillOpacity: 0.9 });
          });
          layer.on('mouseout', function(this: any) {
            this.setStyle({ weight: 2, fillOpacity: 0.7 });
          });
        }
      }).addTo(map.current);

      map.current.fitBounds(geoLayer.getBounds());
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
      aria-label="Karte der Verteilnetzbetreiber"
    />
  );
};

export default MapGgv;

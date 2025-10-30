import * as topojson from 'topojson-client';

export interface ScoreData {
  vnb_id: string;
  vnb_name: string;
  score: number | null;
  updated_at: string;
}

export interface GeoJSONFeature {
  type: string;
  properties: {
    vnb_id: string;
    vnb_name?: string;
  };
  geometry: any;
}

export interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

export async function loadRegions(url: string): Promise<GeoJSONData> {
  const response = await fetch(url);
  const data = await response.json();
  
  // Convert TopoJSON to GeoJSON
  if (data.type === 'Topology') {
    const geojson = topojson.feature(data, data.objects.data) as any;
    return geojson;
  }
  
  return data;
}

export async function loadScores(url: string): Promise<Map<string, ScoreData>> {
  const response = await fetch(url);
  const text = await response.text();
  
  const lines = text.trim().split('\n');
  const scoreMap = new Map<string, ScoreData>();
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',');
    if (parts.length >= 3) {
      const vnb_id = parts[0].trim();
      const vnb_name = parts[1].trim();
      const scoreStr = parts[2].trim();
      const updated_at = parts.length > 3 ? parts[3].trim() : '';
      
      const score = scoreStr && scoreStr !== '' ? parseFloat(scoreStr.replace('+', '')) : null;
      scoreMap.set(vnb_id, { vnb_id, vnb_name, score, updated_at });
    }
  }
  
  return scoreMap;
}

export function getColor(score: number | null | undefined): string {
  if (score === null || score === undefined) return 'hsl(var(--unknown))';
  
  if (score <= -50) return 'hsl(var(--neg-50))';
  if (score <= -25) return 'hsl(var(--neg-25))';
  if (score < 25) return 'hsl(var(--neutral))';
  if (score < 50) return 'hsl(var(--pos-25))';
  return 'hsl(var(--pos-50))';
}

export function getColorLabel(index: number): string {
  const labels = ['≤ -50', '-25', '0', '+25', '≥ +50', 'Keine Daten'];
  return labels[index] || '';
}

export function getColorByIndex(index: number): string {
  const colors = [
    'hsl(var(--neg-50))',
    'hsl(var(--neg-25))',
    'hsl(var(--neutral))',
    'hsl(var(--pos-25))',
    'hsl(var(--pos-50))',
    'hsl(var(--unknown))'
  ];
  return colors[index] || 'hsl(var(--unknown))';
}

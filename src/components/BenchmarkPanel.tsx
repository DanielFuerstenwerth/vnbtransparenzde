import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadRegions, loadScores, getColor, ScoreData } from "@/utils/dataLoader";
import { CheckCircle2 } from "lucide-react";

interface BenchmarkPanelProps {
  selectedVnbId: string | null;
  onVnbSelect: (vnbId: string) => void;
}

const BenchmarkPanel = ({ selectedVnbId, onVnbSelect }: BenchmarkPanelProps) => {
  const [vnbList, setVnbList] = useState<Array<{ id: string; name: string; score: number | null }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      loadRegions('/data/vnb_regions_dummy.geojson'),
      loadScores('/data/scores_ggv.csv')
    ]).then(([geoData, scoresMap]) => {
      const list = geoData.features.map(feature => {
        const vnbId = feature.properties.vnb_id;
        const scoreData = scoresMap.get(vnbId);
        return {
          id: vnbId,
          name: feature.properties.vnb_name,
          score: scoreData?.score ?? null
        };
      });

      // Sort by score (nulls last)
      list.sort((a, b) => {
        if (a.score === null) return 1;
        if (b.score === null) return -1;
        return b.score - a.score;
      });

      setVnbList(list);
      setLoading(false);
    });
  }, []);

  const selectedVnb = vnbList.find(v => v.id === selectedVnbId);
  const position = selectedVnb ? vnbList.findIndex(v => v.id === selectedVnbId) + 1 : null;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Benchmark-Analyse</CardTitle>
        <CardDescription>Vergleich der Verteilnetzbetreiber</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="benchmark" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="benchmark">Benchmarking</TabsTrigger>
            <TabsTrigger value="methodik">Methodik & Erläuterungen</TabsTrigger>
          </TabsList>

          <TabsContent value="benchmark" className="space-y-6">
            <div>
              <label htmlFor="vnb-select" className="text-sm font-medium mb-2 block">
                VNB auswählen
              </label>
              <Select
                value={selectedVnbId || undefined}
                onValueChange={onVnbSelect}
                disabled={loading}
              >
                <SelectTrigger id="vnb-select">
                  <SelectValue placeholder="VNB auswählen..." />
                </SelectTrigger>
                <SelectContent>
                  {vnbList.map(vnb => (
                    <SelectItem key={vnb.id} value={vnb.id}>
                      {vnb.name} {vnb.score !== null ? `(${vnb.score > 0 ? '+' : ''}${vnb.score})` : '(Keine Daten)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Hinweis: Suchfunktion folgt in zukünftiger Version
              </p>
            </div>

            {selectedVnb && (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-1">Position</p>
                  <p className="text-2xl font-bold">
                    {position} von {vnbList.length}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">Ranking</h4>
                  <div className="space-y-2" role="list" aria-label="VNB Ranking">
                    {vnbList.map((vnb, index) => {
                      const isSelected = vnb.id === selectedVnbId;
                      return (
                        <div
                          key={vnb.id}
                          className={`flex items-center gap-3 p-2 rounded transition-colors ${
                            isSelected ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/30 border border-transparent'
                          }`}
                          role="listitem"
                        >
                          <span className="text-xs text-muted-foreground w-6">{index + 1}.</span>
                          <div
                            className="h-6 rounded flex-grow"
                            style={{
                              width: vnb.score !== null ? `${Math.abs(vnb.score)}%` : '10%',
                              maxWidth: '100%',
                              backgroundColor: getColor(vnb.score),
                              opacity: isSelected ? 1 : 0.7
                            }}
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium min-w-[50px] text-right">
                            {vnb.score !== null ? (vnb.score > 0 ? '+' : '') + vnb.score : 'N/A'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-score-excellent" />
                      Best Practices
                    </h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• Online-Antragsverfahren</li>
                      <li>• Transparente Fristen</li>
                      <li>• Digitale Dokumentation</li>
                      <li>• Support-Hotline</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-score-excellent" />
                      Gesetzliche Anforderungen
                    </h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• EnWG §19 Abs. 2</li>
                      <li>• NAV §8</li>
                      <li>• MsbG §21</li>
                      <li>• StromNZV §10</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {!selectedVnb && !loading && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Bitte wählen Sie einen VNB aus der Liste oder klicken Sie auf eine Region in der Karte</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="methodik" className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <h4 className="text-base font-semibold mb-3">Bewertungsmethodik GGV</h4>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Datenquellen</h5>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Öffentliche Websites der VNB</li>
                    <li>Veröffentlichte Geschäftsberichte</li>
                    <li>Informationsanfragen nach IFG/UIG</li>
                    <li>Medienberichte und Pressemitteilungen</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Bewertungskriterien</h5>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Transparenz der Prozesse und Fristen</li>
                    <li>Digitalisierung des Antragsverfahrens</li>
                    <li>Qualität der Beratung und Unterstützung</li>
                    <li>Umsetzungsgeschwindigkeit</li>
                    <li>Anzahl realisierter GGV-Projekte</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Scoring-System</h5>
                  <p className="text-muted-foreground mb-2">
                    Die Bewertung erfolgt auf einer Skala von -100 bis +100 Punkten:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li><strong>+50 bis +100:</strong> Sehr gut - Vorbildliche Umsetzung</li>
                    <li><strong>+25 bis +49:</strong> Gut - Überdurchschnittlich</li>
                    <li><strong>-24 bis +24:</strong> Neutral - Durchschnittlich</li>
                    <li><strong>-49 bis -25:</strong> Verbesserungsbedarf</li>
                    <li><strong>-100 bis -50:</strong> Mangelhaft - Deutliche Defizite</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Aktualisierung</h5>
                  <p className="text-muted-foreground">
                    Die Daten werden quartalsweise aktualisiert. Stand der aktuellen Daten: Oktober 2025.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BenchmarkPanel;

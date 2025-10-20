import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const Methodik = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-red-700">Methodik v0.1
(bislang nur Dummy-Text)</h1>

        <div className="max-w-3xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Bewertungskategorien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Dezentrale Energiewende</h3>
                <p className="text-muted-foreground">
                  Bewertet die Geschwindigkeit und Effizienz beim Anschluss dezentraler Erzeugungsanlagen 
                  (PV, Wind, Speicher). Indikatoren: Durchschnittliche Anschlussdauer, 
                  Ablehnungsquote, Rückfragenhäufigkeit.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">2. Digitalisierung</h3>
                <p className="text-muted-foreground">
                  Misst den Digitalisierungsgrad der Prozesse. Indikatoren: Online-Antragsverfahren, 
                  API-Verfügbarkeit, digitale Statusabfrage, E-Mail-Responsiveness.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">3. Flexible Anschlüsse</h3>
                <p className="text-muted-foreground">
                  Bewertet innovative Anschlusskonzepte wie Spitzenglättung, flexible Einspeiseleistung 
                  und dynamische Netzentgelte. Indikatoren: Verfügbare Optionen, 
                  Transparenz der Konditionen.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scoring-System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="mb-4">
                    Jede Kategorie wird auf einer Skala von 0–100 bewertet:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{
                      backgroundColor: 'hsl(142, 71%, 37%)'
                    }}></div>
                      <span><strong>75–100 Punkte:</strong> Gut (grün)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{
                      backgroundColor: 'hsl(38, 92%, 50%)'
                    }}></div>
                      <span><strong>50–74 Punkte:</strong> Mittel (gelb/orange)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{
                      backgroundColor: 'hsl(0, 72%, 51%)'
                    }}></div>
                      <span><strong>0–49 Punkte:</strong> Schlecht (rot)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded bg-muted-foreground/40"></div>
                      <span><strong>Keine Daten:</strong> Grau</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Datenquellen</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>Bei fehlenden Daten wird &quot;keine Daten&quot; angezeigt (grau).</li>
                <li>• Öffentliche VNB-Websites (Antragsformulare, Prozessbeschreibungen)</li>
                <li>• Offizielle Berichte (BNetzA, Landesregulierungsbehörden)</li>
                <li>• Medienberichte und Recherchen</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Alle Bewertungen sind durch Evidenzlinks nachvollziehbar. 
                Bei fehlenden Daten wird "keine Daten" angezeigt (grau).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changelog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold">v0.1 – 2025-10-20</div>
                  <p className="text-sm text-muted-foreground">
                    Initiale Version: 3 Kategorien definiert, Scoring-System festgelegt, 
                    MVP-Struktur mit Dummy-Daten.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Methodik;
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("dezentral");

  // Dummy news data
  const newsItems = [
    {
      slug: "warum-vnb-transparenz",
      title: "Warum VNB-Transparenz jetzt zählt",
      date: "2025-10-20",
      excerpt: "Die Energiewende braucht transparente Netzbetreiber. Erfahren Sie, warum Performance-Transparenz der Schlüssel ist.",
    },
    {
      slug: "methodik-v0-1",
      title: "Unsere Methodik v0.1",
      date: "2025-10-18",
      excerpt: "Wie wir VNB bewerten: Kategorien, Scores und Datenquellen im Detail.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transparenz über deutsche Verteilnetzbetreiber
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Wie schnell schließen VNBs erneuerbare Energien an? 
              Vergleichen Sie ~800 Netzbetreiber auf einer interaktiven Karte.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Zur Karte
            </Button>
          </div>
        </section>

        {/* Map Section */}
        <section id="map-section" className="container mx-auto px-4 py-12">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
              <TabsTrigger value="dezentral">Dezentrale EW</TabsTrigger>
              <TabsTrigger value="digitalisierung">Digitalisierung</TabsTrigger>
              <TabsTrigger value="flexible">Flexible Anschlüsse</TabsTrigger>
            </TabsList>

            <TabsContent value="dezentral" className="mt-0">
              <div className="bg-muted rounded-lg p-8 min-h-[70vh] flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-muted-foreground">
                    Interaktive Karte wird hier geladen
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Dummy-Deutschland Karte - Kategorie: Dezentrale Energiewende)
                  </p>
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 right-4 bg-card p-4 rounded-lg shadow-lg border border-border">
                  <h4 className="font-semibold text-sm mb-2">Legende</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(142, 71%, 37%)' }}></div>
                      <span>Gut (≥75)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(38, 92%, 50%)' }}></div>
                      <span>Mittel (50-74)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(0, 72%, 51%)' }}></div>
                      <span>Schlecht (0-49)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-muted-foreground/40"></div>
                      <span>Keine Daten</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="digitalisierung" className="mt-0">
              <div className="bg-muted rounded-lg p-8 min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-muted-foreground">
                    Interaktive Karte wird hier geladen
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Kategorie: Digitalisierung)
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flexible" className="mt-0">
              <div className="bg-muted rounded-lg p-8 min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-muted-foreground">
                    Interaktive Karte wird hier geladen
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (Kategorie: Flexible Anschlüsse)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* News Teaser Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Neuigkeiten</h2>
              <Link to="/news">
                <Button variant="outline">Alle News</Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {newsItems.map((item) => (
                <Card key={item.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>
                      <Link to={`/news/${item.slug}`} className="hover:text-primary transition-colors">
                        {item.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{item.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.excerpt}</p>
                    <Link 
                      to={`/news/${item.slug}`}
                      className="text-sm text-primary hover:text-accent transition-colors mt-4 inline-block"
                    >
                      Weiterlesen →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

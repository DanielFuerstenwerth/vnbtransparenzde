import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import SubcategoryTabs from "@/components/SubcategoryTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ComingSoonCard from "@/components/ComingSoonCard";

const ComingSoon = () => {
  const [activeCategory, setActiveCategory] = useState("dezentrale-ew");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <SubcategoryTabs activeSubcategory="coming-soon" />
      
      <main id="main-content" className="flex-grow bg-background">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">Weitere Kategorien</h1>
          
          <div className="max-w-4xl space-y-6">
            <ComingSoonCard />
            
            <Card>
              <CardHeader>
                <CardTitle>Geplante Unterkategorien</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-muted-foreground">•</span>
                    <div>
                      <h4 className="font-medium">Einspeisemanagement</h4>
                      <p className="text-sm text-muted-foreground">Analyse der Transparenz und Prozesse beim Einspeisemanagement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-muted-foreground">•</span>
                    <div>
                      <h4 className="font-medium">Netzampel & Transparenz</h4>
                      <p className="text-sm text-muted-foreground">Bewertung der Netzzustandsinformationen und deren Zugänglichkeit</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-muted-foreground">•</span>
                    <div>
                      <h4 className="font-medium">Speicherintegration</h4>
                      <p className="text-sm text-muted-foreground">Unterstützung bei der Integration von Batteriespeichern</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-muted-foreground">•</span>
                    <div>
                      <h4 className="font-medium">PV-Anlagen Anschluss</h4>
                      <p className="text-sm text-muted-foreground">Bewertung der Anschlussprozesse für Photovoltaikanlagen</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-muted-foreground">•</span>
                    <div>
                      <h4 className="font-medium">Redispatch 2.0</h4>
                      <p className="text-sm text-muted-foreground">Analyse der Umsetzung von Redispatch 2.0</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComingSoon;

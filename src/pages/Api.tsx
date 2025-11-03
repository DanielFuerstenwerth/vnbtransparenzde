import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Api = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">API & Daten-Download</h1>

        <div className="max-w-3xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>CSV-Export (coming soon)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Alle VNB-Scores werden als CSV-Datei zum Download bereitgestellt. Format:
              </p>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`vnb_id,cat_id,score,evidence_url,updated_at,source_type,status,notes
VNB001,dezentral,78,https://...,2025-10-15,community,verified,""
VNB001,digitalisierung,,,,,unknown,""
...`}
              </pre>
              <p className="text-sm text-muted-foreground mt-4">
                Der Download wird in Kürze verfügbar sein.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>JSON-API (geplant)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Eine REST-API für programmatischen Zugriff ist in Planung. Geplante Endpoints:
              </p>
        
              </p>
            </CardContent>
          </Card>

  

          <Card>
            <CardHeader>
              <CardTitle>Lizenz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Alle Daten werden unter einer offenen Lizenz (z.B. CC BY 4.0) veröffentlicht. 
                Details folgen.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Api;

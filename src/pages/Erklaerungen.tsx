import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const Erklaerungen = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Erklärungen & Rechte</h1>

        <div className="max-w-3xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Die Aufgaben und Pflichten der VNB</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Verteilnetzbetreiber haben verschiedene Pflichten gegenüber Projektierern, Anlagenbetreibern und Anschlussnehmern. Hier werden für die verschiedenen Aufgabenbereiche ein Überblick gegeben werden:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Anspruch auf diskriminierungsfreien Netzzugang (EnWG §20)</li>
                <li>Informationsrechte zur Netzanschlusskapazität</li>
                <li>Fristen für Angebotserstellung</li>
                <li>Beschwerdewege bei Verzögerungen</li>
              </ul>
              <p className="text-sm text-muted-foreground italic mt-4">
                [Platzhalter – wird in Kürze mit detaillierten Leitfäden gefüllt]
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links zu Leitfäden und weiteren Informationen für die betrachteten Themen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Hier finden Sie bald praktische Vorlagen und Schritt-für-Schritt-Anleitungen:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Musteranträge für Netzanschluss</li>
                <li>Beschwerdevorlagen bei Verzögerungen</li>
                <li>Checklisten für den Anschlussprozess</li>
                <li>Dokumentationsvorlagen für Evidenzen</li>
              </ul>
              <p className="text-sm text-muted-foreground italic mt-4">
                [Platzhalter – Templates werden sukzessive ergänzt]
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Wie kann ich gegen einen VNB vorgehen?</h3>
                <p className="text-sm text-muted-foreground">
                  [Platzhalter – wird mit rechtlichen Hinweisen und Kontaktstellen gefüllt]
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Wer ist für die Regulierung zuständig?</h3>
                <p className="text-sm text-muted-foreground">
                  [Platzhalter – Bundesnetzagentur und Landesregulierungsbehörden]
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>;
};
export default Erklaerungen;
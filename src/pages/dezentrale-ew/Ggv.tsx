import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryTabs from "@/components/CategoryTabs";
import SubcategoryTabs from "@/components/SubcategoryTabs";
import MapGgv from "@/components/MapGgv";
import MapLegend from "@/components/MapLegend";
import BenchmarkPanel from "@/components/BenchmarkPanel";

const Ggv = () => {
  const [activeCategory, setActiveCategory] = useState("dezentrale-ew");
  const [selectedVnbId, setSelectedVnbId] = useState<string | null>(null);

  const handleRegionClick = (vnbId: string, vnbName: string) => {
    setSelectedVnbId(vnbId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <SubcategoryTabs activeSubcategory="ggv" />
      
      <main id="main-content" className="flex-grow bg-background">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">Gemeinschaftliche Gebäudeversorgung (GGV)</h1>
          
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left column - Map */}
            <div className="lg:col-span-7 space-y-4">
              <MapGgv onRegionClick={handleRegionClick} />
              <MapLegend />
            </div>

            {/* Right column - Benchmark Panel */}
            <div className="lg:col-span-5">
              <BenchmarkPanel 
                selectedVnbId={selectedVnbId}
                onVnbSelect={setSelectedVnbId}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ggv;

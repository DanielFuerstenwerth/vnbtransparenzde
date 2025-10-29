import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const subcategories = [
    { id: "ggv", label: "Gemeinschaftliche Gebäudeversorgung (GGV)", path: "/dezentrale-ew/ggv" },
    { id: "mieterstrom", label: "Mieterstrom", path: "/dezentrale-ew/mieterstrom" },
    { id: "14a", label: "§14a EnWG", path: "/dezentrale-ew/14a" },
    { id: "direktvermarktung", label: "Direktvermarktung", path: "/dezentrale-ew/direktvermarktung" },
    { id: "coming-soon", label: "Weitere Kategorien", path: "/dezentrale-ew/coming-soon" },
  ];

  return (
    <div className="border-b border-border bg-background relative">
      <div className="container mx-auto px-6">
        <Tabs value={activeCategory} onValueChange={onCategoryChange}>
          <TabsList className="bg-transparent h-auto p-0 space-x-4">
            <div 
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <TabsTrigger 
                value="dezentrale-ew" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              >
                Dezentrale Energiewende
              </TabsTrigger>
              
              {showDropdown && (
                <div className="absolute top-full left-0 mt-0 bg-background border border-border rounded-b-lg shadow-lg z-50 min-w-[300px]">
                  <ul className="py-2">
                    {subcategories.map((sub) => (
                      <li key={sub.id}>
                        <button
                          onClick={() => {
                            navigate(sub.path);
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <TabsTrigger 
              value="digitalisierung" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              disabled
            >
              Digitalisierung
            </TabsTrigger>
            <TabsTrigger 
              value="flexible-anschluesse" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
              disabled
            >
              Flexible Anschlüsse
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryTabs;

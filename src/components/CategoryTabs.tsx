import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-6">
        <Tabs value={activeCategory} onValueChange={onCategoryChange}>
          <TabsList className="bg-transparent h-auto p-0 space-x-4">
            <TabsTrigger 
              value="dezentrale-ew" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Dezentrale Energiewende
            </TabsTrigger>
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

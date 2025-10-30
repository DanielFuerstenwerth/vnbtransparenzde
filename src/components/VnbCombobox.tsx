import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VnbComboboxProps {
  vnbList: Array<{ id: string; name: string; score: number | null }>;
  selectedVnbId: string | null;
  onVnbSelect: (vnbId: string) => void;
  disabled?: boolean;
}

export function VnbCombobox({ vnbList, selectedVnbId, onVnbSelect, disabled }: VnbComboboxProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredVnbs = React.useMemo(() => {
    if (!searchTerm.trim()) return vnbList;
    const search = searchTerm.toLowerCase();
    return vnbList.filter(vnb => 
      vnb.name.toLowerCase().includes(search) || 
      vnb.id.toLowerCase().includes(search)
    );
  }, [searchTerm, vnbList]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="VNB suchen (z.B. Berli)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={disabled}
          className="pl-9"
        />
      </div>
      
      {searchTerm && (
        <ScrollArea className="h-[300px] rounded-md border">
          <div className="p-2">
            {filteredVnbs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Kein VNB gefunden.
              </p>
            ) : (
              <div className="space-y-1">
                {filteredVnbs.map((vnb) => (
                  <button
                    key={vnb.id}
                    onClick={() => {
                      onVnbSelect(vnb.id);
                      setSearchTerm("");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent ${
                      selectedVnbId === vnb.id ? 'bg-accent' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="flex-1 truncate font-medium">
                        {vnb.name}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {vnb.score !== null ? `${vnb.score > 0 ? '+' : ''}${vnb.score}` : 'N/A'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

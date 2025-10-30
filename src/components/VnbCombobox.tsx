import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface VnbComboboxProps {
  vnbList: Array<{ id: string; name: string; score: number | null }>;
  selectedVnbId: string | null;
  onVnbSelect: (vnbId: string) => void;
  disabled?: boolean;
}

export function VnbCombobox({ vnbList, selectedVnbId, onVnbSelect, disabled }: VnbComboboxProps) {
  const [open, setOpen] = React.useState(false);
  
  const selectedVnb = vnbList.find(v => v.id === selectedVnbId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedVnb ? (
            <span className="truncate">
              {selectedVnb.name} {selectedVnb.score !== null ? `(${selectedVnb.score > 0 ? '+' : ''}${selectedVnb.score})` : '(Keine Daten)'}
            </span>
          ) : (
            "VNB auswählen..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="VNB suchen..." />
          <CommandList>
            <CommandEmpty>Kein VNB gefunden.</CommandEmpty>
            <CommandGroup>
              {vnbList.map((vnb) => (
                <CommandItem
                  key={vnb.id}
                  value={`${vnb.name} ${vnb.id}`}
                  onSelect={() => {
                    onVnbSelect(vnb.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedVnbId === vnb.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1 truncate">
                    {vnb.name}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {vnb.score !== null ? `${vnb.score > 0 ? '+' : ''}${vnb.score}` : 'N/A'}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

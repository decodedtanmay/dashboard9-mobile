import { create } from "zustand";
import { GeoFilter } from "@/domain/entities";

interface FilterState {
  filter: GeoFilter;
  setRegion: (region: GeoFilter["region"]) => void;
  setFilter: (filter: GeoFilter) => void;
  clear: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filter: { region: "All" },
  setRegion: (region) => set({ filter: { region } }),
  setFilter: (filter) => set({ filter }),
  clear: () => set({ filter: { region: "All" } })
}));

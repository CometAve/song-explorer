import { create } from "zustand";
import type { Song } from "../components/types";

interface SearchState {
  searchText: string;
  searchResults: Song[];
  isSearching: boolean;
  setSearchText: (text: string) => void;
  setSearchResults: (results: Song[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchText: "",
  searchResults: [],
  isSearching: false,
  setSearchText: (text: string) => set({ searchText: text }),
  setSearchResults: (results: Song[]) => set({ searchResults: results }),
  setIsSearching: (isSearching: boolean) => set({ isSearching }),
  clearSearch: () => set({ searchText: "", searchResults: [] }),
}));

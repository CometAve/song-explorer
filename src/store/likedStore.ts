import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikedState {
  likedSongs: Set<string>;
  toggleSong: (songNo: string) => void;
  clearLikedSongs: () => void;
}

export const useLikedStore = create<LikedState>()(
  persist(
    (set) => ({
      likedSongs: new Set<string>(),

      toggleSong: (songNo: string) => {
        set((state) => {
          const newLikedSongs = new Set(state.likedSongs);
          if (newLikedSongs.has(songNo)) {
            newLikedSongs.delete(songNo);
          } else {
            newLikedSongs.add(songNo);
          }
          return { likedSongs: newLikedSongs };
        });
      },

      clearLikedSongs: () => {
        set({ likedSongs: new Set<string>() });
      },
    }),
    {
      name: "liked-songs-storage",
      // Set을 JSON으로 변환/복원하는 함수
      partialize: (state) => ({ likedSongs: Array.from(state.likedSongs) }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.likedSongs)) {
          state.likedSongs = new Set(state.likedSongs);
        }
      },
    }
  )
);

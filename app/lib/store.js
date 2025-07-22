import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTitle = create(
  persist(
    (set) => ({
      animetitle: 'english',
      setAnimetitle: (title) => set({ animetitle: title }),
    }),
    {
      name: 'animetitle-storage',
    }
  )
);

export const useSettings = create(
  persist(
    (set) => ({
      settings: {
        bannertrailer: true,
        autoplay: true,
        skipintro: true,
        skipoutro: true,
        quality: 'auto',
        subtitles: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'anime-settings',
    }
  )
); 
import { create } from 'zustand';

interface MainMenuStore {
  menuOpen: boolean;
  setMenu: (menuOpen) => void;
}

const useMainMenuStore = create<MainMenuStore>((set) => ({
  menuOpen: false,
  setMenu: (menuOpen) =>
    set(() => ({
      menuOpen,
    })),
}));

export { useMainMenuStore };

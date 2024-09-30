import { create } from 'zustand';

interface MainMenuStore {
  menuOpen: boolean;
  setMenu: (menuOpen: boolean) => void;
}

const useMainMenuStore = create<MainMenuStore>((set) => ({
  menuOpen: false,
  setMenu: (menuOpen) =>
    set(() => ({
      menuOpen,
    })),
}));

export { useMainMenuStore };

import { getQueryString } from "@/utils";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = { token: string; gameId: string; loadEnd: boolean; lang: string };

type Actions = {
  setToken: (token: string) => void;
  setLoadEnd: () => void;
  setGameId: (gameId: string) => void;
  setLang: (lang: string) => void;
};

const useAppStore = create<State & Actions>()(
  persist(
    (set) => ({
      loadEnd: false,
      token: "",
      lang: getQueryString("lang") ?? "en",
      gameId: getQueryString("gameId") ?? "",
      setToken: (token: string) => {
        set({ token });
      },
      setLoadEnd: () => {
        set({ loadEnd: true });
      },
      setGameId: (gameId: string) => {
        set({ gameId });
      },
      setLang: (lang: string) => {
        set({ lang });
      },
    }),
    {
      name: "token-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useAppStore;

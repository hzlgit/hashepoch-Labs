import { create } from "zustand";

type State = {
  previousPeriod: any;
  currentPeriod: any;
  modalOpend: boolean;
  openPeriod: string;
  mute: boolean;
};

type Actions = {
  setPreviousPeriod: (data: any) => void;
  setCurrentPeriod: (data: any) => void;
  changeModalOpend: (opend: boolean) => void;
  setOpenPeriod: (openPeriod: string) => void;
  changeMute: (mute: boolean) => void;
};

const useAppStateStore = create<State & Actions>()((set) => ({
  previousPeriod: undefined,
  currentPeriod: undefined,
  modalOpend: false,
  openPeriod: "",
  mute: false,

  setPreviousPeriod: (previousPeriod) => {
    set({ previousPeriod });
  },
  setCurrentPeriod: (currentPeriod) => {
    set({ currentPeriod });
  },
  changeModalOpend: (modalOpend) => {
    set({ modalOpend });
  },
  setOpenPeriod: (openPeriod) => {
    set({ openPeriod });
  },
  changeMute: (mute) => {
    set({ mute });
  },
}));
export default useAppStateStore;

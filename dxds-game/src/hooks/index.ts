import { gameCurrentData, gameData, gameDrawData, gameUserData } from "@/api";

import useAppStore from "@/store/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGameData = () => {
  const { gameId } = useAppStore();

  return useQuery({
    queryKey: ["game-data", gameId],
    enabled: !!gameId,
    queryFn: async () => {
      const res = await gameData(gameId ?? "");
      if (res.code === "0000") {
        return res.data;
      }
      return undefined;
    },
  });
};

export const useGameDrawData = () => {
  const { gameId } = useAppStore();
  return useQuery({
    queryKey: ["game-draw-data", gameId],
    enabled: !!gameId,
    queryFn: async () => {
      const res = await gameDrawData(gameId ?? "");
      if (res.code === "0000") {
        return res.data;
      }
      return undefined;
    },
  });
};
export const useGameCurrentData = (bettModel: string, bettAsset: string) => {
  const { gameId } = useAppStore();
  return useQuery({
    queryKey: ["game-draw-data", gameId, bettAsset, bettModel],
    enabled: !!gameId && !!bettAsset && !!bettModel,
    queryFn: async () => {
      const res = await gameCurrentData(gameId ?? "", bettModel, bettAsset);
      if (res.code === "0000") {
        return res.data;
      }
      return undefined;
    },
    retry: true,
    refetchInterval: () => {
      return 1000;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGameUserData = ({
  gamePeriod,
  bettModel,
  bettAsset,
}: {
  gamePeriod: string;
  bettModel: string;
  bettAsset: string;
}) => {
  const { token, gameId } = useAppStore();

  return useQuery({
    queryKey: ["game-user-data", gameId, gamePeriod, bettModel, bettAsset],
    enabled: !!gameId && !!token && !!bettAsset && !!bettModel,
    queryFn: async () => {
      const res = await gameUserData(
        gameId ?? "",
        gamePeriod,
        bettModel,
        bettAsset
      );
      if (res.code === "0000") {
        return res.data;
      }
      return null;
    },
    placeholderData: keepPreviousData,
    refetchInterval: () => {
      return 1000;
    },
  });
};

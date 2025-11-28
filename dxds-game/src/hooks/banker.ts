import { gameBankerBet, gameBankerData } from "@/api";
import useTranslation from "@/locale";
import useAppStore from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useBankerData = (bettAsset: string) => {
  const { gameId, token } = useAppStore();
  return useQuery({
    queryKey: ["game-banker-data", gameId, token, bettAsset],
    enabled: !!gameId && !!bettAsset,
    queryFn: async () => {
      const res = await gameBankerData(gameId ?? "", bettAsset);
      if (res.code === "0000") {
        return res.data;
      }
      return undefined;
    },
  });
};

export const useBankerSubmit = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { gameId } = useAppStore();
  const { t } = useTranslation();
  const submit = useCallback(
    async ({ bettAsset, amount }: { bettAsset: string; amount: string }) => {
      try {
        setLoading(true);
        const res = await gameBankerBet(gameId, bettAsset, amount);
        if (res.code === "0000") {
          onSuccess?.();
          toast.success(t("Banker Set Successfully"));
        } else {
          toast.error(res.msg);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [gameId, onSuccess, t]
  );

  return {
    loading,
    submit,
  };
};

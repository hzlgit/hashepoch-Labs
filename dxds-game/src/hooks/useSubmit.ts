import { gameBett } from "@/api";
import useTranslation from "@/locale";
import useAppStore from "@/store/user";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useSubmit = ({
  onSuccess,
  sdk,
}: {
  onSuccess?: () => void;
  sdk?: any;
}) => {
  const [loading, setLoading] = useState(false);
  const { gameId } = useAppStore();
  const { t } = useTranslation();
  const submit = useCallback(
    async ({
      gamePeriod,
      bettAsset,
      bettModel,
      bettType,
      payType,
      amount,
    }: {
      gamePeriod: string;
      bettAsset: string;
      bettModel: string;
      bettType: string;
      payType: string;
      amount: string;
    }) => {
      try {
        setLoading(true);
        const res = await gameBett({
          gameId,
          gamePeriod,
          bettAsset,
          bettModel,
          bettType,
          amount,
          payType,
        });
        if (res.code === "0000") {
          if (Number(payType) === 2) {
            onSuccess?.();
            toast.success(t("Bet Placed Successfully"));
          } else {
            const r = await sdk?.call("payment", {
              orderId: res.data?.outOrderNo,
            });
            if (r.status === 200) {
              onSuccess?.();
              toast.success(t("Bet Placed Successfully"));
            } else {
              toast.success("Betting failed");
            }
          }
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
    [gameId, onSuccess, sdk, t]
  );

  return {
    loading,
    submit,
  };
};

export default useSubmit;

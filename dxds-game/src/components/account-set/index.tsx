import { Tooltip } from "antd";
import "./index.less";

import HelpOutline from "../icons/HelpOutline";
import useTranslation from "@/locale";
import useSound from "@/hooks/useSound";

export default function AccountSet({
  amt = 1,
  amount,
  payType,
  onChange,
  onChangePayType,
}: {
  coin: string;
  amt: number;
  amount: string | number;
  payType: number;
  onChangePayType?: () => void;
  onChange?: (amount: string | number) => void;
}) {
  const { t } = useTranslation();
  const { play } = useSound();
  return (
    <div className="w-100% flex justify-between px-32px pt-24px box-border">
      <div className="w-378px h-72px flex items-center justify-center relative">
        <img
          src="/images/arrow-l.png"
          className="btn-press w-63px h-65px absolute left-2px top-2px"
          onClick={() => {
            play(0);
            onChangePayType?.();
          }}
        />
        <div className="w-128px md:w-130px h-65px overflow-hidden flex items-center relative">
          <div
            className={`w-258px moshi absolute left-0 flex color-#00FFEF font-bold ${
              payType === 2 ? "newClass1" : "newClass2"
            }`}
          >
            <div className="text-24px md:w-130px flex items-center justify-center ">
              {t("Wallet")}
            </div>
            <div className="text-24px md:w-130px flex items-center justify-center">
              {t("Account")}
            </div>
          </div>
        </div>
        <Tooltip
          title={t(
            "Choose Wallet Mode to have interim funds returned to the wallet. Choose Account Mode to have interim funds returned to the account."
          )}
        >
          <div className="flex items-center cursor-pointer">
            <HelpOutline className="w-32px h-32px md:w-24px md:h-24px" />
          </div>
        </Tooltip>
        <img
          src="/images/arrow-r.png"
          className="btn-press w-63px h-65px absolute right-2px top-2px"
          onClick={() => {
            play(0);
            onChangePayType?.();
          }}
        />
      </div>
      <div className="w-378px h-72px flex items-center justify-center relative">
        <input
          min={1}
          step={amt}
          value={amount}
          type="number"
          onChange={(e) => onChange?.(e.target.value)}
          className="inputnum"
          readOnly
        />
        <img
          src="/images/jian.png"
          className={`w-63px h-65px absolute left-2px top-2px cursor-pointer btn-press ${
            Number(amount) <= 0 ? "cursor-no-drop" : ""
          }`}
          onClick={() => {
            onChange?.(
              Number(amount ?? 0) - amt > 0 ? Number(amount ?? 0) - amt : 0
            );
            play(0);
          }}
        />

        {/* <span className="text-28px absolute left-190px top-13px">
          {t(coin)}
        </span> */}
        <img
          src="/images/jia.png"
          className="btn-press w-63px h-65px absolute right-2px top-2px cursor-pointer"
          onClick={() => {
            onChange?.(Number(amount ?? 0) + amt);
            play(0);
          }}
        />
      </div>
    </div>
  );
}

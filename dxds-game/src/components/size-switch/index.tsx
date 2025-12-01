import numeral from "numeral";
import "./index.less";
import { useMemo } from "react";
import useTranslation from "@/locale";
import useSound from "@/hooks/useSound";
export default function SizeSwitch({
  data,
  coin,
  mode,
  size,
  onChange,
}: {
  mode: number;
  size?: number;
  data?: any;
  coin?: any;
  onChange?: (size: number) => void;
}) {
  const { t } = useTranslation();
  const conf = useMemo(() => {
    return JSON.parse(coin?.gameOddsConfig ?? "{}");
  }, [coin]);
  const { play } = useSound();
  return (
    <div className="w-100% flex justify-between">
      <div
        className={`relative z-2 touzhu1 bet-${mode} ${
          size == 1 ? "big-bg" : ""
        } `}
        onClick={() => {
          onChange?.(1);
          play(4);
        }}
      >
        <div className="text-center font-bold">
          <div className="text-48px mb-11px mt-11px">
            {t(mode === 1 ? "Big" : "Odd")}
          </div>
          <div className="text-16px mb-5px">
            {t("Bettors")}{" "}
            {numeral(data?.bettData?.[1]?.totalUserCount).format("00")}
          </div>
          <div className="text-16px mb-5px">
            {t("Volume")}{" "}
            {numeral(data?.bettData?.[1]?.totalBetAmount).format("0,0.00")}
          </div>
          <div className="text-16px mb-5px">
            {t("Odds")} 1 : {conf?.[mode]?.[1]}
          </div>
        </div>
      </div>
      <div className="w-166px h-196px absolute top-30px left-343px z-2">
        <img
          src="/images/qk-bg.png"
          className="w-166px h-196px absolute top-0 left-0 z-1 animate"
        />
        <div className="w-166px h-196px absolute top-0 left-0 z-2">
          <div className="w-100% h-100% flex flex-col items-center justify-center">
            <div className="text-12px">{t("Issue Number")}</div>
            <div className="text-18px mb-22px font-bold">
              #{data?.currentPeriod?.periodNo ?? "00000000"}
            </div>
            <div className="text-12px">{t("Block Height")}</div>
            <div className="text-18px font-bold">
              {data?.currentPeriod?.blockNumber ?? "00000000"}
            </div>
          </div>
        </div>
      </div>
      <img
        src="/images/touzhu-cai.png"
        className="w-720px h-214px absolute top-68px left-50px z-1 animate"
      />
      <div
        className={`relative z-2 touzhu2 bet-${mode} ${
          size == 2 ? "small-bg" : ""
        } `}
        onClick={() => {
          play(4);
          onChange?.(2);
        }}
      >
        <div className="text-center font-bold">
          <div className="text-48px mb-11px mt-11px">
            {t(mode == 1 ? "Small" : "Even")}
          </div>
          <div className="text-16px mb-5px">
            {t("Bettors")}{" "}
            {numeral(data?.bettData?.[2]?.totalUserCount).format("00")}
          </div>
          <div className="text-16px mb-5px">
            {t("Volume")}{" "}
            {numeral(data?.bettData?.[2]?.totalUserCount).format("0,0.00")}
          </div>
          <div className="text-16px mb-5px">
            {t("Odds")} 1 : {conf?.[mode]?.[2]}
          </div>
        </div>
      </div>
    </div>
  );
}

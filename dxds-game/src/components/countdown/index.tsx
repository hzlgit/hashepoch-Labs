import { useInterval } from "react-use";
import numeral from "numeral";
import useTranslation from "@/locale";

export default function CountDown({
  data,
  coin,
  time,
  onChange,
}: {
  coin: any;
  data: any;
  time: number;
  onChange: () => void;
}) {
  const { t } = useTranslation();
  useInterval(
    () => {
      onChange();
    },
    time > 0 ? 1000 : null
  );
  return (
    <div className="flex justify-center">
      <div className="w-170px h-38px flex justify-between px-10px items-center text-16px mr-14px mr-24px mt-2px box-border">
        <div className="mr-10px ws-nowrap">{t("Limit")}</div>
        <div className="color-[var(--vt-c-main1)] ws-nowrap">
          {numeral(coin?.bettOnceMinAmount).format("0,0.[00]a")} ~{" "}
          {numeral(coin?.bettOnceMaxAmount).format("0,0.[00]a")}
        </div>
      </div>
      <div className="w-84px h-96px relative mr-26px">
        <img
          src="/images/count-red.png"
          className="w-84px h-96px absolute top-0 left-0 count-red"
          style={{ zIndex: time < 11 ? 2 : 1 }}
        />
        <img
          src="/images/count-orange.png"
          className="w-84px h-96px absolute top-0 left-0 count-orange"
          style={{ zIndex: time < 21 && time > 10 ? 2 : 0 }}
        />
        <img
          src="/images/count-green.png"
          className="w-84px h-96px absolute top-0 left-0 count-green"
          style={{ zIndex: time > 20 ? 2 : 0 }}
        />
        <div
          className={`countdown w-84px h-96px absolute top-0 left-0 z-3 text-center line-height-96px text-36px font-bold ${
            time < 11 ? "animate1" : ""
          }`}
        >
          {numeral(time).format("00")}
        </div>
      </div>
      <div className="w-170px h-38px flex justify-between px-10px items-center text-16px mt-2px box-border">
        <div className="ws-nowrap capitalize">{t("bets")}</div>
        <div className="color-[var(--vt-c-main1)] ws-nowrap uppercase">
          {numeral(data?.periodBettData?.totalBetAmount).format("0,0.[00]a")}
        </div>
      </div>
    </div>
  );
}

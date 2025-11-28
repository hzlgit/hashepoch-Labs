import { formatAccount } from "@/utils";
import Contact from "../icons/Contact";
import numeral from "numeral";
import useTranslation from "@/locale";

export default function UserInfo({ data }: { data: any }) {
  const { t } = useTranslation();
  return (
    <div className="w-246px px-18px pt-12px box-border">
      <div className="flex items-center mb-15px">
        <div className="w-62px h-68px flex justify-center items-center mr-16px">
          <Contact className="w-35px h-35px color-[rgba(0,0,0,0.75)]" />
        </div>
        <div>
          <div className="text-18px">
            <span className="color-#00FFEF mr-4px">ID</span>
            <span className="font-bold">{data?.userNo}</span>
          </div>
          {/* <div className="text-14px mt-5px flex w-52px h-20px rounded-6px color-#FFDF00 border-1px border-solid border-#FFDF00 items-center justify-center">
            {formatAccount(data?.address ?? "", 4, 10)}
          </div> */}
          <div className="text-18px line-height-27px mb-15px font-bold ws-nowrap">
            {formatAccount(data?.address ?? "", 4, 4)}
          </div>
        </div>
      </div>
      {/* <div className="text-18px line-height-27px mb-15px font-bold ws-nowrap">
        {formatAccount(data?.address ?? "", 4, 10)}
      </div> */}
      <div className="text-14px line-height-20px mb-16px mt-6">
        <span className="mr-13px">{t("Bets")}</span>
        <span className="font-bold color-#00FFEF uppercase">
          {numeral(data?.totalBettData?.totalBetAmount).format("0,0.00a")}
        </span>
      </div>
      <div className="text-14px line-height-20px mb-16px">
        <span className="mr-13px">{t("Rewards")}</span>
        <span className="font-bold color-#00FFEF">
          {numeral(data?.totalBettData?.totalAwardAmount).format("0,0.00a")}
        </span>
      </div>
      <div className="text-14px line-height-20px mb-16px">
        <span className="mr-13px">{t("Rounds")}</span>
        <span className="font-bold color-#00FFEF">
          {numeral(data?.totalBettData?.totalPeriodCount).format("00")} 次
        </span>
      </div>
      <div className="text-14px line-height-20px">
        <span className="mr-13px">{t("Win Rate")}</span>
        <span className="font-bold color-#00FFEF">
          {numeral(data?.totalBettData?.winRate).format("0.00%")}
        </span>
      </div>
    </div>
  );
}

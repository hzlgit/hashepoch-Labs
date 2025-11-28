import { useGameData, useGameUserData } from "@/hooks";
import { useEffect, useState } from "react";
import TokenList from "./tokens";
import "./index.less";
import RecordIcon from "../icons/Record";
import { App } from "antd";

import HostingListModal from "../hosting-list-modal";
import useTranslation from "@/locale";
import { useBankerData, useBankerSubmit } from "@/hooks/banker";
import numeral from "numeral";
import toast from "react-hot-toast";
import useSound from "@/hooks/useSound";

export default function DealerModal() {
  const { data: config = {} } = useGameData();
  const { t } = useTranslation();
  const [coin, setCoin] = useState<any>({});
  const { play } = useSound();
  useEffect(() => {
    if (config?.assetConfig?.length > 0) {
      setCoin(config?.assetConfig?.[0]);
    }
  }, [config]);

  const { modal } = App.useApp();
  const [amt, setAmt] = useState("");
  const { data: userData, refetch: refetchUserData } = useGameUserData({
    gamePeriod: "0",
    bettAsset: coin?.assetType,
    bettModel: "1",
  });
  const { data, refetch } = useBankerData(coin?.assetType);
  const { submit, loading } = useBankerSubmit({
    onSuccess() {
      refetchUserData();
      refetch();
    },
  });

  return (
    <div className="h-100% relative px-20px pt-14px ">
      <div className="w-100% flex justify-between font-bold">
        <div className="modal-title text-24px font-bold pl-40px text-shadow1 color-[var(--vt-c-black-75)]">
          {t("Banker Details")}
        </div>
        <div className="bg3-gray relative mt-2px pl-63px pr-14px box-border">
          <img
            src="/images/bg3-cai.png"
            className="w-596px h-47px absolute left-0 bottom-0 animate1"
            alt=""
          />
        </div>
      </div>
      <span
        className="color-[var(--vt-c-white-65)] absolute top-96px right-63px text-30px cursor-pointer"
        onClick={() => {
          play(0);
          const _modal = modal.info({
            icon: null,
            footer: null,
            centered: true,
            closable: false,
            maskClosable: true,
            className: "full-modal",
            content: <HostingListModal onClose={() => _modal.destroy()} />,
          });
        }}
      >
        <RecordIcon className="w-30px h-30px"></RecordIcon>
      </span>
      {/* <Icon type="ios-list-box-outline" class="color-[var(--vt-c-white-65)] absolute top-96px right-63px text-30px cursor-pointer" @click="hostingList"/> */}
      <div className="w-100% flex flex-col items-center  px-40px box-border">
        {/* <div className="flex gap-37px mt-51px mb-54px">
          <div
            className={`token-btn ${
              btnnum == "USDT" ? "token-btn-active" : ""
            }`}
          >
            <img
              src="@/assets/images/token-usdt.png"
              alt=""
              className="w-32px h-32px rounded-100%"
            />
            <div className="font-bold text-20px">USDT</div>
          </div>
         

          <div className="w-185px h-46px"></div>
        </div> */}
        <TokenList
          list={config.assetConfig}
          selected={coin}
          onChange={setCoin}
        />
        <div className="flex gap-15px mb-15px">
          <div className="w-209px h-93px rounded-12px border-1px border-solid border-[#bbb] flex flex-col justify-center items-center">
            <div className="text-16px mb-3px">{t("Margin Requirement")}</div>
            <div className="font-bold text-20px">
              <span>
                {numeral(data?.bankerBalance / 1000).format("0,0.00")}K{" "}
              </span>
              <span style={{ color: "var(--vt-c-main1)" }}>
                {coin?.tokenSymbol}
              </span>
            </div>
          </div>
          <div className="w-308px h-93px rounded-12px bg-[var(--vt-c-main1)] color-#000 flex flex-col justify-center items-center">
            <div className="text-16px mb-3px">{t("My Banker Stake")}</div>
            <div className="font-bold text-20px flex items-center gap-22px">
              <span>
                {numeral(data?.bankerUserBalance).format("0,0.00")}{" "}
                {coin?.tokenSymbol}{" "}
              </span>
              {/* <div className="w-50px h-28px rounded-12px bg-[var(--vt-c-black-soft)] color-#fff text-12px flex justify-center items-center">
                {t("Withdraw")}
              </div> */}
            </div>
            <div className="text-16px">
              {t("Tax Rate")}{" "}
              {numeral(coin?.gameBankerFeeRate).format("0.[00]%")}
            </div>
          </div>
          <div className="w-209px h-93px rounded-12px border-1px border-solid border-[#bbb] flex flex-col justify-center items-center">
            <div className="text-16px mb-3px">{t("My Pool Ratio")}</div>
            <div className="font-bold text-20px">
              <span>{numeral(data?.bankerUserRate * 100).format("0.00")} </span>
              <span style={{ color: "var(--vt-c-main1)" }}>%</span>
            </div>
          </div>
        </div>
        <div className="text-14px mb-14px">{t("My Investment")}</div>
        <div className="w-453px h-50px zz-input">
          <input
            v-model="value"
            placeholder={t("Amount Limit: %min%-%max%", {
              min: coin?.gameBankerMinAmount,
              max: coin?.gameBankerMaxAmount,
            })}
            value={amt}
            onChange={(v) => setAmt(v.target.value)}
          />
        </div>
        <div className="text-14px mt-8px mb-18px flex items-center gap-18px">
          <div>{t("Account Balance")}</div>
          <div>
            {numeral(userData?.balanceAmount).format("0,0.00")}{" "}
            {coin?.tokenSymbol}
          </div>
        </div>
        <div
          className={`cursor-pointer w-282px h-60px text-20px text-center line-height-60px font-bold sure-bg1  ${
            loading ? "cursor-no-drop" : ""
          }`}
          onClick={() => {
            if (loading) {
              return;
            }
            play(4);
            if (coin?.gameBanker !== 1) {
              toast(t("No qualification to act as a dealer"));
              return;
            }
            if (!amt) {
              toast(t("Enter the investment amount"));
              return;
            }
            submit({ bettAsset: coin?.assetType, amount: amt });
          }}
        >
          {t(loading ? "Loading..." : "Confirm Banker")}
        </div>
        <div className="text-13px mt-20px">
          {t(
            "By joining the banker pool, you receive dividend payouts from house profits and also cover counter-party losses when the round results in a deficit."
          )}
        </div>
        {/* <div className="text-13px">
          {t(
            "After becoming the banker, profits are automatically allocated to your pool share based on round results, and earnings can be redeemed."
          )}
        </div> */}
      </div>
    </div>
  );
}

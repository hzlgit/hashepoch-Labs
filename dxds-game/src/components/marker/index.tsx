import { formatAccount } from "@/utils";
import { App, Tooltip } from "antd";

import numeral from "numeral";

import HelpOutline from "../icons/HelpOutline";
import CopyText from "../copy-button";
import CloseOutline from "../icons/CloseOutline";
import DealerModal from "../dealer-modal";
import useTranslation from "@/locale";
import { find } from "lodash";
import { useMemo } from "react";
import useSound from "@/hooks/useSound";

export default function Marker({
  data,
  symbol,
  bankerData,
}: {
  symbol: string;
  data: any;
  bankerData: any;
}) {
  const { modal } = App.useApp();
  const { t } = useTranslation();
  const { play } = useSound();
  const amts = useMemo(() => {
    const amt = find(data?.assetConfig, (c) => c.assetType === symbol);
    return amt;
  }, [data?.assetConfig, symbol]);
  return (
    <div className="w-100% flex justify-betweeen items-center mt-50px pl-35px py-22px pr-0 box-border">
      <div className="flex flex-1 items-center">
        <div className="w-100% flex">
          <div className="flex-1">
            <div className="text-14px mb-4px color-[var(--vt-c-white-75)]">
              {t("Total Margin")}
            </div>
            <div className="text-24px font-bold py-5px flex items-center">
              <span className="mr-10px">
                {numeral(
                  amts?.guardWalletBalance > 10000
                    ? amts?.guardWalletBalance / 1000
                    : amts?.guardWalletBalance
                ).format("0,0.00")}
              </span>
              {amts?.guardWalletBalance > 10000 && (
                <span className="k mr-12px" style={{ color: "#00FFEF" }}>
                  K
                </span>
              )}
              <Tooltip
                title={t(
                  "The total margin refers to the full margin amount for the current project."
                )}
              >
                <span className="flex cursor-pointer">
                  <HelpOutline className="w-24px h-24px" />
                </span>
              </Tooltip>
            </div>
            <div className="text-14px color-[var(--vt-c-white-75)] flex items-center">
              <span
                className="mr-7px max-w-180px overflow-hidden ws-nowrap"
                style={{ textOverflow: "ellipsis" }}
              >
                {formatAccount(data?.gameInfo?.guardWalletAddress, 4, 10)}
              </span>
              <CopyText text={data?.gameInfo?.guardWalletAddress} />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-14px mb-4px color-[var(--vt-c-white-75)]">
              {t("Current Margin")}
            </div>
            <div className="text-24px font-bold py-5px flex items-center">
              <span className="mr-10px">
                {numeral(
                  amts?.guardContractBalance > 10000
                    ? amts?.guardContractBalance / 1000
                    : amts?.guardContractBalance
                ).format("0,0.00")}
              </span>
              {amts?.guardContractBalance > 10000 && (
                <span className="k1 mr-12px" style={{ color: "#00FFEF" }}>
                  K
                </span>
              )}
              <Tooltip
                title={t(
                  "The current round margin is the maximum payout the house can cover for this round."
                )}
              >
                <span className="flex cursor-pointer">
                  <HelpOutline className="w-24px h-24px" />
                </span>
              </Tooltip>
            </div>
            <div className="text-14px color-[var(--vt-c-white-75)] flex items-center">
              <span
                className="mr-7px max-w-180px overflow-hidden ws-nowrap"
                style={{ textOverflow: "ellipsis" }}
              >
                {formatAccount(data?.gameInfo?.guardContractAddress, 4, 10)}
              </span>
              <CopyText text={data?.gameInfo?.guardContractAddress} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="zuohuang w-118px h-88px flex flex-col items-center justify-center cursor-pointer"
        onClick={() => {
          play(0);
          modal.info({
            icon: null,
            footer: null,
            centered: true,
            closable: true,
            maskClosable: true,
            closeIcon: <CloseOutline onClick={() => play(0)} />,
            content: <DealerModal />,
          });
        }}
      >
        <div className="text-22px font-bold">{t("Banker")}</div>
        <div className="text-18px font-bold uppercase ws-nowrap">
          {numeral(bankerData?.bankerUserBalance).format("0,0.00a")}
        </div>
        {/* <div className="text-12px">
          APY {numeral(bankerData?.bankerUserIncome * 100).format("0.00")}%
        </div> */}
      </div>
    </div>
  );
}

import { gameBettAward } from "@/api";
import useAppStore from "@/store/user";
import { useQuery } from "@tanstack/react-query";

import React, { useEffect, useMemo, useState } from "react";
import { formatAccount } from "@/utils";
import numeral from "numeral";
import useAppStateStore from "@/store/state";
import { DigitScroller } from "../dig-scroll";
import { Modal } from "antd";
import CloseOutline from "../icons/CloseOutline";
import useTranslation from "@/locale";
import useSound from "@/hooks/useSound";
import usePageVisibility from "@/hooks/usePageVisibility";

export default function ResultModal({ bettAsset }: { bettAsset: string }) {
  const { t } = useTranslation();
  const { gameId, token } = useAppStore();
  const {
    previousPeriod,
    modalOpend,
    changeModalOpend,
    openPeriod,
    currentPeriod,
  } = useAppStateStore();
  const { isVisible } = usePageVisibility(() => {
    changeModalOpend(false);
  });

  const digitRefs = React.useRef<Array<any>>([]);
  const data = useMemo(
    () => (openPeriod === previousPeriod?.periodNo ? previousPeriod : null),
    [previousPeriod, openPeriod]
  );

  const { data: userData } = useQuery({
    queryKey: ["user-game-result-data", openPeriod, gameId, bettAsset],
    enabled: !!openPeriod && !!gameId && modalOpend && !!token,
    queryFn: async () => {
      const res = await gameBettAward(gameId, openPeriod, bettAsset);
      if (res.code === "0000") {
        return res.data;
      }
      throw Error("wait...");
    },
    refetchInterval: () => (modalOpend ? 100 : false),
  });

  const targetHash = useMemo(
    () =>
      formatAccount(
        data?.blockHash ?? "0x000000000000000000000000000000",
        4,
        10
      ),
    [data?.blockHash]
  );

  const characters = useMemo(() => targetHash.split(""), [targetHash]);
  const [showResult, setShow] = useState(false);

  const startRolling = () => {
    // 逐个启动动画
    digitRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        ref?.start();
      }, index * 50); // 错开启动时间
    });
  };

  const stopRolling = () => {
    // 逐个启动动画
    digitRefs.current.forEach((ref, index) => {
      setTimeout(() => {
        ref?.stop();
      }, index * 50); // 错开启动时间
    });
  };
  const resetRolling = () => {
    // 逐个启动动画
    digitRefs.current.forEach((ref) => {
      ref?.reset();
    });
  };
  const { play, stop } = useSound();
  useEffect(() => {
    if (modalOpend && isVisible) {
      play(1);
      setShow(false);
      resetRolling();
      setTimeout(() => {
        startRolling();
      }, 500);
    } else {
      // stopRolling();
      stop(1);
    }
  }, [modalOpend]);

  useEffect(() => {
    if (data?.blockHash) {
      stopRolling();
      setShow(false);
    }
  }, [data?.blockHash]);

  const onOpend = () => {
    if (modalOpend && isVisible) {
      setShow(true);
      stop(1);

      if (userData?.totalBetAmount > 0) {
        if (userData?.totalAwardAmount > 0) {
          console.log("中奖");
          play(2);
        } else {
          play(3);
        }
      }

      // setTimeout(() => {
      //   changeModalOpend(false);
      // }, 5000);
    }
  };

  return (
    <Modal
      open={modalOpend}
      centered
      afterOpenChange={changeModalOpend}
      closable
      destroyOnHidden
      maskClosable={false}
      footer={null}
      closeIcon={<CloseOutline onClick={() => play(0)} />}
      onCancel={() => changeModalOpend(false)}
    >
      <div className="h-100% relative px-20px pt-14px box-border">
        <div className="w-100% flex justify-between font-bold relative">
          <div className="text-24px font-bold pl-40px pt-14px text-shadow1 color-[var(--vt-c-black-75)]">
            {t("Current Draw")}
          </div>
          <div className="bg3-gray relative mt-2px pl-63px pr-14px box-border">
            <img
              src="/images/bg3-cai.png"
              className="w-596px h-47px absolute left-0 bottom-0 animate1"
              alt=""
            />
          </div>
        </div>
        <img
          src="/images/kaijiang.png"
          alt=""
          className="kaijiang w-1290px absolute top-[-360px] left-[-190px] z-[-1]"
        />
        <div className="w-100% flex flex-col items-center mt-50px px-40px box-border">
          <div className="flex items-center gap-85px mb-29px">
            <div className="text-18px">
              <span className="mr-20px">{t("Issue Number")}</span>
              <span className="color-[var(--vt-c-main1)] font-bold">
                #{data?.periodNo ?? currentPeriod?.periodNo ?? "00000000"}
              </span>
            </div>
            <div className="text-18px">
              <span className="mr-20px">{t("Block Height")}</span>
              <span className="color-[var(--vt-c-main1)] font-bold">
                {data?.blockNumber ?? currentPeriod?.blockNumber ?? "00000000"}
              </span>
            </div>
          </div>
          <div className="text-24px mb-18px font-bold">
            {t("Hash Extraction")}
          </div>

          <div className="counter-container flex mb-21px">
            {characters.map((char, index) => (
              <DigitScroller
                key={index}
                targetChar={char}
                ref={(el) => {
                  digitRefs.current[index] = el;
                }}
                isActive={index === 18 - data?.gameNumberPos}
                onEnd={() => {
                  if (index === 0) {
                    onOpend();
                  }
                }}
              />
            ))}
          </div>
          <div className="text-18px font-bold mb-21px">
            {t("Current Result")}
          </div>
          <div className="flex items-center gap-18px mb-38px">
            <div
              className={`winner-result ${
                Number(data?.gameResult?.["1"]) === 1 && showResult
                  ? "active"
                  : ""
              }`}
            >
              {t("Big")}
            </div>
            <div
              className={`winner-result ${
                Number(data?.gameResult?.["1"]) === 2 && showResult
                  ? "active"
                  : ""
              }`}
            >
              {t("Small")}
            </div>
            <div
              className={`winner-result ${
                Number(data?.gameResult?.["2"]) === 1 && showResult
                  ? "active"
                  : ""
              }`}
            >
              {t("Odd")}
            </div>
            <div
              className={`winner-result ${
                Number(data?.gameResult?.["2"]) === 2 && showResult
                  ? "active"
                  : ""
              }`}
            >
              {t("Even")}
            </div>
          </div>
          <div className="flex gap-80px mb-50px">
            <div className="w-236px h-100px lg:h-80px rounded-12px border-1px border-solid border-[#bbb] flex flex-col justify-center items-center">
              <div className="text-14px mb-3px">{t("My Bets")}</div>
              <div className="font-bold text-20px">
                <span>
                  {numeral(userData?.totalBetAmount).format("0,0.00")}{" "}
                  {t(bettAsset)}{" "}
                </span>
              </div>
            </div>
            <div className="w-236px h-100px lg:h-80px rounded-12px border-1px border-solid border-[#bbb] flex flex-col justify-center items-center">
              <div className="text-14px mb-3px">{t("My Rewards")}</div>
              <div className="font-bold text-20px">
                {showResult
                  ? numeral(userData?.totalAwardAmount).format("0,0.00")
                  : "--"}
                <span> {t(bettAsset)}</span>
              </div>
            </div>
          </div>
          <div className="text-14px text-center color-[var(--vt-c-white-75)]">
            {t(
              "Winnings in Wallet Mode are automatically returned to the wallet; in Account Mode, funds go to the platform account and can be withdrawn."
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

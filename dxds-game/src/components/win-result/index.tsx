import { useEffect, useMemo, useState } from "react";
import "./index.less";
import { animated, config, useSpringValue } from "@react-spring/web";
import { formatAccount } from "@/utils";
import { App } from "antd";
import VerifyModal from "../hash-verify";
import useTranslation from "@/locale";
import useSound from "@/hooks/useSound";

// 配置参数
const CONFIG = {
  DURATION: 2000,
  ROLL_COUNT: 2,
  DELAY_BETWEEN_DIGITS: 35,
  DIGIT_HEIGHT: 36,
  TARGET_NUMBER: "0x00****0006700000",
};

const CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz*";

export default function WinResult({ mode, data }: { mode: number; data: any }) {
  const { t } = useTranslation();
  const targetHash = useMemo(
    () =>
      formatAccount(
        data?.blockHash ?? "0x000000000000000000000000000000",
        4,
        10
      ),
    [data?.blockHash]
  );
  const characters = targetHash.split("");
  const { modal } = App.useApp();
  const { play } = useSound();
  return (
    <>
      <div className="win-result-container w-100% h-142px px-20px pt-15px flex justify-between relative box-border">
        <img
          src="/images/kj-blue.png"
          alt=""
          className={`w-850px h-70px absolute left-0 bottom-0 animate1 mode-bg ${
            mode === 1 ? "show" : ""
          }`}
        />
        <img
          src="/images/kj-pink.png"
          alt=""
          className={`w-850px h-70px absolute left-0 bottom-0 animate1 mode-bg ${
            mode === 2 ? "show" : ""
          }`}
        />
        <div>
          <div className="text-14px mb-16px">{t("Previous Draw")}</div>
          <div className="text-18px mb-19px font-bold">
            #{data?.periodNo ?? "00000000"}
          </div>
          <div
            className="relative z-2
      cursor-pointer
      w-52px h-20px line-height-20px
      rounded-6px color-[var(--vt-c-white-5)]
      border-1px border-solid 
      border-[var(--vt-c-white-5)] 
      text-center text-12px"
            onClick={() => {
              play(0);
              const _modal = modal.info({
                icon: null,
                footer: null,
                centered: true,
                closable: false,
                maskClosable: true,
                className: "full-modal",
                content: <VerifyModal onClose={() => _modal.destroy()} />,
              });
            }}
          >
            {t("Verify")}
          </div>
        </div>
        <div className="text-center">
          <div className="text-14px mb-13px">
            <span className="mr-7px">{t("Draw Result")}</span>
            <span className="color-[var(--theme-color)]">{t("Hash")}</span>
          </div>

          <div className="counter-container flex">
            <div className="flex">
              {characters.map((char, index) => (
                <DigitScroller
                  key={index}
                  targetChar={char}
                  index={index}
                  isActive={index === 18 - data?.gameNumberPos}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-14px mb-16px">{t("Block Height")}</div>
          <div className="text-18px mb-20px font-bold">
            {data?.blockNumber ?? "000000"}
          </div>
          <div className="color-[var(--vt-c-white-5)] text-12px">
            {t("Ethereum Block")}
          </div>
        </div>
      </div>
    </>
  );
}
// 创建滚动的字符序列（包含额外循环）
const createCharacterSequence = () => {
  const sequence = [];
  for (let i = 0; i < CONFIG.ROLL_COUNT + 1; i++) {
    for (let j = 0; j < CHARACTERS.length; j++) {
      sequence.push(CHARACTERS[j]);
    }
  }
  return sequence;
};

const characterSequence = createCharacterSequence();

export const DigitScroller = ({
  targetChar,
  index,
  isActive,
  onEnd,
}: {
  targetChar: string;
  index: number;
  isActive: boolean;
  onEnd?: () => void;
}) => {
  const [actived, setActived] = useState(isActive);

  const targetPosition = useMemo(
    () => CHARACTERS.lastIndexOf(String(targetChar).toLowerCase()),
    [targetChar]
  );

  // 计算目标滚动位置（考虑额外循环）
  const totalScrollDistance =
    CONFIG.ROLL_COUNT * CHARACTERS.length + targetPosition;

  // // 使用react-spring创建动画
  // const springProps = useSpring({
  //   from: {
  //     translateY: 0,
  //     opacity: 0,
  //     scale: 0.8,
  //   },
  //   to: {
  //     translateY: -totalScrollDistance * CONFIG.DIGIT_HEIGHT,
  //     opacity: 1,
  //     scale: 1,
  //   },
  //   delay: index * CONFIG.DELAY_BETWEEN_DIGITS,
  //   config: config.wobbly,

  //   onStart() {
  //     // setTimeout(() => {
  //     //   setActived(isActive);
  //     //   onEnd?.();
  //     // }, 180 * 18);
  //   },
  //   onResolve() {},

  //   onChange(r) {
  //     if (
  //       Number(-r.value?.translateY) >=
  //       totalScrollDistance * CONFIG.DIGIT_HEIGHT
  //     ) {
  //       onEnd?.();
  //       setActived(isActive);
  //     }
  //   },
  // });

  const translateY = useSpringValue(0, {
    delay: index * CONFIG.DELAY_BETWEEN_DIGITS,
    config: config.wobbly,
  });

  useEffect(() => {
    if (totalScrollDistance) {
      setActived(false);
      translateY.reset();
      translateY.start(-totalScrollDistance * CONFIG.DIGIT_HEIGHT).then(() => {
        if (isActive) {
          setTimeout(() => {
            setActived(isActive);
          }, 2000);
        }
        onEnd?.();
      });
    }
  }, [totalScrollDistance, translateY, isActive, onEnd]);

  return (
    <div
      className="digit-container"
      style={{
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <animated.div
        className="digit-list"
        style={{
          transform: translateY.to((y) => `translateY(${y / 16}rem)`),
          // opacity: springProps.opacity,
          transformOrigin: "center",
        }}
      >
        {characterSequence.map((char, idx) => (
          <div
            key={idx}
            className={`digit  ${actived && isActive ? "active1" : ""}`}
            style={{
              transition: "all 0.3s ease",
            }}
          >
            {char}
          </div>
        ))}
      </animated.div>
    </div>
  );
};

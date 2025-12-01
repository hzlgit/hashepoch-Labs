import { formatAccount } from "@/utils";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

// 配置参数
const CONFIG = {
  DURATION: 2000,
  ROLL_COUNT: 2,
  DELAY_BETWEEN_DIGITS: 35,
  DIGIT_HEIGHT: 36,

  ROLL_SPEED: 0.1, // 滚动速度（每帧滚动的距离）
};
const CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz*";
const createStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rollAnimation {
      0% { transform: translateY(0); }
      100% { transform: translateY(-${
        (CHARACTERS.length * CONFIG.DIGIT_HEIGHT) / 16
      }rem); }
    }
    
    .rolling {
      animation: rollAnimation 2s linear infinite;
    }
    
    .ending {
      transition: transform ${
        CONFIG.DURATION
      }ms cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  `;
  document.head.appendChild(style);
  return style;
};
createStyles();
const DigitScrollerView = (
  {
    targetChar,
    isActive,
    onEnd,
  }: {
    targetChar: string;

    isActive: boolean;
    onEnd?: () => void;
  },
  ref: any
) => {
  const [currentChar, setCurrentChar] = useState(targetChar);
  const [animationPhase, setAnimationPhase] = useState("idle"); // idle, rolling, ending

  const animationRef = useRef<HTMLDivElement>(null);

  // 计算目标位置
  const targetPosition = CHARACTERS.lastIndexOf(targetChar.toLowerCase());
  const totalScrollDistance = targetPosition * CONFIG.DIGIT_HEIGHT;

  // 暴露控制方法给父组件
  useImperativeHandle(ref, () => ({
    start: () => startAnimation(),
    stop: () => stopAnimation(),
    pause: () => pauseAnimation(),
    resume: () => resumeAnimation(),
    reset: () => resetAnimation(),

    setTargetChar: (newChar: string) => setTargetChar(newChar),
  }));

  // 开始动画
  const startAnimation = () => {
    setAnimationPhase("rolling");
  };

  // 停止动画并定位到结果
  const stopAnimation = () => {
    setAnimationPhase("ending");

    // 监听过渡结束
    setTimeout(() => {
      onEnd?.();
    }, CONFIG.DURATION);
  };

  // 暂停动画
  const pauseAnimation = () => {
    setAnimationPhase("idle");
  };

  // 恢复动画
  const resumeAnimation = () => {
    setAnimationPhase("rolling");
  };

  // 重置动画
  const resetAnimation = () => {
    setAnimationPhase("idle");
  };

  // 设置目标字符
  const setTargetChar = (newChar: string) => {
    if (typeof newChar === "string") {
      setCurrentChar(newChar);
    }
  };

  // 当targetChar变化时，更新当前字符
  useEffect(() => {
    if (targetChar !== currentChar) {
      setCurrentChar(targetChar);
    }
  }, [targetChar, currentChar]);

  // 创建字符序列（循环显示）
  const createCharacterSequence = () => {
    const sequence = [];
    // 创建多个循环以确保滚动效果
    for (let i = 0; i < 3; i++) {
      for (const char of CHARACTERS) {
        sequence.push(char);
      }
    }
    return sequence;
  };

  const characterSequence = createCharacterSequence();

  const transformStyle =
    animationPhase === "ending"
      ? `translateY(${-totalScrollDistance / 16}rem)`
      : animationPhase === "rolling"
      ? `translateY(0)`
      : `translateY(0)`;

  return (
    <div
      className="digit-container"
      style={{
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <div
        ref={animationRef}
        className="digit-list"
        style={{
          transformOrigin: "center",
          transform: transformStyle,
          transition:
            animationPhase === "ending"
              ? `transform ${CONFIG.DURATION}ms cubic-bezier(0.215, 0.61, 0.355, 1)`
              : "none",
          animation:
            animationPhase === "rolling"
              ? `rollAnimation 0.5s linear infinite`
              : "none",
        }}
      >
        {characterSequence.map((char, idx) => (
          <div
            key={idx}
            className={`digit ${
              isActive && animationPhase === "ending" ? "active" : ""
            }`}
            style={{
              transition: "all 0.3s ease",
            }}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DigitScroller = forwardRef(DigitScrollerView);

export default function Digit({ data }: { data: any }) {
  const digitRefs = React.useRef<Array<any>>([]);
  const targetHash = useMemo(
    () =>
      formatAccount(
        data?.blockHash ?? "0x000000000000000000000000000000",
        4,
        10
      ),
    [data?.blockHash]
  );
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

  const characters = useMemo(() => targetHash.split(""), [targetHash]);
  return (
    <div>
      <div className="counter-container flex mb-21px">
        {characters.map((char, index) => (
          <DigitScroller
            key={index}
            targetChar={char}
            ref={(el) => {
              digitRefs.current[index] = el;
            }}
            isActive={index === 18 - 3}
            onEnd={() => {
              console.log("end");
            }}
          />
        ))}
      </div>

      <div onClick={startRolling}>开始</div>
      <div onClick={stopRolling}>停止</div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

function usePageVisibility(onUpdate?: () => void) {
  const [isVisible, setIsVisible] = useState(!document.hidden); // 初始状态
  const hideTime = useRef(0);
  const visableTime = useRef(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = document.visibilityState === "visible";
      // console.log(visible ? "页面可见" : "页面隐藏");
      if (visible && hideTime.current > 0) {
        visableTime.current = Math.round(Date.now() / 1000);
        if (visableTime.current - hideTime.current > 5) {
          onUpdate?.();
        }
      } else {
        hideTime.current = Math.round(Date.now() / 1000);
      }
      setIsVisible(visible);
    };

    // 监听可见性变化事件
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onUpdate]);

  return {
    isVisible,
    changeTime:
      hideTime.current > 0 ? visableTime.current - hideTime.current : 0,
  };
}

export default usePageVisibility;

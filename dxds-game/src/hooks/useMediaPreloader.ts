import useAppStore from "@/store/user";
import { useState, useEffect } from "react";

function isImage(url: string) {
  return /\.(jpe?g|png|gif|webp|bmp)$/i.test(url);
}

function isAudio(url: string) {
  return /\.(mp3|wav|ogg|aac|m4a)$/i.test(url);
}

/**
 * 预加载一组媒体文件（图片或音频），并返回加载进度和完成状态
 * @param {string[]} mediaUrls - 媒体文件 URL 数组
 * @returns {{ loadedCount: number, total: number, completed: boolean, errors: string[] }}
 */
export function useMediaPreloader(mediaUrls: string[]) {
  const [loadedCount, setLoadedCount] = useState(0);
  const { loadEnd, setLoadEnd } = useAppStore();
  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    if (!mediaUrls || mediaUrls.length === 0) {
      setLoadEnd();
      return;
    }

    const total = mediaUrls.length;
    let loaded = 0;
    const errorList: any[] = [];
    const resources: any[] = [];

    const markLoaded = (url: string) => {
      loaded += 1;
      setLoadedCount(loaded);
      console.debug(url);
      if (loaded === total) {
        setLoadEnd();
        setErrors([...errorList]);
      }
    };

    const handleError = (url: string) => {
      console.warn(`Failed to load: ${url}`);
      errorList.push(url);
      markLoaded(url);
    };

    // 预加载每种资源
    mediaUrls.forEach((url) => {
      if (isImage(url)) {
        const img = new Image();
        img.onload = () => markLoaded(url);
        img.onerror = () => handleError(url);
        img.src = url; // 触发加载
        resources.push(img);
      } else if (isAudio(url)) {
        const audio = new Audio();
        audio.preload = "auto";
        audio.src = url;

        // 关键：监听 canplaythrough 表示“可流畅播放”，视为加载成功
        audio.addEventListener("canplaythrough", () => markLoaded(url), {
          once: true,
        });
        audio.addEventListener("error", () => handleError(url), { once: true });

        // 可选：强制开始加载（某些浏览器需要）
        audio.load();

        resources.push(audio);
      } else {
        // 不支持的类型，直接跳过（或视为成功）
        console.warn(`Unsupported media type: ${url}`);
        markLoaded(url);
      }
    });

    // 清理（防止内存泄漏）
    return () => {
      resources.forEach((res) => {
        if (res instanceof HTMLImageElement) {
          res.onload = null;
          res.onerror = null;
        } else if (res instanceof HTMLAudioElement) {
          res.removeEventListener("canplaythrough", () => {});
          res.removeEventListener("error", () => {});
          // 撤销 src 可帮助释放资源（可选）
          res.src = "";
        }
      });
    };
  }, [mediaUrls, setLoadEnd]);

  return {
    loadedCount,
    total: mediaUrls?.length || 0,
    loadEnd,
    errors,
    progressPercent: mediaUrls?.length
      ? Math.round((loadedCount / mediaUrls.length) * 100)
      : 0,
  };
}

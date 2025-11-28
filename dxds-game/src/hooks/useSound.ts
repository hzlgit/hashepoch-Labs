import useAppStateStore from "@/store/state";
import { Howl } from "howler";
import { useCallback, useEffect } from "react";

const btn = new Howl({
  src: ["/mp3/btn.mp3"],
  volume: 1,
});
const btn2 = new Howl({
  src: ["/mp3/btn2.mp3"],
  volume: 1,
});
const rolling = new Howl({
  src: ["/mp3/gear2.mp3"],
  loop: true,
  volume: 1,
});
const win = new Howl({
  src: ["/mp3/win.mp3"],
  volume: 1,
});
const lose = new Howl({
  src: ["/mp3/lose.mp3"],
  volume: 1,
});
const sounds = [btn, rolling, win, lose, btn2];

const useSound = () => {
  const { mute } = useAppStateStore();

  const play = useCallback(
    (idx: number) => {
      if (!mute) {
        sounds[idx]?.play();
      }
    },
    [mute]
  );
  const stop = (idx: number) => {
    sounds[idx]?.stop();
  };

  useEffect(() => {
    if (mute) {
      sounds.forEach((s) => s.mute(true));
    } else {
      sounds.forEach((s) => s.mute(false));
    }
  }, [mute]);
  return {
    play,
    stop,
  };
};

export default useSound;

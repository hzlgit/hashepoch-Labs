import numeral from "numeral";
import "./index.less";
import useTranslation from "@/locale";
import useSound from "@/hooks/useSound";

export default function Confirm({
  mode,
  // coin,
  balance,

  onConfirm,
  isLoading,
  disabled,
  isLogin,
  isDrawing,
}: {
  isLogin?: boolean;
  mode: number;
  coin: string;
  balance: number;
  size?: number;
  onConfirm?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  isDrawing?: boolean;
}) {
  const { t } = useTranslation();
  const { play } = useSound();
  return (
    <div className="w-100% flex flex-col items-center pt-14px relative">
      <img
        src="/images/bottom-bg.png"
        alt=""
        className="w-836px h-144px absolute left-8px bottom-[-30px]"
      />
      <img
        src="/images/bottom-blue.png"
        alt=""
        className={`w-836px h-144px absolute left-8px bottom-[-30px] animate1 mode-bg-img ${
          mode === 1 ? "show" : ""
        }`}
      />
      <img
        src="/images/bottom-pink.png"
        alt=""
        className={`w-836px h-144px absolute left-8px bottom-[-30px] animate1 mode-bg-img ${
          mode === 2 ? "show" : ""
        }`}
      />
      <div className="h-40px text-18px flex justify-center items-center gap-18px">
        <div>{t("Balance")}</div>
        <div className="color-[var(--vt-c-main1)] uppercase">
          {numeral(balance).format("0,0.[00]")}
        </div>
        {/* <div>{coin}</div> */}
      </div>
      <div className="w-544px h-78px mt-22px relative z-10">
        <button
          className={`cursor-pointer w-544px h-78px confirm-button ${
            mode == 1 ? "sure-bg1" : "sure-bg2"
          } ${isLoading || disabled ? "disabled" : ""} ${
            isLoading ? "cursor-progress" : ""
          }`}
          onClick={() => {
            onConfirm?.();
            play(4);
          }}
          disabled={disabled || isLoading || isDrawing}
        >
          <div className="text-center text-32px font-bold line-height-78px z-2 relative">
            {t(
              isLogin
                ? isDrawing
                  ? "Drawing..."
                  : isLoading
                  ? "Please wait..."
                  : "Confirm Bet"
                : "Login"
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
